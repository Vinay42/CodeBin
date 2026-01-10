import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import {
  Code2, Copy, LogOut, Play, Download, RefreshCcw, Menu, X
} from "lucide-react"

import { Button } from "../components/ui/Button"
import { Client } from "../components/ui/Client"
import { CodeEditor } from "../components/CodeEditor"
import { Console } from "../components/Console"

import {
  connectSocket,
  joinRoom,
  onMembersUpdate,
  runCode,
  onProgramOutput,
  sendProgramInput,
  disconnectSocket,
  changeLanguage,
  onSyncCode,
  onCodeChange,
  onLanguageChanged,
  executionEnded,
  executionStarted
} from "../lib/RoomSocket"

export default function EditorPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { roomId } = useParams()

  const socketRef = useRef(null)
  const editorRef = useRef(null)

  const [code, setCode] = useState("")
  const isRemoteUpdate = useRef(false)

  const [runningUser, setRunningUser] = useState(null)



  const [members, setMembers] = useState([])
  const [language, setLanguage] = useState("java")
  const [consoleOutput, setConsoleOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showConsole, setShowConsole] = useState(true)

  useEffect(() => {
    if (!location.state?.username) {
      navigate("/create-room", { state: { roomId } })
      return
    }

    socketRef.current = connectSocket()
    if (!socketRef.current) return
    joinRoom(roomId, location.state.username)

    onMembersUpdate(setMembers)


    const socket = socketRef.current

    executionStarted(({ username }) => {
      setIsRunning(true)
      setRunningUser(username)
    })

    executionEnded(() => {
      setIsRunning(false)
      setRunningUser(null)
    })

    onSyncCode(({ code, language }) => {
      isRemoteUpdate.current = true
      setCode(code)
      setLanguage(language)
      isRemoteUpdate.current = false
    })

    onCodeChange(({ code }) => {
      if (isRemoteUpdate.current) return
      setCode(code)
    })

    onLanguageChanged(({ language, code }) => {
      isRemoteUpdate.current = true
      setLanguage(language)
      setCode(code)
      isRemoteUpdate.current = false
    })

    onProgramOutput(({ output }) => {
      setConsoleOutput(prev => prev + output)
      setIsRunning(false)
    })

    return () => {
      disconnectSocket()
    }
  }, [])

  const handleCodeChange = (value) => {
    if (!value) return
    if (isRemoteUpdate.current) return

    setCode(value)

    socketRef.current.emit("code-change", {
      roomId,
      code: value,
    })
  }

  const handleRunCode = () => {
    if (!code) return
    setIsRunning(true)
    runCode(roomId, code, language)
  }


  const sendProgram = (input) => {
    sendProgramInput(roomId, input)
  }

  const handleLanguage = (language) => {
    setLanguage(language)
    changeLanguage(roomId, language)
  }

  const copyRoomId = () => navigator.clipboard.writeText(roomId)
  const leaveRoom = () => {
    disconnectSocket()
    navigate("/")
  }

  const downloadCode = () => {
    const blob = new Blob([code])
    const a = document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = `Main.${language}`
    a.click()
  }

  const resetCode = () => {
    setCode("")
    socketRef.current.emit("code-change", {
      roomId,
      code: "",
    })
  }


  // ─── UI ───────────────────────────────────
  return (
    <div className="h-full w-full fles-1 w-screen flex flex-col bg-slate-50 dark:bg-[#1e293b] text-slate-900 dark:text-white overflow-hidden">

      <div className="flex flex-1 min-h-0 overflow-hidden relative">

        {/* MOBILE OVERLAY */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* MEMBERS SIDEBAR */}
        <aside className={`
          w-52 bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-700/50 flex flex-col min-h-0 shrink-0
          fixed lg:relative inset-y-0 left-0 z-50 
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          {/* Members Header */}
          <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Members</span>
            </div>
            <button
              className="lg:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-700/50 rounded text-slate-600 dark:text-slate-400"
              onClick={() => setShowSidebar(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Members List */}
          <div className="flex-1 min-h-0 overflow-auto p-3">
            <ul className="space-y-2">
              {members.map(m => (
                <Client key={m.socketId} name={m.username} />
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="p-3 space-y-2 border-t border-slate-200 dark:border-slate-700/50 shrink-0">
            <Button
              onClick={copyRoomId}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy Room ID
            </Button>
            <Button
              onClick={leaveRoom}
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white text-sm py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Leave Room
            </Button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex flex-1 min-h-0 overflow-hidden flex-col lg:flex-row">

          {/* EDITOR SECTION */}
          <div className="flex flex-col flex-1 min-h-0 overflow-hidden">

            {/* EDITOR TOOLBAR */}
            <div className="h-11 bg-slate-100 dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700/50 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 shrink-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowSidebar(true)}
                className="lg:hidden p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <Menu className="h-4 w-4" />
              </button>

              {/* Language Selector */}
              <select
                value={language}
                onChange={e => handleLanguage(e.target.value)}
                className="bg-white dark:bg-[#334155] border border-slate-300 dark:border-slate-600 rounded px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500 focus:border-transparent"
              >
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
              </select>

              {/* File Info - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <Code2 className="h-4 w-4" />
                <span className="text-slate-700 dark:text-slate-300">Main</span>
                <span className="text-slate-400 dark:text-slate-500">.{language === 'java' ? 'java' : language === 'cpp' ? 'cpp' : 'py'}</span>
              </div>

              {/* Download Button */}
              <button
                onClick={downloadCode}
                className="ml-auto p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>

              {/* Reset Button */}
              <button
                onClick={resetCode}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Reset Code"
              >
                <RefreshCcw className="h-4 w-4" />
              </button>

              {/* Run Button */}
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 disabled:bg-green-300 dark:disabled:bg-green-800 disabled:opacity-50 text-white px-2 sm:px-4 py-1.5 rounded flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium transition-colors"
              >
                <Play className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Run Code</span>
                <span className="sm:hidden">Run</span>
              </button>

            </div>

            {/* EDITOR */}
            <div className="flex-1 min-h-0 bg-white dark:bg-[#0f172a] overflow-hidden">
              <CodeEditor
                value={code}
                language={language}
                editorRef={editorRef}
                onChange={handleCodeChange}
              />
            </div>
          </div>

          {/* CONSOLE/TERMINAL SECTION */}
          <div className={`
            bg-white dark:bg-[#0f172a] border-l border-slate-200 dark:border-slate-700/50 flex flex-col min-h-0
            lg:w-[400px] lg:block
            ${showConsole ? 'h-[40vh] lg:h-auto border-t lg:border-t-0' : 'hidden lg:flex'}
          `}>
            <Console
              consoleOutput={consoleOutput}
              isExecuting={isRunning}
              onInput={sendProgram}
              runningUser={runningUser}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
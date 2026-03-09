import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

export function Console({ consoleOutput,isExecuting, onInput, runningUser }) {
  const [inputValue, setInputValue] = useState("")
  const outputRef = useRef(null)

  // Auto scroll on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [consoleOutput])

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onInput?.(inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="relative max-h-screen flex flex-col h-full bg-gray-50 dark:bg-[#1e1e1e] ">
      <div className="h-11 bg-slate-100 dark:bg-[#1e293b] border-b border-slate-200 dark:border-slate-700/50 flex items-center px-2 sm:px-4 gap-2 sm:gap-3 shrink-0">
        {/* Terminal - Mobile */}
        <div
          className="lg:hidden px-2 py-1.5 text-xs text-slate-600 dark:text-slate-400 dark:hover:text-white flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700/50 rounded"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        {/* Terminal Tab - Desktop */}
        <div className="hidden lg:flex ml-2 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-400 dark:hover:text-white items-center gap-2 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Terminal
        </div>
      </div>

      <div className="p-2 sm:p-4 flex-1 flex flex-col relative">
        {/* Loading Overlay */} 
        {isExecuting && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 z-10">
            <Loader2 className="h-6 w-6 animate-spin text-green-500" />
            <span>{runningUser} is running the code...</span>
          </div>
        )}

        {/* Output */}
        <div
          ref={outputRef}
          className="flex-1 overflow-auto text-sm font-mono"
        >
          <pre className="text-green-600 dark:text-green-400 whitespace-pre-wrap">
            {consoleOutput || "Console output will appear here..."}
          </pre>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 pt-2">
          <span className="text-green-600 dark:text-green-400">&gt;</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-600 dark:text-green-400 text-sm"
            placeholder="Enter input..."
          />
        </div>
      </div>
    </div>
  )
}

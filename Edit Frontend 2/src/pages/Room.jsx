// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from '@/components/ui';;
// import { Navbar } from "@/components/layout/Navbar";
// import { CodeEditor } from "@/components/editor/CodeEditor";
// import { LanguageSelector } from "@/components/editor/LanguageSelector";
// import { OutputTerminal } from "@/components/editor/OutputTerminal";
// import { ShareRoomButton } from "@/components/room/ShareRoomButton";
// import { OnlineUsers } from "@/components/room/OnlineUsers";
// import { UsernameModal } from "@/components/auth/UsernameModal";
// import { Play, Users, ChevronRight, ChevronLeft  } from '@/components/ui';;
// import { toast } from "@/hooks/use-toast";

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();

//   const [code, setCode] = useState(`// Welcome to CodeBin!
// // Start typing your code here...

// function greet(name) {
//   return \`Hello, \${name}! Welcome to CodeBin.\`;
// }

// console.log(greet("Developer"));
// `);
//   const [language, setLanguage] = useState("javascript");
//   const [output, setOutput] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showUsernameModal, setShowUsernameModal] = useState(true);
//   const [currentUsername, setCurrentUsername] = useState("");

//   // Online users data with current user
//   const [onlineUsers, setOnlineUsers] = useState([
//     { id: "2", name: "Alice", color: "bg-green-500" },
//     { id: "3", name: "Bob", color: "bg-purple-500" },
//   ]);

//   useEffect(() => {
//     if (!roomId) {
//       navigate("/");
//       return;
//     }

//     // Validate room ID format (basic validation)
//     if (roomId.length < 3) {
//       toast({
//         title: "Invalid room ID",
//         description: "The room ID appears to be invalid.",
//         variant: "destructive",
//       });
//       navigate("/");
//       return;
//     }

//     // Check if username is stored in session
//     const storedUsername = sessionStorage.getItem(`username_${roomId}`);
//     if (storedUsername) {
//       setCurrentUsername(storedUsername);
//       setShowUsernameModal(false);
//       setOnlineUsers(prev => [
//         { id: "current", name: storedUsername, color: "bg-blue-500" },
//         ...prev
//       ]);

//       toast({
//         title: "Room rejoined!",
//         description: `Welcome back, ${storedUsername}`,
//       });
//     }
//   }, [roomId, navigate]);

//   const handleUsernameSubmit = (username) => {
//     // Check if username is already taken
//     const isUsernameTaken = onlineUsers.some(user => 
//       user.name.toLowerCase() === username.toLowerCase()
//     );

//     if (isUsernameTaken) {
//       toast({
//         title: "Username taken",
//         description: "Please choose a different username.",
//         variant: "destructive",
//       });
//       return;
//     }

//     setCurrentUsername(username);
//     setShowUsernameModal(false);

//     // Store username in session
//     sessionStorage.setItem(`username_${roomId}`, username);

//     // Add current user to online users
//     setOnlineUsers(prev => [
//       { id: "current", name: username, color: "bg-blue-500" },
//       ...prev
//     ]);

//     toast({
//       title: "Room joined!",
//       description: `Welcome to room ${roomId}, ${username}!`,
//     });
//   };

//   const runCode = async () => {
//     setIsRunning(true);
//     setOutput(""); // Clear previous output

//     // Simulate code execution
//     setTimeout(() => {
//       try {
//         // Mock execution based on language
//         let mockOutput = "";

//         switch (language) {
//           case "javascript":
//             mockOutput = `> node main.js
// Hello, Developer! Welcome to CodeBin.
// Execution completed successfully in 234ms`;
//             break;
//           case "python":
//             mockOutput = `> python main.py
// Hello, Developer! Welcome to CodeBin.
// Process finished with exit code 0`;
//             break;
//           case "cpp":
//             mockOutput = `> g++ -o main main.cpp && ./main
// Hello, Developer! Welcome to CodeBin.
// Compilation successful, execution time: 0.12s`;
//             break;
//           default:
//             mockOutput = `> Running ${language} code...
// Output will be displayed here.
// Execution completed.`;
//         }

//         setOutput(mockOutput);
//         toast({
//           title: "Code executed successfully",
//           description: "Check the output terminal for results.",
//         });

//         // Auto-dismiss after 1 second
//         setTimeout(() => {
//           // The toast will be automatically dismissed by the toast system
//         }, 1000);
//       } catch (error) {
//         setOutput(`Error: Something went wrong during execution.
// ${error}`);
//         toast({
//           title: "Execution failed",
//           description: "Check the output for error details.",
//           variant: "destructive",
//         });

//         // Auto-dismiss after 1 second
//         setTimeout(() => {
//           // The toast will be automatically dismissed by the toast system
//         }, 1000);
//       } finally {
//         setIsRunning(false);
//       }
//     }, 1500); // Simulate execution delay
//   };

//   const clearOutput = () => {
//     setOutput("");
//   };

//   if (!roomId) {
//     return null;
//   }

//   return (
//     <div className="h-screen flex flex-col bg-background">
//       <Navbar onlineUsers={onlineUsers.length} roomId={roomId} />

//       <div className="flex-1 flex overflow-hidden relative">
//         {/* Main Editor Area */}
//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Toolbar */}
//           <div className="border-b border-panel-border bg-panel-background p-2 sm:p-3">
//             {/* Mobile-first responsive layout */}
//             <div className="flex flex-col gap-2 sm:gap-3">
//               {/* Top row - Language selector and Run button on left, Share Room on right */}
//               <div className="flex items-center justify-between gap-2 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <div className="flex-shrink-0">
//                     <LanguageSelector value={language} onChange={setLanguage} />
//                   </div>

//                 <Button
//                   onClick={runCode}
//                   disabled={isRunning}
//                   className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-[10px] xs:text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
//                   size="sm"
//                 >
//                   <Play className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${isRunning ? 'animate-pulse' : ''}`} />
//                   <span className="hidden xs:inline">{isRunning ? "Running..." : "Run Code"}</span>
//                   <span className="xs:hidden">{isRunning ? "..." : "Run"}</span>
//                 </Button>
//                 </div>

//                 <div className="flex-shrink-0">
//                   <ShareRoomButton roomId={roomId} />
//                 </div>
//               </div>

//               {/* Bottom row - Show Users button aligned right */}
//               <div className="flex items-center justify-end">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setSidebarOpen(!sidebarOpen)}
//                   className="gap-1 flex-shrink-0 min-w-[2.5rem] sm:min-w-[3rem] px-2 sm:px-3"
//                   title="Toggle Users Panel"
//                 >
//                   <Users className="w-4 h-4" />
//                   <span className="hidden sm:inline text-[10px] xs:text-xs sm:text-sm">
//                     {sidebarOpen ? "Hide Users" : "Show Users"}
//                   </span>
//                   <span className="hidden md:inline ml-1">
//                     {sidebarOpen ? (
//                       <ChevronRight className="w-3 h-3" />
//                     ) : (
//                       <ChevronLeft className="w-3 h-3" />
//                     )}
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           </div>

//             {/* Editor and Output */}
//             <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//               {/* Code Editor */}
//               <div className="flex-1 lg:border-r border-panel-border min-h-0 order-1">
//                 <CodeEditor
//                   value={code}
//                   onChange={(value) => setCode(value || "")}
//                   language={language}
//                 />
//               </div>

//               {/* Output Terminal - Fixed width on desktop */}
//               <div className="h-[40vh] sm:h-[35vh] lg:h-auto lg:w-80 xl:w-96 border-t lg:border-t-0 border-panel-border order-2 flex-shrink-0">
//                 <OutputTerminal
//                   output={output}
//                   isRunning={isRunning}
//                   onClear={clearOutput}
//                 />
//               </div>
//             </div>
//         </div>

//         {/* Desktop Sidebar - No transition for snappy feel */}
//         {sidebarOpen && (
//           <div className="hidden lg:block w-64 xl:w-72 border-l border-panel-border bg-panel-background flex-shrink-0">
//             <div className="h-full flex flex-col">
//               <div className="p-3 xl:p-4 border-b border-panel-border">
//                 <h3 className="font-semibold text-xs sm:text-sm xl:text-base">Online Users</h3>
//               </div>

//               <div className="flex-1 overflow-auto">
//                 <OnlineUsers users={onlineUsers} />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile/Tablet Sidebar - Slide in from right, no transition */}
//         {sidebarOpen && (
//           <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
//             <div 
//               className="absolute right-0 top-0 h-full w-72 sm:w-80 max-w-[85vw] bg-panel-background border-l border-panel-border shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="h-full flex flex-col">
//                 <div className="p-3 sm:p-4 border-b border-panel-border flex items-center justify-between">
//                   <h3 className="font-semibold text-xs sm:text-sm">Online Users</h3>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setSidebarOpen(false)}
//                     className="ml-2 p-1 h-6 w-6"
//                   >
//                     <ChevronRight className="w-4 h-4" />
//                   </Button>
//                 </div>

//                 <div className="flex-1 overflow-auto">
//                   <OnlineUsers users={onlineUsers} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Username Modal */}
//       <UsernameModal
//         isOpen={showUsernameModal}
//         onSubmit={handleUsernameSubmit}
//         roomId={roomId}
//       />
//     </div>
//   );
// };

// export default Room;



























// import { io } from "socket.io-client";
// import { useState, useEffect } from "react";
// import { Code, Share2, Play, Users, ChevronRight, ChevronLeft, X, Copy, Check, LogOut, Trash2 } from 'lucide-react';

// const socket = io("http://localhost:5000");

// const Room = () => {
//   const roomId = "abc123"; // Mock room ID

//   const [code, setCode] = useState(`// Welcome to CodeBin!
// // Start typing your code here...

// function greet(name) {
//   return \`Hello, \${name}! Welcome to CodeBin.\`;
// }

// console.log(greet("Developer"));
// `);
//   const [language, setLanguage] = useState("javascript");
//   const [output, setOutput] = useState("");
//   const [isRunning, setIsRunning] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [showUsernameModal, setShowUsernameModal] = useState(true);
//   const [currentUsername, setCurrentUsername] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [usernameInput, setUsernameInput] = useState("");

//   const [onlineUsers, setOnlineUsers] = useState([]);

//   const handleUsernameSubmit = (e) => {
//     e.preventDefault();
//     if (!usernameInput.trim()) return;

//     socket.emit("join-room", { roomId, username: usernameInput });

//     setCurrentUsername(usernameInput);
//     setShowUsernameModal(false);
//   };

//   const runCode = async () => {
//     setIsRunning(true);
//     setOutput("");

//     setTimeout(() => {
//       let mockOutput = "";

//       switch (language) {
//         case "javascript":
//           mockOutput = `$ node main.js\nHello, Developer! Welcome to CodeBin.\n\n✓ Execution completed successfully in 234ms`;
//           break;
//         case "python":
//           mockOutput = `$ python main.py\nHello, Developer! Welcome to CodeBin.\n\n✓ Process finished with exit code 0`;
//           break;
//         case "cpp":
//           mockOutput = `$ g++ -o main main.cpp && ./main\nHello, Developer! Welcome to CodeBin.\n\n✓ Compilation successful, execution time: 0.12s`;
//           break;
//         default:
//           mockOutput = `$ Running ${language} code...\nOutput will be displayed here.\n\n✓ Execution completed.`;
//       }

//       setOutput(mockOutput);
//       setIsRunning(false);
//     }, 1500);
//   };

//   const clearOutput = () => {
//     setOutput("");
//   };

//   const copyRoomId = () => {
//     navigator.clipboard.writeText(roomId);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleCodeChange = (e) => {
//     setCode(e.target.value);
//   };

//   useEffect(() => {
//     socket.on("room-users", (users) => {
//       setOnlineUsers(users);
//     });

//     return () => {
//       socket.off("room-users");
//     };
//   }, []);

//   return (
//     <div className="h-screen flex flex-col bg-[#020617] text-gray-100">
//       {/* Navbar */}
//       <div className="h-14 border-b border-gray-800 bg-[#0f172a] flex items-center justify-between px-4">
//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
//               <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//             </div>
//             <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
//               CodeBin
//             </span>
//           </div>

//           <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] rounded-lg border border-gray-700">
//             <span className="text-xs text-gray-400">Room:</span>
//             <span className="text-sm font-mono text-purple-400">{roomId}</span>
//             <button
//               onClick={copyRoomId}
//               className="ml-1 p-1 hover:bg-gray-700 rounded transition-colors"
//             >
//               {copied ? (
//                 <Check className="w-3.5 h-3.5 text-green-400" />
//               ) : (
//                 <Copy className="w-3.5 h-3.5 text-gray-400" />
//               )}
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] rounded-lg border border-gray-700">
//             <Users className="w-4 h-4 text-purple-400" />
//             <span className="text-sm">{onlineUsers.length + 1} online</span>
//           </div>

//           <button className="p-2 hover:bg-[#1e293b] rounded-lg transition-colors">
//             <Share2 className="w-4 h-4" />
//           </button>

//           <button className="p-2 hover:bg-[#1e293b] rounded-lg transition-colors text-red-400">
//             <LogOut className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       <div className="flex-1 flex overflow-hidden">
//         {/* Main Editor Area */}
//         <div className="flex-1 flex flex-col min-w-0">
//           {/* Toolbar */}
//           <div className="h-12 border-b border-gray-800 bg-[#0f172a] px-4 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//                 className="px-3 py-1.5 bg-[#1e293b] border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors"
//               >
//                 <option value="javascript">JavaScript</option>
//                 <option value="python">Python</option>
//                 <option value="cpp">C++</option>
//                 <option value="java">Java</option>
//                 <option value="go">Go</option>
//               </select>

//               <button
//                 onClick={runCode}
//                 disabled={isRunning}
//                 className="px-4 py-1.5 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
//                 {isRunning ? "Running..." : "Run Code"}
//               </button>
//             </div>

//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="px-3 py-1.5 hover:bg-[#1e293b] rounded-lg transition-colors flex items-center gap-2 text-sm"
//             >
//               <Users className="w-4 h-4" />
//               <span className="hidden sm:inline">{sidebarOpen ? "Hide" : "Show"} Users</span>
//             </button>
//           </div>

//           {/* Editor and Terminal Split */}
//           <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
//             {/* Code Editor */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Editor Tabs */}
//               <div className="h-10 border-b border-gray-800 bg-[#0f172a] flex items-center px-2">
//                 <div className="px-3 py-1.5 bg-[#1e293b] rounded-t-lg text-sm flex items-center gap-2 border-t border-l border-r border-gray-700">
//                   <span className="w-2 h-2 rounded-full bg-purple-500"></span>
//                   <span>main.{language === 'javascript' ? 'js' : language === 'python' ? 'py' : language === 'cpp' ? 'cpp' : 'txt'}</span>
//                 </div>
//               </div>

//               {/* Editor Content */}
//               <div className="flex-1 bg-[#1a1a2e] overflow-auto">
//                 <div className="flex h-full">
//                   {/* Line Numbers */}
//                   <div className="w-12 bg-[#0f0f1e] text-gray-500 text-right pr-4 pt-4 font-mono text-sm select-none flex-shrink-0">
//                     {code.split('\n').map((_, i) => (
//                       <div key={i} className="leading-6">{i + 1}</div>
//                     ))}
//                   </div>

//                   {/* Code Area */}
//                   <textarea
//                     value={code}
//                     onChange={handleCodeChange}
//                     className="flex-1 bg-[#1a1a2e] text-gray-100 p-4 font-mono text-sm leading-6 focus:outline-none resize-none caret-white"
//                     spellCheck="false"
//                     style={{ tabSize: 2 }}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Terminal */}
//             <div className="h-64 lg:h-auto lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-800 bg-[#0f172a] flex flex-col">
//               {/* Terminal Header */}
//               <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-green-400">$</span>
//                   <span className="text-sm font-medium">Terminal</span>
//                 </div>
//                 <button
//                   onClick={clearOutput}
//                   className="p-1 hover:bg-[#1e293b] rounded transition-colors"
//                   title="Clear output"
//                 >
//                   <Trash2 className="w-3.5 h-3.5 text-gray-400" />
//                 </button>
//               </div>

//               {/* Terminal Content */}
//               <div className="flex-1 overflow-auto p-4">
//                 {isRunning ? (
//                   <div className="flex items-center gap-2 text-yellow-400">
//                     <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
//                     <span className="text-sm">Executing code...</span>
//                   </div>
//                 ) : output ? (
//                   <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">{output}</pre>
//                 ) : (
//                   <div className="text-sm text-gray-500 font-mono">
//                     <div>$ Waiting for code execution...</div>
//                     <div className="mt-2 text-gray-600">Press "Run Code" to execute your program</div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         {sidebarOpen && (
//           <div className="hidden lg:block w-64 border-l border-gray-800 bg-[#0f172a]">
//             <div className="h-full flex flex-col">
//               <div className="p-4 border-b border-gray-800">
//                 <h3 className="font-semibold text-sm">Online Users ({onlineUsers.length + 1})</h3>
//               </div>

//               <div className="flex-1 overflow-auto p-2">
//                 {currentUsername && (
//                   <div className="p-3 mb-2 bg-[#1e293b] rounded-lg border border-purple-500/30">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
//                         {currentUsername[0].toUpperCase()}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="text-sm font-medium truncate">{currentUsername}</div>
//                         <div className="text-xs text-gray-400">You</div>
//                       </div>
//                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                     </div>
//                   </div>
//                 )}

//                 {onlineUsers.map((user) => (
//                   <div key={user.id} className="p-3 mb-2 hover:bg-[#1e293b] rounded-lg transition-colors">
//                     <div className="flex items-center gap-3">
//                       <div className={`w-8 h-8 ${user.color} rounded-full flex items-center justify-center text-sm font-semibold`}>
//                         {user.username[0].toUpperCase()}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="text-sm font-medium truncate">{user.username}</div>
//                       </div>
//                       <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Mobile Sidebar */}
//         {sidebarOpen && (
//           <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
//             <div
//               className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#0f172a] border-l border-gray-800 shadow-xl"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="h-full flex flex-col">
//                 <div className="p-4 border-b border-gray-800 flex items-center justify-between">
//                   <h3 className="font-semibold text-sm">Online Users ({onlineUsers.length + 1})</h3>
//                   <button
//                     onClick={() => setSidebarOpen(false)}
//                     className="p-1 hover:bg-[#1e293b] rounded transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <div className="flex-1 overflow-auto p-2">
//                   {currentUsername && (
//                     <div className="p-3 mb-2 bg-[#1e293b] rounded-lg border border-purple-500/30">
//                       <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
//                           {currentUsername[0].toUpperCase()}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="text-sm font-medium truncate">{currentUsername}</div>
//                           <div className="text-xs text-gray-400">You</div>
//                         </div>
//                         <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                       </div>
//                     </div>
//                   )}

//                   {onlineUsers.map((user) => (
//                     <div key={user.id} className="p-3 mb-2 hover:bg-[#1e293b] rounded-lg transition-colors">
//                       <div className="flex items-center gap-3">
//                         <div className={`w-8 h-8 ${user.color} rounded-full flex items-center justify-center text-sm font-semibold`}>
//                           {user.username[0].toUpperCase()}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="text-sm font-medium truncate">{user.name}</div>
//                         </div>
//                         <div className="w-2 h-2 bg-green-400 rounded-full"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Username Modal */}
//       {showUsernameModal && (
//         <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
//             <div className="text-center mb-6">
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                 <Users className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold mb-2">Join Room</h2>
//               <p className="text-gray-400 text-sm">
//                 Enter your username to join room <span className="text-purple-400 font-mono">{roomId}</span>
//               </p>
//             </div>

//             <div onSubmit={handleUsernameSubmit}>
//               <input
//                 type="text"
//                 value={usernameInput}
//                 onChange={(e) => setUsernameInput(e.target.value)}
//                 placeholder="Enter your username"
//                 className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors mb-4"
//                 autoFocus
//               />

//               <button
//                 onClick={handleUsernameSubmit}
//                 className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-purple-600  hover:from-purple-500 hover:to-purple-600 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!usernameInput.trim()}
//               >
//                 Join Room
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Room;










import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Code, Share2, Play, Users, X, Copy, Check, LogOut, Trash2
} from 'lucide-react';
// import { OutputTerminal } from "../components/editor/OutputTerminal";
import { InterectiveTerminal } from "../components/editor/InterectiveTerminal";


const socket = io("http://localhost:5000");

const Room = () => {
  // ✅ get roomId dynamically from URL
  const { roomId } = useParams();

  const [code, setCode] = useState(`// Welcome to CodeBin!
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Developer"));`);

  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [currentUsername, setCurrentUsername] = useState("");
  const [copied, setCopied] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);

  // ✅ Handle username submit
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    socket.emit("join-room", { roomId, username: usernameInput });
    setCurrentUsername(usernameInput);
    setShowUsernameModal(false);
  };

  // ✅ Share room URL
  const handleShareRoom = () => {
    const roomURL = `${window.location.origin}/room/${roomId}`;
    navigator.clipboard.writeText(roomURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ Handle code changes
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    socket.emit("code-change", { roomId, code: newCode });
  };

  // const runCode = async () => {
  //   setIsRunning(true);
  //   setOutput("");

  //   setTimeout(() => {
  //     const result = `$ node main.js\n${greetOutput()}\n✓ Execution complete`;
  //     setOutput(result);
  //     setIsRunning(false);
  //   }, 1000);
  // };
  const defaultSnippets = {
    javascript: `// Welcome to CodeBin!
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Developer"));`,

    python: `# Welcome to CodeBin
def greet(name):
    return f"Hello, {name}!"

print(greet("Developer"))`,

    cpp: `// Welcome to CodeBin
#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << greet("Developer") << endl;
    return 0;
}`
  };
  const runCode = () => {
    // setIsRunning(true);
    setOutput("");
    socket.emit("run-code", { roomId, language, code, input });
    setOutput("$ Running code...");
  };

  useEffect(() => {
    socket.on("terminal-output", ({ output }) => {
      setOutput((prev) => prev + "\n" + output);

    });
    socket.on("code-finished", () => {
      setIsRunning(false); // ✅ stop the "Running..." state
    });
    return () => {
      socket.off("terminal-output");
      socket.off("code-finished");
    };
  }, []);





  const greetOutput = () => `Hello, Developer!`;

  const clearOutput = () => setOutput("");

  // ✅ Listen for real-time updates
  useEffect(() => {
    socket.on("room-users", (users) => {
      setOnlineUsers(users);
    });

    socket.on("code-update", (updatedCode) => {
      setCode(updatedCode);
    });

    return () => {
      socket.off("room-users");
      socket.off("code-update");
    };
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#020617] text-gray-100">
      {/* Navbar */}
      <div className="h-14 border-b border-gray-800 bg-[#0f172a] flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
              CodeBin
            </span>
          </div>

          {/* ✅ show actual roomId */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] rounded-lg border border-gray-700">
            <span className="text-xs text-gray-400">Room:</span>
            <span className="text-sm font-mono text-purple-400">{roomId}</span>
            <button onClick={() => {
              navigator.clipboard.writeText(roomId);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }} className="ml-1 p-1 hover:bg-gray-700 rounded transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-gray-400" />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] rounded-lg border border-gray-700">
            <Users className="w-4 h-4 text-purple-400" />
            {/* ✅ show real count */}
            <span className="text-sm">{onlineUsers.length} online</span>
          </div>

          {/* ✅ Share button works now */}
          <button
            onClick={handleShareRoom}
            className="p-2 hover:bg-[#1e293b] rounded-lg transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button className="p-2 hover:bg-[#1e293b] rounded-lg transition-colors text-red-400">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="h-12 border-b border-gray-800 bg-[#0f172a] px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1.5 bg-[#1e293b] border border-gray-700 rounded-lg text-sm focus:outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select> */}

              <select
                value={language}
                onChange={(e) => {
                  const newLang = e.target.value;
                  setLanguage(newLang);
                  setCode(defaultSnippets[newLang]); // <-- update code snippet
                  socket.emit("code-change", { roomId, code: defaultSnippets[newLang] }); // optional: sync snippet with others
                }}
                className="px-3 py-1.5 bg-[#1e293b] border border-gray-700 rounded-lg text-sm focus:outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>


              <button
                onClick={runCode}
                disabled={isRunning}
                className="px-4 py-1.5 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Play className={`w-4 h-4 ${isRunning ? 'animate-pulse' : ''}`} />
                {isRunning ? "Running..." : "Run Code"}
              </button>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex-1 bg-[#1a1a2e] overflow-auto">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-full bg-[#1a1a2e] text-gray-100 p-4 font-mono text-sm leading-6 focus:outline-none resize-none"
              spellCheck="false"
              style={{ tabSize: 2 }}
            />
          </div>

          {/* Terminal */}
          {/* <div className="h-64 border-t border-gray-800 bg-[#0f172a] flex flex-col">
            <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4">
              <span className="text-sm font-medium text-green-400">$ Terminal</span>
              <button onClick={clearOutput} className="p-1 hover:bg-[#1e293b] rounded">
                <Trash2 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {output ? (
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">{output}</pre>
              ) : (
                <div className="text-sm text-gray-500 font-mono">Waiting for code execution...</div>
              )}
            </div>
          </div> */}
          <div className="h-64 border-t border-gray-800 bg-[#0f172a] flex flex-col">
            <div className="h-10 border-b border-gray-800 flex items-center justify-between px-4">
              <span className="text-sm font-medium text-green-400">$ Terminal</span>
            </div>
            <div className="flex-1 overflow-hidden">
              <InterectiveTerminal socket={socket} roomId={roomId} />
            </div>
          </div>

        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div className="hidden lg:block w-64 border-l border-gray-800 bg-[#0f172a]">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-semibold text-sm">Online Users ({onlineUsers.length})</h3>
            </div>
            <div className="flex-1 overflow-auto p-2">
              {onlineUsers.map((user) => (
                <div key={user.id} className="p-3 mb-2 bg-[#1e293b] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.username[0].toUpperCase()}
                    </div>
                    <div className="text-sm font-medium">{user.username}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Username Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Join Room</h2>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-[#1e293b] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors mb-4"
              autoFocus
            />

            <button
              onClick={handleUsernameSubmit}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-400 to-purple-600  hover:from-purple-500 hover:to-purple-600 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!usernameInput.trim()}
            >
              Join Room
            </button>
          </div>
        </div>
      )
      }
    </div >
  );
};

export default Room;

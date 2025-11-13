
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Input, Card, ArrowRight } from '@/components/ui'; // All valid exports
// import { Navbar } from "@/components/layout/Navbar";
// import { Code, Plus, Github, Zap, Users, Play } from 'lucide-react'; // Icons from lucide-react
// import { v4 as uuidv4 } from "uuid";
// import { toast } from "@/components/ui"; // using global toast from ui/index.jsx

// const Index = () => {
//   const navigate = useNavigate();
//   const [roomCode, setRoomCode] = useState("");

//   const createNewRoom = () => {
//     const newRoomId = uuidv4().slice(0, 8);
//     navigate(`/room/${newRoomId}`);
//     toast(`Room created! ID: ${newRoomId}`);
//   };

//   const joinRoom = () => {
//     if (!roomCode.trim()) {
//       toast("Please enter a valid room code.");
//       return;
//     }
//     navigate(`/room/${roomCode.trim()}`);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") joinRoom();
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
//         <div className="text-center mb-12 lg:mb-16">
//           <div className="flex justify-center mb-4 lg:mb-6">
//             <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
//               <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
//             </div>
//           </div>

//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
//             <span className="bg-gradient-primary bg-clip-text text-transparent">
//               CodeBin
//             </span>
//           </h1>

//           <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
//             Real-time collaborative code editing and execution. Share code instantly, 
//             collaborate seamlessly, and run your code with just one click.
//           </p>

//           {/* Action Cards */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12 lg:mb-16">
//             {/* Create Room */}
//             <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg p-6 text-center">
//               <div className="flex justify-center mb-3">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl font-semibold mb-2">Create New Room</h2>
//               <p className="text-sm sm:text-base text-muted-foreground mb-4">
//                 Start a new collaborative coding session with a unique room ID
//               </p>
//               <Button
//                 onClick={createNewRoom}
//                 className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-11 sm:h-12 text-sm sm:text-base"
//               >
//                 Create Room
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </Card>

//             {/* Join Room */}
//             <Card className="hover:shadow-lg transition-all duration-300 p-6 text-center">
//               <div className="flex justify-center mb-3">
//                 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
//                   <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
//                 </div>
//               </div>
//               <h2 className="text-lg sm:text-xl font-semibold mb-2">Join Existing Room</h2>
//               <p className="text-sm sm:text-base text-muted-foreground mb-4">
//                 Enter a room code to join an ongoing coding session
//               </p>
//               <Input
//                 placeholder="Enter room code..."
//                 value={roomCode}
//                 onChange={(e) => setRoomCode(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 className="text-center font-mono h-11 sm:h-12 text-sm sm:text-base mb-4"
//               />
//               <Button
//                 onClick={joinRoom}
//                 className="w-full h-11 sm:h-12 text-sm sm:text-base hover:bg-primary hover:text-white transition-all duration-300"
//               >
//                 Join Room
//                 <ArrowRight className="w-4 h-4 ml-2" />
//               </Button>
//             </Card>
//           </div>

//           {/* Features */}
//           <div className="bg-background-alt/50 rounded-2xl p-6 lg:p-8">
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
//               <Feature
//                 icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
//                 title="Real-time Collaboration"
//                 desc="Edit code together with live cursors and instant synchronization"
//               />
//               <Feature
//                 icon={<Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
//                 title="Code Execution"
//                 desc="Run your code instantly and see results in the integrated terminal"
//               />
//               <Feature
//                 icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />}
//                 title="Lightning Fast"
//                 desc="Minimal interface with maximum performance for distraction-free coding"
//               />
//             </div>
//           </div>
//         </div>
//       </main>

//       <footer className="border-t border-border bg-background-alt/30 mt-12 lg:mt-16 py-6 lg:py-8">
//         <div className="container mx-auto px-4 text-center">
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
//             <span>Built with ❤️ for developers</span>
//             <div className="flex items-center gap-2">
//               <Github className="w-3 h-3 sm:w-4 sm:h-4" />
//               <a 
//                 href="https://github.com"
//                 className="hover:text-primary transition-colors underline-offset-2 hover:underline"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View on GitHub
//               </a>
//             </div>
//             <span className="hidden sm:inline">•</span>
//             <span>Created by CodeBin Team</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const Feature = ({ icon, title, desc }) => (
//   <div className="flex flex-col items-center text-center p-4 lg:p-6">
//     <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
//       {icon}
//     </div>
//     <h3 className="font-semibold mb-2 text-sm sm:text-base">{title}</h3>
//     <p className="text-xs sm:text-sm text-muted-foreground">{desc}</p>
//   </div>
// );

// export default Index;

















// import { useState } from "react";
// import { Code, Plus, Github, Zap, Users, Play, ArrowRight, Sparkles } from 'lucide-react';

// const Index = () => {
//   const [roomCode, setRoomCode] = useState("");

//   const createNewRoom = () => {
//     const newRoomId = Math.random().toString(36).substring(2, 10);
//     alert(`Room created! ID: ${newRoomId}`);
//   };

//   const joinRoom = () => {
//     if (!roomCode.trim()) {
//       alert("Please enter a valid room code.");
//       return;
//     }
//     alert(`Joining room: ${roomCode.trim()}`);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") joinRoom();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
//       {/* Animated background elements - more subtle */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
//       </div>

//       {/* Navbar */}
//       <nav className="relative border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-xl">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
//                 <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
//               </div>
//               <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
//                 CodeBin
//               </span>
//             </div>
//             <div className="flex items-center gap-3 sm:gap-4">
//               <a href="#" className="text-xs sm:text-sm text-slate-300 hover:text-purple-400 transition-colors">
//                 About
//               </a>
//               <a href="#" className="text-xs sm:text-sm text-slate-300 hover:text-purple-400 transition-colors">
//                 Docs
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <main className="relative container mx-auto px-4 py-8 sm:py-12 lg:py-20">
//         {/* Hero Section */}
//         <div className="text-center mb-12 sm:mb-16 lg:mb-20">
//           <div className="flex justify-center mb-4 sm:mb-6">
//             <div className="relative">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 animate-pulse"></div>
//               <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
//                 <Code className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
//               </div>
//             </div>
//           </div>

//           <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in">
//             <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
//               CodeBin
//             </span>
//           </h1>

//           <p className="text-base sm:text-lg lg:text-2xl text-slate-200 mb-3 sm:mb-4 max-w-3xl mx-auto px-4 leading-relaxed">
//             Real-time collaborative code editing and execution
//           </p>
          
//           <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
//             Share code instantly, collaborate seamlessly, and run your code with just one click
//           </p>

//           {/* Action Cards - Horizontal on desktop, Vertical on mobile */}
//           <div className="flex flex-col md:flex-row gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
//             {/* Create Room Card */}
//             <div className="group relative flex-1">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//               <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:transform hover:scale-[1.02] h-full flex flex-col">
//                 <div className="flex justify-center mb-3 sm:mb-4">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-purple-500/30">
//                     <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" />
//                   </div>
//                 </div>
//                 <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white">Create New Room</h2>
//                 <p className="text-slate-300 mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed min-h-[40px] sm:min-h-[44px]">
//                   Start a new collaborative coding session with a unique room ID
//                 </p>
//                 <div className="mt-auto">
//                   <button
//                     onClick={createNewRoom}
//                     className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
//                   >
//                     Create Room
//                     <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Join Room Card */}
//             <div className="group relative flex-1">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
//               <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700/50 hover:border-purple-500/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:transform hover:scale-[1.02] h-full flex flex-col">
//                 <div className="flex justify-center mb-3 sm:mb-4">
//                   <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-slate-800/50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-slate-700/50">
//                     <Code className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" />
//                   </div>
//                 </div>
//                 <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white">Join Existing Room</h2>
//                 <p className="text-slate-300 mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed min-h-[40px] sm:min-h-[44px]">
//                   Enter a room code to join an ongoing coding session
//                 </p>
//                 <div className="mt-auto space-y-3 sm:space-y-4">
//                   <input
//                     type="text"
//                     placeholder="Enter room code..."
//                     value={roomCode}
//                     onChange={(e) => setRoomCode(e.target.value)}
//                     onKeyPress={handleKeyPress}
//                     className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono text-white placeholder-slate-400 outline-none transition-all duration-300 text-sm sm:text-base"
//                   />
//                   <button
//                     onClick={joinRoom}
//                     className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg sm:rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
//                   >
//                     Join Room
//                     <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Features Section */}
//           <div className="relative bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
//             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//               <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2">
//                 <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
//                 <span className="text-xs sm:text-sm font-semibold text-white">Features</span>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto mt-4 sm:mt-6">
//               <Feature
//                 icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
//                 title="Real-time Collaboration"
//                 desc="Edit code together with live cursors and instant synchronization"
//               />
//               <Feature
//                 icon={<Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
//                 title="Code Execution"
//                 desc="Run your code instantly and see results in the integrated terminal"
//               />
//               <Feature
//                 icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
//                 title="Lightning Fast"
//                 desc="Minimal interface with maximum performance for distraction-free coding"
//               />
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="relative border-t border-purple-500/20 bg-slate-950/80 backdrop-blur-xl py-6 sm:py-8">
//         <div className="container mx-auto px-4 text-center">
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
//             <span>Built with ❤️ for developers</span>
//             <div className="flex items-center gap-2">
//               <Github className="w-3 h-3 sm:w-4 sm:h-4" />
//               <a 
//                 href="https://github.com"
//                 className="hover:text-purple-400 transition-colors underline-offset-2 hover:underline"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View on GitHub
//               </a>
//             </div>
//             <span className="hidden sm:inline">•</span>
//             <span>Created by CodeBin Team</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// const Feature = ({ icon, title, desc }) => (
//   <div className="group flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl ">
//     <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 border border-purple-500/30 ">
//       {icon}
//     </div>
//     <h3 className="font-bold mb-2 text-base sm:text-lg text-white">{title}</h3>
//     <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{desc}</p>
//   </div>
// );

// export default Index;

































import { useState } from "react";
import { Code, Plus, Github, Zap, Users, Play, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const [roomCode, setRoomCode] = useState("");

  const createNewRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    // Simulate navigation - replace with actual navigation logic
    window.location.href = `/room/${newRoomId}`;
  };

  const joinRoom = () => {
    if (!roomCode.trim()) {
      alert("Please enter a valid room code.");
      return;
    }
    // Simulate navigation - replace with actual navigation logic
    window.location.href = `/room/${roomCode.trim()}`;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") joinRoom();
  };

  return (
    <>
      <style>{`
        body, html {
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          width: 100%;
        }
      `}</style>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
        {/* Animated background elements - more subtle */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Navbar */}
        <nav className="relative border-b border-purple-500/20 bg-slate-950/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  CodeBin
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <a href="#" className="text-xs sm:text-sm text-slate-300 hover:text-purple-400 transition-colors">
                  About
                </a>
                <a href="#" className="text-xs sm:text-sm text-slate-300 hover:text-purple-400 transition-colors">
                  Docs
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="relative container mx-auto px-4 py-8 sm:py-12 lg:py-20">
          {/* Hero Section */}
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-40 animate-pulse"></div>
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <Code className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                CodeBin
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-2xl text-slate-200 mb-3 sm:mb-4 max-w-3xl mx-auto px-4 leading-relaxed">
              Real-time collaborative code editing and execution
            </p>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto px-4">
              Share code instantly, collaborate seamlessly, and run your code with just one click
            </p>

            {/* Action Cards - Horizontal on desktop, Vertical on mobile */}
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 max-w-4xl mx-auto mb-12 sm:mb-16 lg:mb-20">
              {/* Create Room Card */}
              <div className="group relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-purple-500/30 hover:border-purple-500/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:transform hover:scale-[1.02] h-full flex flex-col">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl sm:rounded-2xl flex items-center justify-center border border-purple-500/30">
                      <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" />
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white">Create New Room</h2>
                  <p className="text-slate-300 mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed flex-grow">
                    Start a new collaborative coding session with a unique room ID
                  </p>
                  <button
                    onClick={createNewRoom}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:transform hover:scale-[1.02] flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    Create Room
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Join Room Card */}
              <div className="group relative flex-1">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700/50 hover:border-purple-500/60 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:transform hover:scale-[1.02] h-full flex flex-col">
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-slate-800/50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-slate-700/50">
                      <Code className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-400" />
                    </div>
                  </div>
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 text-white">Join Existing Room</h2>
                  <p className="text-slate-300 mb-4 sm:mb-5 lg:mb-6 text-xs sm:text-sm lg:text-base leading-relaxed">
                    Enter a room code to join an ongoing coding session
                  </p>
                  <div className="mt-auto space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      placeholder="Enter room code..."
                      value={roomCode}
                      onChange={(e) => setRoomCode(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full bg-slate-800/70 border border-slate-700/50 focus:border-purple-500/50 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-center font-mono text-white placeholder-slate-400 outline-none transition-all duration-300 text-sm sm:text-base"
                    />
                    <button
                      onClick={joinRoom}
                      className="w-full bg-slate-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-3 sm:py-3.5 lg:py-4 px-4 sm:px-5 lg:px-6 rounded-lg sm:rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-transparent hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      Join Room
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="relative bg-slate-900/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-full px-4 sm:px-6 py-1.5 sm:py-2 flex items-center gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  <span className="text-xs sm:text-sm font-semibold text-white">Features</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto mt-4 sm:mt-6">
                <Feature
                  icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
                  title="Real-time Collaboration"
                  desc="Edit code together with live cursors and instant synchronization"
                />
                <Feature
                  icon={<Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
                  title="Code Execution"
                  desc="Run your code instantly and see results in the integrated terminal"
                />
                <Feature
                  icon={<Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-purple-400" />}
                  title="Lightning Fast"
                  desc="Minimal interface with maximum performance for distraction-free coding"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-purple-500/20 bg-slate-950/80 backdrop-blur-xl py-6 sm:py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
              <span>Built By Vinay</span>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">•</span>
                <Github className="w-3 h-3 sm:w-4 sm:h-4" />
                <a 
                  href="https://github.com/Vinay42"
                  className="hover:text-purple-400 transition-colors underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

const Feature = ({ icon, title, desc }) => (
  <div className="group flex flex-col items-center text-center p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl hover:bg-slate-800/30 transition-all duration-300">
    <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 border border-purple-500/30 group-hover:border-purple-500/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
      {icon}
    </div>
    <h3 className="font-bold mb-2 text-base sm:text-lg text-white">{title}</h3>
    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{desc}</p>
  </div>
);

export default Index;
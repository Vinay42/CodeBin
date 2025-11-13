// import { Link } from "react-router-dom";
// import { Button } from '@/components/ui';;
// import { ThemeToggle } from '@/components/ui';;
// import { Code, Users  } from '@/components/ui';;



// export const Navbar = ({ onlineUsers, roomId }: NavbarProps) => {
//   return (
//     <nav className="h-14 bg-navbar-background/80 backdrop-blur-lg border-b border-navbar-border shadow-navbar px-4 flex items-center justify-between sticky top-0 z-50">
//       <div className="flex items-center gap-3">
//         <Link to="/" className="flex items-center gap-2 group transition-all duration-200">
//           <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
//             <Code className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
//             CodeBin
//           </span>
//         </Link>
        
//         {roomId && (
//           <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
//             <span>Room:</span>
//             <code className="px-2 py-1 bg-muted rounded text-xs font-mono border border-border/50">
//               {roomId}
//             </code>
//           </div>
//         )}
//       </div>

//       <div className="flex items-center gap-3">
//         {onlineUsers !== undefined && (
//           <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
//             <Users className="w-4 h-4" />
//             <span className="hidden sm:inline">Online:</span>
//             <span className="font-medium text-primary">{onlineUsers}</span>
//           </div>
//         )}
        
//         <ThemeToggle />
//       </div>
//     </nav>
//   );
// };


import { Link } from "react-router-dom";
import { Moon, Sun, Code, Users } from "lucide-react";
import { useState } from "react";

export const Navbar = ({ onlineUsers, roomId }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="h-14 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 shadow-sm px-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-200"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:shadow-md transition-all duration-300">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
            CodeBin
          </span>
        </Link>

        {roomId && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Room:</span>
            <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono border border-gray-300 dark:border-gray-600">
              {roomId}
            </code>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {onlineUsers !== undefined && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Online:</span>
            <span className="font-medium text-indigo-500 dark:text-indigo-400">
              {onlineUsers}
            </span>
          </div>
        )}

        {/* Theme toggle (replaces ThemeToggle from shadcn) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          title="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-4 h-4 text-yellow-400" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </nav>
  );
};

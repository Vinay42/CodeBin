import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { LanguageSelector } from "@/components/editor/LanguageSelector";
import { OutputTerminal } from "@/components/editor/OutputTerminal";
import { ShareRoomButton } from "@/components/room/ShareRoomButton";
import { OnlineUsers } from "@/components/room/OnlineUsers";
import { UsernameModal } from "@/components/auth/UsernameModal";
import { Play, Users, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  
  const [code, setCode] = useState(`// Welcome to CodeBin!
// Start typing your code here...

function greet(name) {
  return \`Hello, \${name}! Welcome to CodeBin.\`;
}

console.log(greet("Developer"));
`);
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUsernameModal, setShowUsernameModal] = useState(true);
  const [currentUsername, setCurrentUsername] = useState("");
  
  // Online users data with current user
  const [onlineUsers, setOnlineUsers] = useState([
    { id: "2", name: "Alice", color: "bg-green-500" },
    { id: "3", name: "Bob", color: "bg-purple-500" },
  ]);

  useEffect(() => {
    if (!roomId) {
      navigate("/");
      return;
    }
    
    // Validate room ID format (basic validation)
    if (roomId.length < 3) {
      toast({
        title: "Invalid room ID",
        description: "The room ID appears to be invalid.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }
    
    // Check if username is stored in session
    const storedUsername = sessionStorage.getItem(`username_${roomId}`);
    if (storedUsername) {
      setCurrentUsername(storedUsername);
      setShowUsernameModal(false);
      setOnlineUsers(prev => [
        { id: "current", name: storedUsername, color: "bg-blue-500" },
        ...prev
      ]);
      
      toast({
        title: "Room rejoined!",
        description: `Welcome back, ${storedUsername}`,
      });
    }
  }, [roomId, navigate]);

  const handleUsernameSubmit = (username) => {
    // Check if username is already taken
    const isUsernameTaken = onlineUsers.some(user => 
      user.name.toLowerCase() === username.toLowerCase()
    );
    
    if (isUsernameTaken) {
      toast({
        title: "Username taken",
        description: "Please choose a different username.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentUsername(username);
    setShowUsernameModal(false);
    
    // Store username in session
    sessionStorage.setItem(`username_${roomId}`, username);
    
    // Add current user to online users
    setOnlineUsers(prev => [
      { id: "current", name: username, color: "bg-blue-500" },
      ...prev
    ]);
    
    toast({
      title: "Room joined!",
      description: `Welcome to room ${roomId}, ${username}!`,
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(""); // Clear previous output
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // Mock execution based on language
        let mockOutput = "";
        
        switch (language) {
          case "javascript":
            mockOutput = `> node main.js
Hello, Developer! Welcome to CodeBin.
Execution completed successfully in 234ms`;
            break;
          case "python":
            mockOutput = `> python main.py
Hello, Developer! Welcome to CodeBin.
Process finished with exit code 0`;
            break;
          case "cpp":
            mockOutput = `> g++ -o main main.cpp && ./main
Hello, Developer! Welcome to CodeBin.
Compilation successful, execution time: 0.12s`;
            break;
          default:
            mockOutput = `> Running ${language} code...
Output will be displayed here.
Execution completed.`;
        }
        
        setOutput(mockOutput);
        toast({
          title: "Code executed successfully",
          description: "Check the output terminal for results.",
        });
        
        // Auto-dismiss after 1 second
        setTimeout(() => {
          // The toast will be automatically dismissed by the toast system
        }, 1000);
      } catch (error) {
        setOutput(`Error: Something went wrong during execution.
${error}`);
        toast({
          title: "Execution failed",
          description: "Check the output for error details.",
          variant: "destructive",
        });
        
        // Auto-dismiss after 1 second
        setTimeout(() => {
          // The toast will be automatically dismissed by the toast system
        }, 1000);
      } finally {
        setIsRunning(false);
      }
    }, 1500); // Simulate execution delay
  };

  const clearOutput = () => {
    setOutput("");
  };

  if (!roomId) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar onlineUsers={onlineUsers.length} roomId={roomId} />
      
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Toolbar */}
          <div className="border-b border-panel-border bg-panel-background p-2 sm:p-3">
            {/* Mobile-first responsive layout */}
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Top row - Language selector and Run button on left, Share Room on right */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="flex-shrink-0">
                    <LanguageSelector value={language} onChange={setLanguage} />
                  </div>
                  
                <Button
                  onClick={runCode}
                  disabled={isRunning}
                  className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-[10px] xs:text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
                  size="sm"
                >
                  <Play className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 ${isRunning ? 'animate-pulse' : ''}`} />
                  <span className="hidden xs:inline">{isRunning ? "Running..." : "Run Code"}</span>
                  <span className="xs:hidden">{isRunning ? "..." : "Run"}</span>
                </Button>
                </div>
                
                <div className="flex-shrink-0">
                  <ShareRoomButton roomId={roomId} />
                </div>
              </div>
              
              {/* Bottom row - Show Users button aligned right */}
              <div className="flex items-center justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="gap-1 flex-shrink-0 min-w-[2.5rem] sm:min-w-[3rem] px-2 sm:px-3"
                  title="Toggle Users Panel"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline text-[10px] xs:text-xs sm:text-sm">
                    {sidebarOpen ? "Hide Users" : "Show Users"}
                  </span>
                  <span className="hidden md:inline ml-1">
                    {sidebarOpen ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronLeft className="w-3 h-3" />
                    )}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          
            {/* Editor and Output */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Code Editor */}
              <div className="flex-1 lg:border-r border-panel-border min-h-0 order-1">
                <CodeEditor
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  language={language}
                />
              </div>
              
              {/* Output Terminal - Fixed width on desktop */}
              <div className="h-[40vh] sm:h-[35vh] lg:h-auto lg:w-80 xl:w-96 border-t lg:border-t-0 border-panel-border order-2 flex-shrink-0">
                <OutputTerminal
                  output={output}
                  isRunning={isRunning}
                  onClear={clearOutput}
                />
              </div>
            </div>
        </div>
        
        {/* Desktop Sidebar - No transition for snappy feel */}
        {sidebarOpen && (
          <div className="hidden lg:block w-64 xl:w-72 border-l border-panel-border bg-panel-background flex-shrink-0">
            <div className="h-full flex flex-col">
              <div className="p-3 xl:p-4 border-b border-panel-border">
                <h3 className="font-semibold text-xs sm:text-sm xl:text-base">Online Users</h3>
              </div>
              
              <div className="flex-1 overflow-auto">
                <OnlineUsers users={onlineUsers} />
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile/Tablet Sidebar - Slide in from right, no transition */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
            <div 
              className="absolute right-0 top-0 h-full w-72 sm:w-80 max-w-[85vw] bg-panel-background border-l border-panel-border shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className="p-3 sm:p-4 border-b border-panel-border flex items-center justify-between">
                  <h3 className="font-semibold text-xs sm:text-sm">Online Users</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                    className="ml-2 p-1 h-6 w-6"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-auto">
                  <OnlineUsers users={onlineUsers} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Username Modal */}
      <UsernameModal
        isOpen={showUsernameModal}
        onSubmit={handleUsernameSubmit}
        roomId={roomId}
      />
    </div>
  );
};

export default Room;
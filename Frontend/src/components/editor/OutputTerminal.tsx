import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutputTerminalProps {
  output: string;
  isRunning: boolean;
  onClear: () => void;
}

export const OutputTerminal = ({ output, isRunning, onClear }: OutputTerminalProps) => {
  const formatOutput = (text: string) => {
    if (!text) return null;
    
    const lines = text.split('\n');
    return lines.map((line, index) => {
      let className = "text-terminal-foreground";
      
      // Color coding for different output types
      if (line.includes('Error') || line.includes('error') || line.includes('ERROR')) {
        className = "text-terminal-red";
      } else if (line.includes('Warning') || line.includes('warning') || line.includes('WARN')) {
        className = "text-terminal-yellow";
      } else if (line.includes('Success') || line.includes('✓') || line.includes('OK')) {
        className = "text-terminal-green";
      }
      
      return (
        <div key={index} className={`font-mono text-xs sm:text-sm leading-relaxed ${className}`}>
          {line || '\u00A0'} {/* Non-breaking space for empty lines */}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col bg-terminal-background border border-panel-border rounded-lg">
      <div className="flex items-center justify-between p-3 border-b border-panel-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-terminal-foreground" />
          <span className="text-xs sm:text-sm font-medium text-terminal-foreground">Output</span>
          {isRunning && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs text-terminal-green">Running...</span>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 w-6 p-0 text-terminal-foreground hover:text-terminal-red hover:bg-terminal-background/50"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="space-y-1">
          {output ? (
            formatOutput(output)
          ) : (
            <div className="text-terminal-foreground/60 font-mono text-xs sm:text-sm italic">
              Output will appear here...
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
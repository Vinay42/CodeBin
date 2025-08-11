import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

export const OutputTerminal = ({ output, isRunning, onClear }) => {
  const formatOutput = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => {
      let className = "text-terminal-foreground text-xs"; // Mobile font size
      
      // Color coding based on keywords
      if (line.includes('Error') || line.includes('error')) {
        className = "text-terminal-red text-xs";
      } else if (line.includes('Warning') || line.includes('warning')) {
        className = "text-terminal-yellow text-xs";
      } else if (line.includes('Success') || line.includes('completed')) {
        className = "text-terminal-green text-xs";
      }
      
      return (
        <div key={index} className={className}>
          {line}
        </div>
      );
    });
  };

  return (
    <div className="h-full flex flex-col bg-terminal-background border-panel-border">
      {/* Header */}
      <div className="flex items-center justify-between p-2 sm:p-3 border-b border-panel-border bg-panel-background">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-terminal-red"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-terminal-green"></div>
          </div>
          <span className="text-xs font-medium text-muted-foreground ml-2">Output</span>
          {isRunning && (
            <div className="flex items-center gap-1 ml-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-[10px] sm:text-xs text-primary">Running...</span>
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-6 w-6 sm:h-8 sm:w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
          title="Clear output"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <div className="p-3 sm:p-4 font-mono leading-relaxed">
            {output ? (
              formatOutput(output)
            ) : (
              <div className="text-muted-foreground text-xs italic">
                Output will appear here...
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
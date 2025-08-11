import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const UsernameModal = ({ isOpen, onSubmit, roomId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    
    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    
    if (username.trim().length > 20) {
      setError("Username must be less than 20 characters");
      return;
    }
    
    // Check for valid characters (alphanumeric and spaces)
    if (!/^[a-zA-Z0-9\s]+$/.test(username.trim())) {
      setError("Username can only contain letters, numbers, and spaces");
      return;
    }
    
    setError("");
    onSubmit(username.trim());
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Join Room</DialogTitle>
          <DialogDescription>
            Enter your username to join room <code className="px-1 py-0.5 bg-muted rounded text-xs font-mono">{roomId}</code>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className={error ? "border-destructive" : ""}
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          
          <DialogFooter>
            <Button type="submit" className="w-full">
              Join Room
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
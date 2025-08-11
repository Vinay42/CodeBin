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
import { User } from "lucide-react";

interface UsernameModalProps {
  isOpen: boolean;
  onSubmit: (username: string) => void;
  roomId: string;
}

export const UsernameModal = ({ isOpen, onSubmit, roomId }: UsernameModalProps) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError("Username is required");
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setError("Username must be at least 2 characters");
      return;
    }
    
    if (trimmedUsername.length > 20) {
      setError("Username must be less than 20 characters");
      return;
    }
    
    if (!/^[a-zA-Z0-9_\s]+$/.test(trimmedUsername)) {
      setError("Username can only contain letters, numbers, spaces, and underscores");
      return;
    }
    
    setError("");
    onSubmit(trimmedUsername);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Join Room {roomId}
          </DialogTitle>
          <DialogDescription>
            Enter your username to join the collaborative coding room.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
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
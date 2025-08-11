import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

interface User {
  id: string;
  name: string;
  color: string;
}

interface OnlineUsersProps {
  users: User[];
}

const generateUserColor = (userId: string): string => {
  const colors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];
  
  const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

export const OnlineUsers = ({ users }: OnlineUsersProps) => {
  if (users.length === 0) {
    return (
      <div className="p-3 md:p-4 text-center text-muted-foreground text-sm">
        <Users className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 opacity-50" />
        <p className="text-xs md:text-sm">No users online</p>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-4 space-y-2 md:space-y-3">
      <div className="flex items-center gap-2">
        <Users className="w-3 h-3 md:w-4 md:h-4" />
        <span className="text-xs md:text-sm font-medium">
          Online ({users.length})
        </span>
      </div>
      
      <div className="space-y-1.5 md:space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2 md:gap-3">
            <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
              <AvatarFallback className={`${generateUserColor(user.id)} text-white text-[10px] md:text-xs`}>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-xs md:text-sm font-medium truncate">{user.name}</p>
              <Badge variant="secondary" className="text-[10px] md:text-xs px-1 py-0">
                Active
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
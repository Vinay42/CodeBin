import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const generateUserColor = (userId) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500", 
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-cyan-500"
  ];
  
  // Simple hash function to assign consistent colors
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash + userId.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
};

export const OnlineUsers = ({ users = [] }) => {
  if (users.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-sm text-muted-foreground">No users online</p>
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3">
      <div className="text-xs text-muted-foreground mb-3">
        {users.length} user{users.length !== 1 ? 's' : ''} online
      </div>
      
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className={`${user.color || generateUserColor(user.id)} text-white text-xs font-semibold`}>
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user.name}
                {user.id === "current" && (
                  <span className="ml-1 text-xs text-muted-foreground">(You)</span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
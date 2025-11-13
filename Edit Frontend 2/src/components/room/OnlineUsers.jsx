// import { Avatar, AvatarFallback } from '@/components/ui';;
// import { Badge } from '@/components/ui';;
// import { Users  } from '@/components/ui';;


// const generateUserColor = (userId) => {
//   const colors = [
//     "bg-red-500",
//     "bg-blue-500", 
//     "bg-green-500",
//     "bg-yellow-500",
//     "bg-purple-500",
//     "bg-pink-500",
//     "bg-indigo-500",
//     "bg-orange-500",
//   ];
  
//   const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
//   return colors[index];
// };

// export const OnlineUsers = ({ users }) => {
//   if (users.length === 0) {
//     return (
//       <div className="p-3 md:p-4 text-center text-muted-foreground text-sm">
//         <Users className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 opacity-50" />
//         <p className="text-xs md:text-sm">No users online</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-3 md:p-4 space-y-2 md:space-y-3">
//       <div className="flex items-center gap-2">
//         <Users className="w-3 h-3 md:w-4 md:h-4" />
//         <span className="text-xs md:text-sm font-medium">
//           Online ({users.length})
//         </span>
//       </div>
      
//       <div className="space-y-1.5 md:space-y-2">
//         {users.map((user) => (
//           <div key={user.id} className="flex items-center gap-2 md:gap-3">
//             <Avatar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
//               <AvatarFallback className={`${generateUserColor(user.id)} text-white text-[10px] md:text-xs`}>
//                 {user.name.slice(0, 2).toUpperCase()}
//               </AvatarFallback>
//             </Avatar>
            
//             <div className="flex-1 min-w-0">
//               <p className="text-xs md:text-sm font-medium truncate">{user.name}</p>
//               <Badge variant="secondary" className="text-[10px] md:text-xs px-1 py-0">
//                 Active
//               </Badge>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { useMemo } from "react";

// Utility to generate a consistent color per user
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
  ];
  const index =
    userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
};

// Users icon (simple SVG)
const UsersIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975M12 15.75a7.488 7.488 0 015.982 2.975M12 15.75a7.488 7.488 0 00-5.982 2.975M12 15.75a7.488 7.488 0 015.982 2.975M12 6.75a3.75 3.75 0 110 7.5a3.75 3.75 0 010-7.5z"
    />
  </svg>
);

export const OnlineUsers = ({ users = [] }) => {
  if (!users.length) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        <UsersIcon className="w-6 h-6 mx-auto mb-2 opacity-60" />
        <p>No users online</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <UsersIcon className="w-4 h-4" />
        <span>Online ({users.length})</span>
      </div>

      <div className="space-y-2">
        {users.map((user) => {
          const color = useMemo(() => generateUserColor(user.id), [user.id]);
          return (
            <div
              key={user.id}
              className="flex items-center gap-3 border border-gray-200 rounded-md p-2"
            >
              {/* Avatar Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs ${color}`}
              >
                {user.name.slice(0, 2).toUpperCase()}
              </div>

              {/* Username + Badge */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <span className="inline-block text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                  Active
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

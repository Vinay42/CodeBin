// import { useState } from "react";
// import { Button } from '@/components/ui';;
// import { Input } from '@/components/ui';;
// import { Label } from '@/components/ui';;
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui';;
// import { User  } from '@/components/ui';;


// export const UsernameModal = ({ isOpen, onSubmit, roomId }) => {
//   const [username, setUsername] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const trimmedUsername = username.trim();
    
//     if (!trimmedUsername) {
//       setError("Username is required");
//       return;
//     }
    
//     if (trimmedUsername.length < 2) {
//       setError("Username must be at least 2 characters");
//       return;
//     }
    
//     if (trimmedUsername.length > 20) {
//       setError("Username must be less than 20 characters");
//       return;
//     }
    
//     if (!/^[a-zA-Z0-9_\s]+$/.test(trimmedUsername)) {
//       setError("Username can only contain letters, numbers, spaces, and underscores");
//       return;
//     }
    
//     setError("");
//     onSubmit(trimmedUsername);
//   };

//   return (
//     <Dialog open={isOpen}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <User className="w-5 h-5" />
//             Join Room {roomId}
//           </DialogTitle>
//           <DialogDescription>
//             Enter your username to join the collaborative coding room.
//           </DialogDescription>
//         </DialogHeader>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="username">Username</Label>
//             <Input
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setError("");
//               }}
//               className={error ? "border-destructive" : ""}
//               autoFocus
//             />
//             {error && (
//               <p className="text-sm text-destructive">{error}</p>
//             )}
//           </div>
          
//           <DialogFooter>
//             <Button type="submit" className="w-full">
//               Join Room
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };




import { useState } from "react";

export const UsernameModal = ({ isOpen, onSubmit, roomId }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) return setError("Username is required");
    if (trimmedUsername.length < 2)
      return setError("Username must be at least 2 characters");
    if (trimmedUsername.length > 20)
      return setError("Username must be less than 20 characters");
    if (!/^[a-zA-Z0-9_\s]+$/.test(trimmedUsername))
      return setError("Only letters, numbers, spaces, and underscores allowed");

    setError("");
    onSubmit(trimmedUsername);
  };

  if (!isOpen) return null; // Hide modal when not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-200">Join Room</span> {roomId}
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          Enter your username to join the collaborative coding room.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter your username"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : "border-gray-300"
              }`}
              autoFocus
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

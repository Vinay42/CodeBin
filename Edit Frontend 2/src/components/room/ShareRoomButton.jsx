// import { Button } from '@/components/ui';;
// import { Share2, Check  } from '@/components/ui';;
// import { toast } from "@/hooks/use-toast";
// import { useState } from "react";


// export const ShareRoomButton = ({ roomId }: ShareRoomButtonProps) => {
//   const [copied, setCopied] = useState(false);

//   const handleShare = async () => {
//     const url = `${window.location.origin}/room/${roomId}`;
    
//     try {
//       await navigator.clipboard.writeText(url);
//       setCopied(true);
//       toast({
//         title: "Room link copied!",
//         description: "Share this link with others to collaborate.",
//       });
      
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       toast({
//         title: "Failed to copy",
//         description: "Please copy the URL manually.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <Button
//       onClick={handleShare}
//       variant="outline"
//       size="sm"
//       className="gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
//     >
//       {copied ? (
//         <>
//           <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
//           <span>Copied!</span>
//         </>
//       ) : (
//         <>
//           <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
//           <span>Share Room</span>
//         </>
//       )}
//     </Button>
//   );
// };


import { useState } from "react";

export const ShareRoomButton = ({ roomId }) => {
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  const handleShare = async () => {
    const url = `${window.location.origin}/room/${roomId}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setMessage("Room link copied! Share it with others to collaborate.");

      setTimeout(() => {
        setCopied(false);
        setMessage("");
      }, 2000);
    } catch (error) {
      setMessage("Failed to copy. Please copy the link manually.");
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        className={`flex items-center gap-2 border rounded-md px-3 py-2 text-sm font-medium transition ${
          copied
            ? "bg-green-500 text-white"
            : "bg-white hover:bg-gray-100 text-gray-800"
        }`}
      >
        {copied ? (
          <>
            {/* Check icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            {/* Share icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7M16 6l-4-4m0 0L8 6m4-4v13"
              />
            </svg>
            <span>Share Room</span>
          </>
        )}
      </button>

      {/* Minimal inline toast */}
      {message && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-3 py-1 whitespace-nowrap shadow-md">
          {message}
        </div>
      )}
    </div>
  );
};

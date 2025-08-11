import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ShareRoomButtonProps {
  roomId: string;
}

export const ShareRoomButton = ({ roomId }: ShareRoomButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/room/${roomId}`;
    
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "Room link copied!",
        description: "Share this link with others to collaborate.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="sm"
      className="gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4"
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-success" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span>Share Room</span>
        </>
      )}
    </Button>
  );
};
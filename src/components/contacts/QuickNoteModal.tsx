import { useState } from "react";
import { X, MessageSquarePlus, Loader2 } from "lucide-react";
import { create_new_note } from "@/services/api/note.service";
import { useAuthStore } from "../../store/useAuthStore";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface QuickNoteModalProps {
  customerId: number;
  onClose: () => void;
}

export function QuickNoteModal({ customerId, onClose }: QuickNoteModalProps) {
  const [quickNoteText, setQuickNoteText] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleQuickAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;
    if (!user) {
      toast.error("You must be logged in to add notes");
      return;
    }

    setIsLoading(true);
    try {
      await create_new_note({
        customerId,
        userId: user.id,
        content: quickNoteText.trim(),
        isImportant,
      });
      setQuickNoteText("");
      onClose();
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-card rounded-2xl shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 border-b flex justify-between items-center bg-muted/30">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <MessageSquarePlus className="w-5 h-5 text-primary" />
            Add Quick Note
          </h3>
          <Button
            onClick={onClose}
            className="p-1 w-8 h-8 hover:bg-secondary rounded-md text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </div>
        <div className="p-4">
          <form onSubmit={handleQuickAddNote} className="space-y-4">
            <Textarea
              value={quickNoteText}
              onChange={(e) => setQuickNoteText(e.target.value)}
              placeholder="Type your note here..."
              className="w-full text-foreground min-h-[120px] p-4 rounded-xl bg-secondary/50 border border-transparent focus:border-primary/20 outline-none focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all resize-none text-sm"
              autoFocus
              disabled={isLoading}
            />
            <div className="flex justify-between items-center pt-2">
              <Label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer ml-1">
                <Input
                  type="checkbox"
                  checked={isImportant}
                  onChange={(e) => setIsImportant(e.target.checked)}
                  className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4"
                  disabled={isLoading}
                />
                Mark as important
              </Label>
              <div className="flex gap-3">
                <Button
                  onClick={onClose}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-xl flex items-center justify-center hover:bg-secondary/80 transition-colors text-sm font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!quickNoteText.trim() || isLoading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm text-sm font-medium"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Note
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

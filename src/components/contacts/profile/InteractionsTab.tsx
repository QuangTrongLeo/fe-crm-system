import { MessageSquare, Send, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  get_interactions_by_customer,
  create_new_interaction,
} from "@/services/api/interaction.service";
import { useInteractionStore } from "@/store/useInteractionStore";
import { useAuthStore } from "@/store/useAuthStore";
import type { InteractionResponseFormData } from "@/schema/interaction.schema";
import { InteractionItem } from "./InteractionItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface InteractionsTabProps {
  customerId: number;
}

export function InteractionsTab({ customerId }: InteractionsTabProps) {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Local form state
  const [interactionSummary, setInteractionSummary] = useState("");
  const [interactionType, setInteractionType] = useState("CALL");

  // Store interaction
  const interactions = useInteractionStore((state) => state.interactions);
  const setInteractions = useInteractionStore((state) => state.setInteractions);

  const fetchInteractions = async () => {
    setIsLoading(true);
    try {
      const res = await get_interactions_by_customer(customerId);
      setInteractions(res || []);
    } catch (error) {
      console.error("Failed to fetch interactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) fetchInteractions();
  }, [customerId]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interactionSummary.trim() || !user) {
      return;
    }

    setIsCreating(true);
    try {
      await create_new_interaction({
        customerId: customerId,
        userId: user.id,
        interactionType,
        interactionDate: new Date().toISOString(),
        summary: interactionSummary,
      });
      setInteractionSummary("");
      fetchInteractions();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Create Interaction Form */}
      <form
        onSubmit={handleCreate}
        className="glass-card p-6 rounded-2xl border-primary/10 mb-8"
      >
        <div className="flex items-center gap-3 mb-4">
          <MessageSquare className="w-4 h-4 text-primary" />
          <span className="text-xs font-black uppercase tracking-widest text-foreground">
            Log New Interaction
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select
              value={interactionType}
              onValueChange={(e) => setInteractionType(e)}
              disabled={isCreating}
            >
              <SelectTrigger className="bg-background border rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20">
                <SelectValue placeholder="Select interaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CALL">CALL</SelectItem>
                <SelectItem value="EMAIL">EMAIL</SelectItem>
                <SelectItem value="MEETING">MEETING</SelectItem>
                <SelectItem value="OTHER">OTHER</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="What was discussed?"
              value={interactionSummary}
              onChange={(e) => setInteractionSummary(e.target.value)}
              className="flex-1 bg-background border rounded-xl px-4 py-2 text-xs outline-none focus:ring-2 focus:ring-primary/20"
              disabled={isCreating}
            />
            <Button
              type="submit"
              disabled={isCreating || !interactionSummary.trim()}
              className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isCreating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Interactions List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
          </div>
        ) : interactions.length === 0 ? (
          <div className="text-center p-12 text-slate-400 italic text-sm">
            No interactions logged yet.
          </div>
        ) : (
          interactions.map((interaction: InteractionResponseFormData) => (
            <InteractionItem key={interaction.id} interaction={interaction} />
          ))
        )}
      </div>
    </div>
  );
}

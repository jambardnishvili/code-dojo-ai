import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI terminal mentor. Ask me anything about commands, or type 'explain <command>' in the terminal for instant help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual AI integration)
    setTimeout(() => {
      const response: Message = {
        role: "assistant",
        content: `Great question! The command you're asking about is commonly used for [explanation]. Here's a tip: try using the --help flag to see all available options!`,
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);

    toast({
      title: "AI Mentor",
      description: "Processing your question...",
    });
  };

  return (
    <Card className="p-6 gradient-card border-border/50 h-[calc(100vh-12rem)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">AI Mentor</h2>
          <p className="text-xs text-muted-foreground">Your terminal guide</p>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-140px)] mb-4">
        <div className="space-y-4 pr-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about any command..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-terminal-green/10 border border-terminal-green/20">
        <p className="text-xs text-terminal-green font-medium">
          💡 Tip: The AI learns from your mistakes and suggests challenges!
        </p>
      </div>
    </Card>
  );
};

export default AIMentor;

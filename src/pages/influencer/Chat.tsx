import { CHATS } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState(CHATS[0].id);
  const selectedChat = CHATS.find(c => c.id === selectedChatId);

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl border bg-card text-card-foreground shadow md:flex-row">
      {/* Chat Sidebar */}
      <div className="w-full border-r md:w-80 flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-2">
            {CHATS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                className={`flex items-center gap-3 rounded-lg p-3 text-left text-sm transition-all hover:bg-accent ${
                  selectedChatId === chat.id ? "bg-accent" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Bob Consumer</span>
                    <span className="text-xs text-muted-foreground">10:06 AM</span>
                  </div>
                  <span className="line-clamp-1 text-xs text-muted-foreground">
                    Awesome, thanks!
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Main Area */}
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center gap-3 border-b p-4">
               <Avatar>
                  <AvatarFallback>BC</AvatarFallback>
               </Avatar>
               <div>
                  <h3 className="font-semibold">Bob Consumer</h3>
                  <p className="text-xs text-muted-foreground">Re: 50% Off Summer Collection</p>
               </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {selectedChat.messages.map((msg) => {
                  const isMe = msg.senderId === '1'; // Mock logged in user
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                          isMe
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Type your message..." className="flex-1" />
                <Button size="icon" type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

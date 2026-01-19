import { CHATS, MESSAGES, USERS, COUPONS } from "@/lib/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Chat() {
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>(CHATS[0]?.id);
  const selectedChat = CHATS.find(c => c.id === selectedChatId);
  
  // Get messages for the selected chat
  const chatMessages = selectedChat 
    ? MESSAGES.filter(m => m.chatId === selectedChat.id).sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
    : [];

  const { t } = useTranslation();

  // Helper to get other participant details (assuming we are '1' - Influencer)
  const getChatDetails = (chat: typeof CHATS[0]) => {
    const consumer = USERS.find(u => u.id === chat.consumerId);
    const coupon = COUPONS.find(c => c.id === chat.couponId);
    // Find the last message for this chat
    const lastMsg = MESSAGES.filter(m => m.chatId === chat.id)
      .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())[0];
      
    return {
      name: consumer?.name || 'Unknown User',
      couponTitle: coupon?.title || 'Unknown Coupon',
      lastMessage: lastMsg?.text || '',
      lastMessageTime: lastMsg?.sentAt ? new Date(lastMsg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''
    };
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-xl border bg-card text-card-foreground shadow md:flex-row">
      {/* Chat Sidebar */}
      <div className="w-full border-e md:w-80 flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute start-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('chat.search_placeholder')} className="ps-8" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-2 p-2">
            {CHATS.map((chat) => {
              const details = getChatDetails(chat);
              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChatId(chat.id)}
                  className={`flex items-center gap-3 rounded-lg p-3 text-start text-sm transition-all hover:bg-accent ${
                    selectedChatId === chat.id ? "bg-accent" : ""
                  }`}
                >
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                    <AvatarFallback>{details.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1 overflow-hidden w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{details.name}</span>
                      <span className="text-xs text-muted-foreground">{details.lastMessageTime}</span>
                    </div>
                    <span className="line-clamp-1 text-xs text-muted-foreground">
                      {details.lastMessage}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Main Area */}
      <div className="flex flex-1 flex-col">
        {selectedChat ? (
          <>
            <div className="flex items-center gap-3 border-b p-4">
               <Avatar>
                  <AvatarFallback>{getChatDetails(selectedChat).name.substring(0, 2).toUpperCase()}</AvatarFallback>
               </Avatar>
               <div>
                  <h3 className="font-semibold">{getChatDetails(selectedChat).name}</h3>
                  <p className="text-xs text-muted-foreground">Re: {getChatDetails(selectedChat).couponTitle}</p>
               </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {chatMessages.map((msg) => {
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
                <Input placeholder={t('common.type_message')} className="flex-1" />
                <Button size="icon" type="submit">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            {t('chat.select_chat')}
          </div>
        )}
      </div>
    </div>
  );
}

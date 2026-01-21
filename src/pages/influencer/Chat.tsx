import { USERS, COUPONS } from "@/lib/mockData"; // Keep for lookup fallback for now
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { chatService } from "@/services/chat.service";
import { useAuth } from "@/context/AuthContext";
import type { ChatResponse, MessageResponse } from "@/types/api";

export default function Chat() {
  const { user } = useAuth();
  const [chats, setChats] = useState<ChatResponse[]>([]);
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  
  useEffect(() => {
    const fetchChats = async () => {
        try {
            const data = await chatService.getChats();
            setChats(data);
            if (data.length > 0 && !selectedChatId) {
                setSelectedChatId(data[0].id);
            }
        } catch (error) {
            console.error("Failed to fetch chats", error);
        } finally {
            setIsLoadingChats(false);
        }
    };
    fetchChats();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
        if (!selectedChatId) return;
        try {
            const data = await chatService.getMessages(selectedChatId);
            setMessages(data.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()));
        } catch (error) {
            console.error("Failed to fetch messages", error);
        }
    };
    fetchMessages();
  }, [selectedChatId]);

  const selectedChat = chats.find(c => c.id === selectedChatId);
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!selectedChatId || !newMessage.trim()) return;

      try {
          await chatService.sendMessage(selectedChatId, newMessage);
          setNewMessage("");
          // Refresh messages
          const data = await chatService.getMessages(selectedChatId);
          setMessages(data.sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()));
      } catch (error) {
          console.error("Failed to send message", error);
      }
  };

  // Helper to get other participant details
  const getChatDetails = (chat: ChatResponse) => {
    // In a real app, we would fetch user details or have them in the Chat object
    // Fallback to mock USERS lookup for demo purposes if ID matches
    const consumer = USERS.find(u => u.id === chat.consumerId);
    const coupon = COUPONS.find(c => c.id === chat.couponId);
    
    // We don't have the last message in the Chat object from API yet, so we leave empty or fetch
    // For list view, ideally the API returns lastMessage info.
    
    return {
      name: consumer?.name || `User ${chat.consumerId}`,
      couponTitle: coupon?.title || 'Unknown Coupon',
      lastMessage: '', // API limitation: Chat list doesn't include last message
      lastMessageTime: ''
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
            {isLoadingChats ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading chats...</div>
            ) : chats.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No chats found</div>
            ) : (
                chats.map((chat) => {
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
                })
            )}
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
                {messages.map((msg) => {
                  const isMe = msg.senderId === user?.id;
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
              <form className="flex gap-2" onSubmit={handleSendMessage}>
                <Input
                    placeholder={t('common.type_message')}
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
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

"use client";

import { useState, useRef, useEffect } from "react";
import { Send, LogOut, Menu, ArrowDown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatMessage from "@/components/chat/ChatMessage";
import FileUpload from "@/components/chat/FileUpload";
import Image from "next/image";
import {
    createConversation,
    getMessages,
    saveMessage,
    updateMessage,
    type Conversation,
} from "@/lib/db/conversations";

type Message = {
    id?: string;
    role: "user" | "model";
    parts: { text: string }[];
};

const ThinkingAnimation = () => (
    <div className="flex items-center gap-1.5 px-4 py-2">
        <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
    </div>
);

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    // Check if desktop on mount
    useEffect(() => {
        const checkDesktop = () => {
            setSidebarOpen(window.innerWidth >= 768);
        };
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShowScrollButton(!isNearBottom);
    };

    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom("auto");
        }
    }, [messages, showScrollButton]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [input]);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [supabase, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    const handleNewChat = async () => {
        setMessages([]);
        setCurrentConversation(null);
        setSelectedFiles([]);
        if (window.innerWidth < 768) setSidebarOpen(false);
        setTimeout(() => textareaRef.current?.focus(), 100);
    };

    const handleLoadConversation = async (conversationId: string) => {
        try {
            const msgs = await getMessages(conversationId);
            const formattedMessages: Message[] = msgs.map(m => ({
                id: m.id,
                role: m.role,
                parts: [{ text: m.content }]
            }));
            setMessages(formattedMessages);
            setSelectedFiles([]);

            const { data, error } = await supabase.from('conversations').select('*').eq('id', conversationId).single();

            if (data) {
                setCurrentConversation(data);
            } else {
                console.warn("Could not fetch conversation details, using fallback", error);
                setCurrentConversation({
                    id: conversationId,
                    title: "Chat",
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    user_id: ""
                });
            }
            scrollToBottom("auto");
        } catch (error) {
            console.error("Error loading conversation:", error);
        }
    };

    const handleFileSelect = (files: File[]) => {
        setSelectedFiles(files);
    };

    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64 = reader.result as string;
                const base64Data = base64.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleEditMessage = async (index: number, newContent: string) => {
        const message = messages[index];
        if (!message.id) return;

        // Optimistic update
        const updatedMessages = [...messages];
        updatedMessages[index] = {
            ...message,
            parts: [{ text: newContent }]
        };
        setMessages(updatedMessages);

        // Save to DB
        await updateMessage(message.id, newContent);
    };

    const sendMessage = async (messageOverride?: string) => {
        const textToSend = messageOverride || input;
        if ((!textToSend.trim() && selectedFiles.length === 0) || loading) return;

        setError(null);

        let messageText = textToSend;
        if (selectedFiles.length > 0) {
            const fileNames = selectedFiles.map(f => f.name).join(", ");
            messageText = `${textToSend}\n\n[Attached files: ${fileNames}]`;
        }

        const userMessage: Message = { role: "user", parts: [{ text: messageText }] };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        const filesToProcess = [...selectedFiles];
        setSelectedFiles([]);
        setLoading(true);
        setIsStreaming(true);
        scrollToBottom();

        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('TIMEOUT')), 30000);
        });

        try {
            let conversation = currentConversation;
            if (!conversation) {
                const title = input.slice(0, 50) + (input.length > 50 ? "..." : "");
                conversation = await createConversation(title);
                if (conversation) {
                    setCurrentConversation(conversation);
                } else {
                    throw new Error("Failed to create conversation");
                }
            }

            if (conversation) {
                const savedMsg = await saveMessage(conversation.id, "user", messageText);
                if (savedMsg) {
                    setMessages(prev => {
                        const newMsgs = [...prev];
                        const idx = newMsgs.findIndex(m => m.role === 'user' && m.parts[0].text === messageText && !m.id);
                        if (idx !== -1) {
                            newMsgs[idx].id = savedMsg.id;
                        }
                        return newMsgs;
                    });
                }
            }

            const history = messages.map(m => ({
                role: m.role,
                parts: m.parts
            }));

            const fileData = await Promise.all(
                filesToProcess.map(async (file) => ({
                    name: file.name,
                    mimeType: file.type,
                    data: await fileToBase64(file)
                }))
            );

            const fetchPromise = fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: history,
                    files: fileData.length > 0 ? fileData : undefined,
                }),
            });

            const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errorData.error || "Failed to send message");
            }
            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let modelText = "";

            setMessages((prev) => [...prev, { role: "model", parts: [{ text: "" }] }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                modelText += chunk;

                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: "model",
                        parts: [{ text: modelText }],
                    };
                    return newMessages;
                });
            }

            setIsStreaming(false);



            if (conversation && modelText) {
                const savedModelMsg = await saveMessage(conversation.id, "model", modelText);
                if (savedModelMsg) {
                    setMessages(prev => {
                        const newMsgs = [...prev];
                        const lastMsg = newMsgs[newMsgs.length - 1];
                        if (lastMsg.role === 'model') {
                            lastMsg.id = savedModelMsg.id;
                        }
                        return newMsgs;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setIsStreaming(false);
            setMessages(prev => {
                const newMsgs = [...prev];
                if (newMsgs.length > 0 && newMsgs[newMsgs.length - 1].role === 'model' && !newMsgs[newMsgs.length - 1].parts[0].text) {
                    newMsgs.pop();
                }
                return newMsgs;
            });

            if (error instanceof Error) {
                if (error.message === 'TIMEOUT') {
                    setError("Request timed out. Please try again.");
                } else if (error.message.includes('API Key')) {
                    setError("API Key configuration issue.");
                } else {
                    setError(`Error: ${error.message}`);
                }
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar
                isOpen={sidebarOpen}
                onNewChat={handleNewChat}
                onLoadConversation={handleLoadConversation}
                onSidebarToggle={setSidebarOpen}
                onExplainQuote={(text) => {
                    const explainPrompt = `Explain more about this quote: "${text}"`;
                    sendMessage(explainPrompt);
                }}
            />

            {/* Main Chat Area */}
            <div
                className={`flex-1 flex flex-col relative transition-all duration-300 min-w-0 ${sidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}
            >
                {/* Header Minimum style */}
                <header className="flex items-center justify-between p-3 sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-transparent">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-md hover:bg-muted transition-colors md:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="font-semibold text-lg text-foreground px-2">
                            {currentConversation?.title || "New Chat"}
                        </h1>
                    </div>
                </header>

                {/* Messages Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto pb-48 pt-6"
                >
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto px-4 text-center">
                            <div className="w-14 h-14 rounded-full overflow-hidden mb-4 border border-border shadow-sm">
                                <Image src="/joseph.jpg" alt="LAI AI" width={56} height={56} className="object-cover" priority />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">How can I help you?</h2>
                            <p className="text-muted-foreground text-sm">Lai holh in biaruah khawh ka si. Ask me anything.</p>
                        </div>
                    )}

                    <div className="max-w-3xl mx-auto flex flex-col gap-0.5 group">
                        <AnimatePresence initial={false}>
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    <ChatMessage
                                        role={msg.role}
                                        content={msg.parts[0].text}
                                        isStreaming={isStreaming && idx === messages.length - 1}
                                        onEdit={(newContent) => handleEditMessage(idx, newContent)}
                                        onAddToInput={(text) => {
                                            setInput((prev) => prev ? prev + "\n" + `"${text}" ` : `"${text}" `);
                                            setTimeout(() => textareaRef.current?.focus(), 10);
                                        }}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {loading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex px-4 py-2">
                                <div className="flex gap-2 items-start">
                                    <div className="w-7 h-7 rounded-full overflow-hidden border border-border flex-shrink-0 mt-1">
                                        <Image src="/joseph.jpg" alt="LAI AI" width={28} height={28} className="object-cover opacity-50 grayscale" />
                                    </div>
                                    <div className="bg-muted/70 border border-border/60 rounded-2xl rounded-tl-sm px-4 py-2.5">
                                        <ThinkingAnimation />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    <div ref={messagesEndRef} className="h-4" />
                </div>

                {/* Floating Input Area */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4">
                    <div className="max-w-3xl mx-auto relative">
                        {showScrollButton && (
                            <button
                                onClick={() => scrollToBottom("smooth")}
                                className="absolute -top-14 left-1/2 -translate-x-1/2 p-2 rounded-full bg-background border border-border shadow-md hover:bg-muted text-foreground z-20"
                            >
                                <ArrowDown className="w-4 h-4" />
                            </button>
                        )}

                        <div className="relative flex flex-col w-full bg-background border border-border shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-2xl overflow-hidden focus-within:ring-1 focus-within:ring-border">
                            {error && (
                                <div className="px-4 py-2 bg-red-500/10 border-b border-red-500/20 text-red-500 text-xs flex justify-between items-center">
                                    <span>{error}</span>
                                    <button onClick={() => setError(null)} className="hover:underline">Dismiss</button>
                                </div>
                            )}

                            {/* File preview chips - above the textarea */}
                            {selectedFiles.length > 0 && (
                                <div className="flex flex-wrap gap-2 px-4 pt-3">
                                    {selectedFiles.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 bg-muted/50 border border-white/10 rounded-lg px-3 py-1.5 text-xs"
                                        >
                                            <span className="truncate max-w-[150px]">{file.name}</span>
                                            <button
                                                onClick={() => {
                                                    const newFiles = selectedFiles.filter((_, i) => i !== index);
                                                    setSelectedFiles(newFiles);
                                                }}
                                                className="hover:text-red-400 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        sendMessage();
                                    }
                                }}
                                placeholder="Message LAI AI..."
                                className="w-full max-h-48 px-4 py-3 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none resize-none overflow-y-auto text-[15px] leading-relaxed"
                                disabled={loading}
                                rows={1}
                            />

                            <div className="px-2 pb-2 flex justify-between items-center">
                                <FileUpload onFileSelect={handleFileSelect} disabled={loading} />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={loading || (!input.trim() && selectedFiles.length === 0)}
                                    className="p-1.5 rounded-lg bg-foreground text-background transition-all disabled:opacity-30 disabled:bg-muted-foreground/30 hover:opacity-90"
                                >
                                    <Send className="w-5 h-5 mx-0.5" />
                                </button>
                            </div>
                        </div>
                        <div className="text-center mt-2 text-[11px] text-muted-foreground">
                            LAI AI can make mistakes. Consider verifying important information.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

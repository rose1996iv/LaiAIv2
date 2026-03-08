"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Pencil, X, Heart, Volume2, Share2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatMessageProps {
    role: "user" | "model";
    content: string;
    isStreaming?: boolean;
    onEdit?: (newContent: string) => void;
}

export default function ChatMessage({ role, content, isStreaming, onEdit }: ChatMessageProps) {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [isOk, setIsOk] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        setEditContent(content);
    }, [content]);

    // Stop speaking when component unmounts
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSpeak = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(content);
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Lai AI Chat',
                    text: content,
                });
            } catch (err) {
                console.error('Error sharing:', err);
                // Fallback to copy
                handleCopy();
            }
        } else {
            handleCopy();
        }
    };

    const handleSaveEdit = () => {
        if (editContent.trim() !== content) {
            onEdit?.(editContent);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditContent(content);
        setIsEditing(false);
    };

    const isUser = role === "user";

    return (
        <div className={`w-full flex py-3 px-4 group ${isUser ? 'justify-end' : 'justify-start'
            }`}>
            <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'
                }`}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-border flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                    ) : (
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-border">
                            <Image
                                src="/joseph.jpg"
                                alt="LAI AI"
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Bubble */}
                <div className={`flex flex-col gap-1 ${isUser ? 'items-end' : 'items-start'
                    }`}>
                    <div className={`text-xs font-medium mb-0.5 ${isUser ? 'text-right text-muted-foreground' : 'text-muted-foreground'
                        }`}>
                        {isUser ? "You" : "LAI AI"}
                    </div>

                    <div className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed break-words ${isUser
                            ? 'bg-primary text-primary-foreground rounded-tr-sm'
                            : 'bg-muted/60 border border-border text-foreground rounded-tl-sm'
                        }`}>
                        {isEditing ? (
                            <div className="flex flex-col gap-3 min-w-[260px]">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-y min-h-[100px] text-foreground"
                                    autoFocus
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-background text-foreground border border-border hover:opacity-90 transition-opacity"
                                    >
                                        Save & Submit
                                    </button>
                                </div>
                            </div>
                        ) : isUser ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <div className="prose dark:prose-invert prose-sm max-w-none break-words leading-relaxed marker:text-foreground">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        table: ({ node, ...props }) => (
                                            <div className="overflow-x-auto my-4 border border-border rounded-lg">
                                                <table className="min-w-full divide-y divide-border m-0" {...props} />
                                            </div>
                                        ),
                                        th: ({ node, ...props }) => (
                                            <th className="px-4 py-3 bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground m-0" {...props} />
                                        ),
                                        td: ({ node, ...props }) => (
                                            <td className="px-4 py-3 border-t border-border text-sm m-0" {...props} />
                                        ),
                                        code: ({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
                                            if (inline) {
                                                return <code className={cn("bg-muted px-1.5 py-0.5 rounded-md text-[0.85em] font-mono", className)} {...props}>{children}</code>;
                                            }
                                            const match = /language-(\w+)/.exec(className || '');
                                            const lang = match ? match[1] : '';
                                            return (
                                                <div className="rounded-xl overflow-hidden my-4 border border-border shadow-sm">
                                                    <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border">
                                                        <span className="text-xs font-semibold text-muted-foreground capitalize">{lang || 'Code'}</span>
                                                        <button
                                                            onClick={() => {
                                                                const text = String(children).replace(/\n$/, '');
                                                                navigator.clipboard.writeText(text);
                                                                setCopied(true);
                                                                setTimeout(() => setCopied(false), 2000);
                                                            }}
                                                            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 text-xs"
                                                            title="Copy code"
                                                        >
                                                            {copied ? (
                                                                <><Check className="w-3.5 h-3.5" /><span>Copied!</span></>
                                                            ) : (
                                                                <><Copy className="w-3.5 h-3.5" /><span>Copy code</span></>
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="bg-card p-4 overflow-x-auto">
                                                        <code className={`block text-[0.9em] font-mono leading-relaxed ${className || ''}`} {...props}>
                                                            {children}
                                                        </code>
                                                    </div>
                                                </div>
                                            );
                                        },
                                        pre: ({ ...props }) => <>{props.children}</>,
                                    }}
                                >
                                    {content}
                                </ReactMarkdown>
                                {isStreaming && (
                                    <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse align-middle" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Actions Row */}
                    {!isEditing && (
                        <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-0.5 ${isUser ? 'flex-row-reverse' : ''
                            }`}>
                            {!isUser && !isStreaming ? (
                                <>
                                    <button
                                        onClick={() => setIsOk(!isOk)}
                                        className={cn(
                                            "p-1.5 rounded-md hover:bg-muted transition-colors",
                                            isOk ? "text-red-500" : "text-muted-foreground"
                                        )}
                                        title="Good response"
                                    >
                                        <Heart className={cn("w-3.5 h-3.5", isOk && "fill-current")} />
                                    </button>
                                    <button
                                        onClick={handleCopy}
                                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                        title="Copy"
                                    >
                                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button
                                        onClick={handleSpeak}
                                        className={cn(
                                            "p-1.5 rounded-md hover:bg-muted transition-colors",
                                            isSpeaking ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                        )}
                                        title="Read aloud"
                                    >
                                        <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                        title="Share"
                                    >
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </>
                            ) : isUser && onEdit ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                                    title="Edit message"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                            ) : null}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

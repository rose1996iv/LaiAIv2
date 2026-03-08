"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Pencil, Heart, Volume2, Share2, User, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatMessageProps {
    role: "user" | "model";
    content: string;
    isStreaming?: boolean;
    onEdit?: (newContent: string) => void;
    onFollowUp?: (question: string) => void;
    suggestedFollowUps?: string[];
}

export default function ChatMessage({
    role,
    content,
    isStreaming,
    onEdit,
    onFollowUp,
    suggestedFollowUps,
}: ChatMessageProps) {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content);
    const [isOk, setIsOk] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const isUser = role === "user";

    useEffect(() => {
        setEditContent(content);
    }, [content]);

    useEffect(() => {
        return () => { window.speechSynthesis.cancel(); };
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
            try { await navigator.share({ title: "Lai AI Chat", text: content }); }
            catch { handleCopy(); }
        } else { handleCopy(); }
    };

    const handleSaveEdit = () => {
        if (editContent.trim() !== content) onEdit?.(editContent);
        setIsEditing(false);
    };

    return (
        <div className={`w-full flex px-4 ${isUser ? "justify-end" : "justify-start"} mb-1`}>
            <div className={`flex gap-2 max-w-[75%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                    {isUser ? (
                        <div className="w-7 h-7 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center">
                            <User className="w-4 h-4" />
                        </div>
                    ) : (
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-border flex-shrink-0">
                            <Image src="/joseph.jpg" alt="LAI AI" width={28} height={28} className="object-cover" />
                        </div>
                    )}
                </div>

                {/* Bubble + actions */}
                <div className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
                    {/* Chat bubble */}
                    <div className={cn(
                        "rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed break-words",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-tr-sm shadow-sm"
                            : "bg-muted/70 border border-border/60 text-foreground rounded-tl-sm"
                    )}>
                        {isEditing ? (
                            <div className="flex flex-col gap-2 min-w-[260px]">
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary resize-y min-h-[80px] text-foreground"
                                    autoFocus
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => { setEditContent(content); setIsEditing(false); }}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-border hover:bg-muted/50 transition-colors"
                                    >Cancel</button>
                                    <button
                                        onClick={handleSaveEdit}
                                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                                    >Save & Submit</button>
                                </div>
                            </div>
                        ) : isUser ? (
                            <div className="whitespace-pre-wrap">{content}</div>
                        ) : (
                            <div className="prose dark:prose-invert prose-sm max-w-none break-words leading-relaxed marker:text-foreground prose-p:my-1 prose-headings:my-2">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        table: ({ node, ...props }) => (
                                            <div className="overflow-x-auto my-3 border border-border rounded-lg">
                                                <table className="min-w-full divide-y divide-border m-0" {...props} />
                                            </div>
                                        ),
                                        th: ({ node, ...props }) => (
                                            <th className="px-3 py-2 bg-muted/50 text-left text-xs font-medium uppercase text-muted-foreground m-0" {...props} />
                                        ),
                                        td: ({ node, ...props }) => (
                                            <td className="px-3 py-2 border-t border-border text-sm m-0" {...props} />
                                        ),
                                        code: ({ inline, className, children, ...props }: React.ComponentPropsWithoutRef<'code'> & { inline?: boolean }) => {
                                            if (inline) {
                                                return <code className={cn("bg-muted/80 px-1.5 py-0.5 rounded text-[0.85em] font-mono", className)} {...props}>{children}</code>;
                                            }
                                            const match = /language-(\w+)/.exec(className || '');
                                            const lang = match ? match[1] : '';
                                            return (
                                                <div className="rounded-xl overflow-hidden my-3 border border-border shadow-sm">
                                                    <div className="flex items-center justify-between px-4 py-2 bg-muted/80 border-b border-border">
                                                        <span className="text-xs font-semibold text-muted-foreground capitalize">{lang || 'Code'}</span>
                                                        <button
                                                            onClick={() => { navigator.clipboard.writeText(String(children).replace(/\n$/, '')); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                                                            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-xs"
                                                        >
                                                            {copied ? <><Check className="w-3 h-3" /><span>Copied!</span></> : <><Copy className="w-3 h-3" /><span>Copy</span></>}
                                                        </button>
                                                    </div>
                                                    <div className="bg-card p-4 overflow-x-auto">
                                                        <code className={`block text-[0.88em] font-mono leading-relaxed ${className || ''}`} {...props}>{children}</code>
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
                                    <span className="inline-block w-2 h-4 bg-foreground/70 ml-1 animate-pulse align-middle rounded-sm" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* Follow-up suggestions (only for AI after streaming done) */}
                    {!isUser && !isStreaming && !isEditing && suggestedFollowUps && suggestedFollowUps.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-1 max-w-[500px]">
                            {suggestedFollowUps.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => onFollowUp?.(q)}
                                    className="text-xs px-3 py-1.5 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all hover:border-primary/70 text-left leading-snug"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Action row */}
                    {!isEditing && (
                        <div className={cn(
                            "flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
                            isUser ? "flex-row-reverse" : ""
                        )}>
                            {!isUser && !isStreaming ? (
                                <>
                                    <button onClick={() => setIsOk(!isOk)} className={cn("p-1.5 rounded-md hover:bg-muted transition-colors", isOk ? "text-red-500" : "text-muted-foreground")} title="Good response">
                                        <Heart className={cn("w-3.5 h-3.5", isOk && "fill-current")} />
                                    </button>
                                    <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground" title="Copy">
                                        {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                                    </button>
                                    <button onClick={handleSpeak} className={cn("p-1.5 rounded-md hover:bg-muted transition-colors", isSpeaking ? "text-primary" : "text-muted-foreground")} title="Read aloud">
                                        <Volume2 className="w-3.5 h-3.5" />
                                    </button>
                                    <button onClick={handleShare} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground" title="Share">
                                        <Share2 className="w-3.5 h-3.5" />
                                    </button>
                                </>
                            ) : isUser && onEdit ? (
                                <button onClick={() => setIsEditing(true)} className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground" title="Edit">
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

"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    MessageSquare,
    Settings,
    Moon,
    Sun,
    Mail,
    Github,
    Info,
    User,
    Trash2,
    Edit2,
    Check,
    X,
    Menu,
    Search,
    Loader2,
    Sparkles,
    PanelLeftClose,
    Heart
} from "lucide-react";
import DailyQuote from "@/components/DailyQuote";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getConversations, type Conversation, deleteConversation, updateConversationTitle, searchConversations } from "@/lib/db/conversations";
import { createClient } from "@/utils/supabase/client";
import { useSettings } from "@/context/SettingsContext";

interface SidebarProps {
    isOpen: boolean;
    onNewChat: () => void;
    onLoadConversation?: (conversationId: string) => void;
    onSidebarToggle: (isOpen: boolean) => void;
    onExplainQuote?: (text: string) => void;
}

export default function Sidebar({ isOpen, onNewChat, onLoadConversation, onSidebarToggle, onExplainQuote }: SidebarProps) {
    const [mounted, setMounted] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showDailyQuote, setShowDailyQuote] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const { showQuoteTicker, setShowQuoteTicker } = useSettings();

    // Chat management state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<Conversation[] | null>(null);

    // Handle mounting
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        } else if (savedTheme === 'dark') {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
            if (prefersDark) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        const loadConversations = async () => {
            const convos = await getConversations();
            setConversations(convos);
        };
        loadConversations();
    }, [mounted]);

    useEffect(() => {
        if (!mounted) return;

        const loadUser = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserEmail(user.email || null);
                const avatarUrl = user.user_metadata?.avatar_url || user.user_metadata?.picture || null;
                setUserAvatar(avatarUrl);
            }
        };
        loadUser();
    }, [mounted]);

    // Handle search with debounce
    useEffect(() => {
        if (!mounted) return;

        const timer = setTimeout(async () => {
            if (searchQuery.trim()) {
                setIsSearching(true);
                try {
                    const results = await searchConversations(searchQuery);
                    setSearchResults(results);
                } catch (error) {
                    console.error("Search failed:", error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults(null);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, mounted]);

    const displayedConversations = searchResults !== null ? searchResults : conversations;

    const toggleSidebar = () => {
        onSidebarToggle(!isOpen);
    };

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);

        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const handleConversationClick = (conversationId: string) => {
        onLoadConversation?.(conversationId);
        if (window.innerWidth < 768) onSidebarToggle(false);
    };

    const startEditing = (e: React.MouseEvent, convo: Conversation) => {
        e.stopPropagation();
        setEditingId(convo.id);
        setEditTitle(convo.title);
    };

    const saveTitle = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (editingId && editTitle.trim()) {
            await updateConversationTitle(editingId, editTitle.trim());
            setConversations(prev => prev.map(c => c.id === editingId ? { ...c, title: editTitle.trim() } : c));
        }
        setEditingId(null);
    };

    const cancelEditing = (e: React.MouseEvent) => {
        e.stopPropagation();
        setEditingId(null);
    };

    const deleteChat = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat?")) {
            await deleteConversation(id);
            setConversations(prev => prev.filter(c => c.id !== id));
        }
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden transition-opacity"
                    onClick={() => onSidebarToggle(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed z-40 flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out h-screen",
                    "md:left-0 md:top-0",
                    isOpen ? "md:w-[260px]" : "md:w-0 md:overflow-hidden md:border-r-0",
                    "left-0 top-0",
                    isOpen ? "w-[260px] translate-x-0" : "-translate-x-full md:translate-x-0"
                )}
            >
                {/* Desktop Layout (when open) */}
                <div className="flex flex-col h-full w-[260px]">
                    {/* Top: Header Actions */}
                    <div className="flex items-center justify-between p-3">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground hidden md:block"
                            title="Close sidebar"
                        >
                            <PanelLeftClose className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => { onNewChat(); if (window.innerWidth < 768) onSidebarToggle(false); }}
                            className="p-2 hover:bg-muted rounded-md transition-colors text-muted-foreground hover:text-foreground flex-1 flex justify-end md:justify-center"
                            title="New Chat"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Middle: Chat History */}
                    <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 min-h-0 custom-scrollbar">
                        {/* Search Input hidden on desktop to keep minimal look, or styled subtly */}
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground/70" />
                            {isSearching && (
                                <Loader2 className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground animate-spin" />
                            )}
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-9 pr-8 py-2 bg-transparent hover:bg-muted focus:bg-background border border-transparent focus:border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0 transition-all h-9"
                            />
                        </div>

                        <div className="space-y-1">
                            <h3 className="text-xs font-semibold text-muted-foreground/70 px-2.5 mb-2 pb-1">Today</h3>
                            {displayedConversations.length > 0 ? (
                                displayedConversations.map((convo) => (
                                    <div key={convo.id} className="group relative flex items-center rounded-lg hover:bg-muted transition-colors">
                                        <button onClick={() => handleConversationClick(convo.id)} className="flex-1 p-2.5 flex items-center gap-3 text-sm text-left min-w-0">
                                            {editingId === convo.id ? (
                                                <input
                                                    type="text"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex-1 bg-background border px-2 py-0.5 rounded focus:outline-none text-foreground text-sm"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="truncate text-foreground/90 font-medium">{convo.title}</span>
                                            )}
                                        </button>
                                        <div className="absolute right-1 flex items-center pr-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-l from-muted via-muted to-transparent pl-4">
                                            {editingId === convo.id ? (
                                                <>
                                                    <button onClick={saveTitle} className="p-1 hover:text-green-500 text-muted-foreground"><Check className="w-4 h-4" /></button>
                                                    <button onClick={cancelEditing} className="p-1 hover:text-red-500 text-muted-foreground"><X className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <button onClick={(e) => startEditing(e, convo)} className="p-1 text-muted-foreground hover:text-foreground" title="Rename">
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={(e) => deleteChat(e, convo.id)} className="p-1 text-muted-foreground hover:text-red-500" title="Delete">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-4 text-muted-foreground/50 text-xs">
                                    No history
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bottom: Profile & Settings */}
                    <div className="p-3 border-t border-border bg-card space-y-1">
                        <Link href="/profile" className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted text-sm text-foreground/80 font-medium transition-colors">
                            <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center overflow-hidden flex-shrink-0">
                                {userAvatar ? <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" /> : <User className="w-3.5 h-3.5" />}
                            </div>
                            <span className="truncate flex-1">{userEmail || "Profile"}</span>
                        </Link>

                        <button
                            onClick={() => setShowQuoteTicker(!showQuoteTicker)}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-muted text-sm text-foreground/80 font-medium transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-4 h-4 text-purple-500" />
                                <span>Daily Inspiration</span>
                            </div>
                            <div className={cn(
                                "w-7 h-4 rounded-full transition-colors relative",
                                showQuoteTicker ? "bg-primary" : "bg-muted-foreground/30"
                            )}>
                                <div className={cn(
                                    "absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-background transition-transform duration-200",
                                    showQuoteTicker ? "translate-x-3" : "translate-x-0"
                                )} />
                            </div>
                        </button>

                        <div className="flex items-center gap-1 mt-1">
                            <button onClick={() => setShowAbout(true)} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-muted text-sm text-muted-foreground transition-colors" title="About">
                                <Info className="w-4 h-4" />
                            </button>
                            <button onClick={toggleTheme} className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-muted text-sm text-muted-foreground transition-colors" title="Theme">
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                            <Link href="/settings" className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-muted text-sm text-muted-foreground transition-colors" title="Settings">
                                <Settings className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </aside >

            {/* Desktop collapsed state floating open button */}
            {!isOpen && (
                <div className="hidden md:block fixed top-3 left-3 z-40">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 bg-background border border-border rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                        title="Open sidebar"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </div>
            )}

            {!isOpen && (
                <div className="hidden md:block fixed top-3 left-14 z-40">
                    <button
                        onClick={onNewChat}
                        className="p-2 bg-background border border-border rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                        title="New chat"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* About LAI AI Dialog */}
            {
                showAbout && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
                        onClick={() => setShowAbout(false)}
                    >
                        <div
                            className="bg-card border border-border p-6 rounded-2xl max-w-md w-full space-y-5 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
                                <Info className="w-5 h-5 text-primary" />
                                About LAI AI
                            </h2>

                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="leading-relaxed text-foreground">
                                        <strong className="text-primary font-medium">LAI AI</strong> brings cutting edge AI directly to the Lai Hakha-speaking community, designed with simplicity and warmth.
                                    </p>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <p className="leading-relaxed text-foreground">
                                        <strong className="text-primary font-medium">LAI AI</strong> cu Lai Hakha holh hman mi jatlangbu caah lungthiang le mifim tein biaruahnak a pe mi AI a si.
                                    </p>
                                </div>

                                <div className="bg-muted p-4 rounded-xl space-y-3">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Core Values</p>
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm font-medium">
                                        <div className="flex items-center gap-2"><Heart className="w-3.5 h-3.5 text-red-500" /> Siaherhnak</div>
                                        <div className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Mifimnak</div>
                                        <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-blue-500" /> Hawikomnak</div>
                                        <div className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-green-500" /> Dawtnak</div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Created with ♥ by Joseph
                            </p>

                            <button
                                onClick={() => setShowAbout(false)}
                                className="w-full py-2.5 mt-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )
            }

            {/* Daily Quote Dialog */}
            <DailyQuote
                isOpen={showDailyQuote}
                onClose={() => setShowDailyQuote(false)}
                onExplainQuote={(text) => {
                    if (onExplainQuote) onExplainQuote(text);
                    setShowDailyQuote(false);
                    onSidebarToggle(false);
                }}
            />
        </>
    );
}

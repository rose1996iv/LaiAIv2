"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Link href="/chat" className="p-2 hover:bg-accent rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>

                {/* Settings Content */}
                <div className="glass-card p-6 rounded-2xl space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Account</h2>
                        <p className="text-muted-foreground text-sm">
                            Manage your account settings and preferences.
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h2 className="text-xl font-semibold mb-2">Appearance</h2>
                        <p className="text-muted-foreground text-sm">
                            Customize the look and feel of the application.
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h2 className="text-xl font-semibold mb-2">Privacy</h2>
                        <p className="text-muted-foreground text-sm">
                            Control your data and privacy settings.
                        </p>
                    </div>

                    <div className="border-t border-white/10 pt-6">
                        <h2 className="text-xl font-semibold mb-4">Lai AI Model</h2>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-white/5">
                                <div>
                                    <p className="font-medium">Current Model</p>
                                    <p className="text-sm text-muted-foreground">The AI engine powering your chats</p>
                                </div>
                                <div className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-semibold">
                                    Gemini 1.5 Pro
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-white/5">
                                <div>
                                    <p className="font-medium">Prompt Available</p>
                                    <p className="text-sm text-muted-foreground">Remaining API requests for your account</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl leading-none">∞</span>
                                    <div className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-semibold">
                                        Unlimited
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

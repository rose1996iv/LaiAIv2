"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      <div className="z-10 flex flex-col items-center text-center space-y-8 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border border-border bg-card flex items-center justify-center">
            <Image
              src="/joseph.jpg"
              alt="LAI AI Avatar"
              width={80}
              height={80}
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
            Hi, I&apos;m <span className="text-primary font-bold">LAI AI</span>
          </h1>
          <p className="text-lg text-muted-foreground w-full max-w-[500px] mx-auto">
            Hmailei AI biaruahnak sining cu a tu ah rak hman ve. A tha bik, a rang i zeitik caan paoh ah hman khawh a si.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-8"
        >
          <Link
            href="/chat"
            className="group flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-foreground px-8 font-medium text-background transition-transform active:scale-95 hover:opacity-90"
          >
            <span>Start Chatting</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/login"
            className="flex h-12 w-full sm:w-auto items-center justify-center rounded-lg border border-input bg-card px-8 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Sign In
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-12 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Sparkles className="w-4 h-4" />
          <span>Joseph&apos;s Assistant</span>
        </motion.div>
      </div>
    </main>
  );
}

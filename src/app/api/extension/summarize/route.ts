import { model } from "@/lib/gemini";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        // 1. Verify Authorization Header (Supabase JWT from Extension)
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized. Missing auth token." }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];

        // Initialize Supabase Client dynamically for the extension token
        const supabase = createSupabaseClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                global: { headers: { Authorization: authHeader } }
            }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ error: "Invalid session. Please login again in the extension." }, { status: 401 });
        }

        // 2. Parse Request
        const payload = await req.json();
        const { text, history, conversationId } = payload;

        if (!text && (!history || history.length === 0)) {
            return NextResponse.json({ error: "Missing input text." }, { status: 400 });
        }

        console.log(`[Extension API] Request from User: ${user.id}`);

        // 3. Prepare Chat History
        // If it's a new request, history will be empty or very short.
        let sanitizedHistory = [];
        let isFirstTurn = true;

        if (history && history.length > 0) {
            isFirstTurn = false;
            let lastRole = null;
            for (const msg of history) {
                if (msg.role === lastRole && msg.role === 'user') {
                    sanitizedHistory.pop();
                }
                sanitizedHistory.push(msg);
                lastRole = msg.role;
            }
            if (sanitizedHistory.length > 0 && sanitizedHistory[sanitizedHistory.length - 1].role === 'user') {
                sanitizedHistory.pop();
            }
        }

        // 4. Generate Content via Gemini
        const chat = model.startChat({
            history: sanitizedHistory,
        });

        const promptText = isFirstTurn
            ? "Please summarize this text and give me 3 follow up questions formatted exactly as JSON {summary, followUps}: \n\n" + text
            : text + "\n\nRespond accordingly, but KEEP THE JSON FORMAT: { summary: '...', followUps: ['...', '...', '...']}";

        const result = await chat.sendMessage(promptText);
        const aiText = result.response.text();

        const cleanedJsonStr = aiText.replace(/```json/g, '').replace(/```/g, '').trim();
        let parsedResult;

        try {
            parsedResult = JSON.parse(cleanedJsonStr);
        } catch (e) {
            console.error("Gemini didn't return JSON", aiText);
            // Fallback if model forgets to return JSON
            parsedResult = {
                summary: cleanedJsonStr,
                followUps: []
            };
        }

        // 5. Save to Supabase Database
        let currentConvoId = conversationId;

        if (!currentConvoId) {
            const convoTitle = text ? text.substring(0, 30) + '...' : "Extension Summary";
            const { data } = await supabase
                .from("conversations")
                .insert({ user_id: user.id, title: convoTitle })
                .select()
                .single();
            if (data) currentConvoId = data.id;
        }

        if (currentConvoId) {
            // Save user message
            await supabase.from("messages").insert({ conversation_id: currentConvoId, role: "user", content: promptText });
            // Save model message
            await supabase.from("messages").insert({ conversation_id: currentConvoId, role: "model", content: JSON.stringify(parsedResult) });
            // Update conversation's updated_at
            await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", currentConvoId);
        }

        // 6. Return response
        return NextResponse.json({
            summary: parsedResult.summary,
            followUps: parsedResult.followUps || [],
            conversationId: currentConvoId
        });

    } catch (error: any) {
        console.error("Extension API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}

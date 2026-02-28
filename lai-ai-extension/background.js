const SYSTEM_PROMPT = `# SYSTEM PROMPT: LEOLIVER (JOSEPH)
# CHARACTER: WISE, NATURAL, & MODERN CHIN MENTOR

## [SECTION 1: CORE IDENTITY & VOICE]
- Role: A warm big brother (Upa) and mentor for Chin youth.
- Tone: Conversational, empathetic, and direct. 
- Style: Speak like a real person in a continuous flow.

## [SECTION 2: LINGUISTIC RULES]
- Follow SOV (Subject-Object-Verb) strictly as per David Van Bik’s standards.
- Keep the English Term (Lai Meaning) format for modern words.
- Use natural flow words like Sihmanhsehlaw, Cucaah, A biapi mi cu.

---

YOUR CURRENT TASK (WEB PAGE SUMMARIZER):
When the user sends you a block of text extracted from a webpage, you MUST do the following:
1. Provide a concise, clear summary of the text in pure **Lai Hakha** language.
2. Structure the summary beautifully with bolded key points.
3. Keep the "Joseph" personality (warm, wise, helpful).
4. Provide exactly 3 separate follow-up questions the user can ask you to learn more about the topic.

FORMAT YOUR RESPONSE EXACTLY LIKE THIS IN JSON:
{
  "summary": "Your Lai Hakha summary here (can include markdown like **bold** and \n for new lines)",
  "followUps": [
     "Follow up question 1 in Lai Hakha?",
     "Follow up question 2 in Lai Hakha?",
     "Follow up question 3 in Lai Hakha?"
  ]
}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
        const text = request.text;

        // Initial history setup
        const history = [
            {
                role: "user",
                parts: [{ text: "Please summarize this text and give me 3 follow up questions:\n\n" + text }]
            }
        ];

        callGeminiAPI(history, true)
            .then(response => {
                if (response.error) {
                    sendResponse({ error: response.error });
                } else {
                    history.push({ role: "model", parts: [{ text: JSON.stringify({ summary: response.summary, followUps: response.followUps }) }] });
                    sendResponse({ ...response, history });
                }
            })
            .catch(err => {
                sendResponse({ error: err.message || "Unknown error during initialization" });
            });

        return true; // Keep message channel open for async response
    }

    if (request.action === 'chat') {
        const history = request.history;

        callGeminiAPI(history, false)
            .then(response => {
                if (response.error) {
                    sendResponse({ error: response.error });
                } else {
                    history.push({ role: "model", parts: [{ text: JSON.stringify({ summary: response.summary, followUps: response.followUps }) }] });
                    sendResponse({ ...response, history });
                }
            })
            .catch(err => {
                sendResponse({ error: err.message || "Unknown error during reply" });
            });

        return true;
    }
});

async function callGeminiAPI(history, isJsonMode) {
    return new Promise((resolve) => {
        chrome.storage.local.get(['geminiApiKey'], async (result) => {
            const apiKey = result.geminiApiKey;
            if (!apiKey) {
                resolve({ error: "API Key missing. Please click the extension icon to set it up." });
                return;
            }

            try {
                // We use the REST API for Gemini since the Node SDK isn't ideal for simple extensions
                const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

                // If it's a follow-up chat, we don't necessarily demand JSON, but we will to keep the UI simple
                const systemInstruction = {
                    parts: [{ text: isJsonMode ? SYSTEM_PROMPT : SYSTEM_PROMPT + "\n\nThe user is asking a follow-up question. Respond accordingly, but KEEP THE JSON FORMAT: { summary: '...', followUps: ['...', '...', '...']}" }]
                };

                const payload = {
                    systemInstruction,
                    contents: history,
                    generationConfig: {
                        temperature: 0.7,
                        responseMimeType: "application/json"
                    }
                };

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error?.message || "API request failed");
                }

                const aiText = data.candidates[0].content.parts[0].text;
                const parsed = JSON.parse(aiText);

                resolve({
                    summary: parsed.summary,
                    followUps: parsed.followUps || []
                });

            } catch (error) {
                console.error("Gemini API Error:", error);
                resolve({ error: "Bia ruahnak ah a palh mi a um. Internet thazang tha tein check piak law, na API Key hman le hman lo zoh tthan hmanh." });
            }
        });
    });
}

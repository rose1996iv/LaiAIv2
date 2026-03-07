document.addEventListener('DOMContentLoaded', () => {
    const setupBlock = document.getElementById('setup-block');
    const actionBlock = document.getElementById('action-block');
    const loader = document.getElementById('loader');
    const resultBlock = document.getElementById('result-block');
    const chatBlock = document.getElementById('chat-block');

    const apiKeyInput = document.getElementById('api-key-input');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const summarizeBtn = document.getElementById('summarize-btn');
    const exportBtn = document.getElementById('export-btn');
    const chatStream = document.getElementById('chat-stream');
    const followUpChips = document.getElementById('follow-up-chips');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');

    let chatHistory = []; // Store conversation context

    // 1. Check API Key on load
    chrome.storage.local.get(['geminiApiKey'], (result) => {
        if (result.geminiApiKey) {
            setupBlock.classList.add('hidden');
            actionBlock.classList.remove('hidden');
        } else {
            setupBlock.classList.remove('hidden');
            actionBlock.classList.add('hidden');
        }
    });

    // 2. Save API Key
    saveKeyBtn.addEventListener('click', () => {
        const key = apiKeyInput.value.trim();
        if (key) {
            chrome.storage.local.set({ geminiApiKey: key }, () => {
                setupBlock.classList.add('hidden');
                actionBlock.classList.remove('hidden');
            });
        }
    });

    // 3. Summarize Button Clicker
    summarizeBtn.addEventListener('click', async () => {
        actionBlock.classList.add('hidden');
        loader.classList.remove('hidden');
        resultBlock.classList.add('hidden');
        chatBlock.classList.add('hidden');

        chatStream.innerHTML = '';
        chatHistory = [];

        try {
            // Get current active tab
            let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // Execute script in the active tab to extract text
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: scrapePageText
            });

            const pageText = results[0].result;

            // Send message to background script to call Gemini
            chrome.runtime.sendMessage({
                action: 'summarize',
                text: pageText
            }, handleGeminiResponse);

        } catch (error) {
            showError("Could not read the page. Make sure you are on a valid webpage.");
        }
    });

    // Follow Up Click or Manual Chat
    sendBtn.addEventListener('click', () => {
        const query = chatInput.value.trim();
        if (query) sendFollowUp(query);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const query = chatInput.value.trim();
            if (query) sendFollowUp(query);
        }
    });

    function appendUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'user-bubble';
        div.textContent = text;
        chatStream.appendChild(div);
        scrollToBottom();
    }

    function appendAIMessage(htmlText) {
        removeLoader();
        const container = document.createElement('div');
        container.className = 'response-container';
        container.innerHTML = `
            <div class="ai-avatar"><img src="icon.png" alt="AI"></div>
            <div class="summary-text">${htmlText}</div>
        `;
        chatStream.appendChild(container);
        scrollToBottom();
    }

    function appendLoader() {
        const container = document.createElement('div');
        container.id = 'inline-loader';
        container.className = 'response-container';
        container.innerHTML = `
            <div class="ai-avatar"><img src="icon.png" alt="AI"></div>
            <div class="summary-text" style="display:flex; align-items:center; gap:8px;">
                <div class="spinner" style="width:14px;height:14px;border-width:2px;"></div>
                <span>Bia ruah lio...</span>
            </div>
        `;
        chatStream.appendChild(container);
        scrollToBottom();
    }

    function removeLoader() {
        const loaderEl = document.getElementById('inline-loader');
        if (loaderEl) loaderEl.remove();
    }

    function scrollToBottom() {
        setTimeout(() => {
            const main = document.querySelector('main');
            if (main) {
                main.scrollTo({ top: main.scrollHeight, behavior: 'smooth' });
            }
        }, 100);
    }

    function sendFollowUp(query) {
        chatInput.value = "";

        followUpChips.innerHTML = ''; // Hide chips while thinking

        appendUserMessage(query);
        appendLoader();

        // Push user query to history
        chatHistory.push({ role: "user", parts: [{ text: query }] });

        chrome.runtime.sendMessage({
            action: 'chat',
            history: chatHistory
        }, handleGeminiResponse);
    }

    function parseBasicMarkdown(text) {
        let html = text
            // Headers
            .replace(/^### (.*$)/gim, '<h4>$1</h4>')
            .replace(/^## (.*$)/gim, '<h3>$1</h3>')
            .replace(/^# (.*$)/gim, '<h2>$1</h2>')
            // Bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italics
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Unordered Lists
            .replace(/^\s*\*\s+(.*)$/gim, '<ul><li>$1</li></ul>')
            .replace(/^\s*-\s+(.*)$/gim, '<ul><li>$1</li></ul>')
            // Fix adjacent bullet points (merge ul tags)
            .replace(/<\/ul>\n<ul>/g, '\n')
            // Paragraphs and line breaks
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        return `<p>${html}</p>`;
    }

    // Export Chat History to Markdown
    exportBtn.addEventListener('click', () => {
        if (chatHistory.length === 0) {
            showError("Export tuah ding in bia ruahmi a um rih lo.");
            return;
        }

        let md = `# LAI AI - Chat History\n\n*Generated by LAI AI Web Summarizer*\n\n---\n\n`;

        chatHistory.forEach(msg => {
            const role = msg.role === 'user' ? '**You:**' : '**LAI AI:**';
            let text = msg.parts[0].text;

            try {
                if (msg.role === 'model') {
                    const parsed = JSON.parse(text);
                    text = parsed.summary;
                }
            } catch (e) {
                // Ignore parse errors, just use raw text
            }

            md += `${role}\n\n${text}\n\n`;
        });

        const blob = new Blob([md], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;

        const date = new Date().toISOString().split('T')[0];
        a.download = `LAI_AI_Summary_${date}.md`;

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Process Response from Background.js
    function handleGeminiResponse(response) {
        removeLoader();
        loader.classList.add('hidden'); // Also hide the main centered one if it was open

        if (response.error) {
            showError(response.error);
            return;
        }

        exportBtn.classList.remove('hidden');
        resultBlock.classList.remove('hidden');
        chatBlock.classList.remove('hidden');

        // Render Markdown text to HTML
        let htmlText = parseBasicMarkdown(response.summary);

        appendAIMessage(htmlText);

        // Render follow-up chips
        followUpChips.innerHTML = '';
        if (response.followUps && response.followUps.length > 0) {
            response.followUps.forEach(q => {
                const chip = document.createElement('div');
                chip.className = 'chip';
                chip.textContent = q;
                chip.addEventListener('click', () => {
                    sendFollowUp(q);
                });
                followUpChips.appendChild(chip);
            });
        }

        // Update local history
        chatHistory = response.history;
    }

    function showError(message) {
        removeLoader();
        loader.classList.add('hidden');
        actionBlock.classList.remove('hidden');
        appendAIMessage(`<p style="color: #ef4444;">Error: ${message}</p>`);
        resultBlock.classList.remove('hidden');
    }
});

// THis function is INJECTED into the webpage, so it cannot access variables outside
function scrapePageText() {
    // Basic extraction of readable text from paragraphs and headings
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, article');
    let text = [];
    elements.forEach(el => {
        if (el.innerText && el.innerText.trim().length > 0) {
            text.push(el.innerText.trim());
        }
    });
    // Limit string size to avoid huge payloads (roughly 5000 chars)
    return text.join('\n').substring(0, 8000);
}

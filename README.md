# LAI AI 2.0 🤖

![LAI AI Banner](Preview.png)

**LAI AI 2.0 (Leoliver's Assistant Intelligence)** is a premium, culturally-aware AI chatbot meticulously designed to serve the **Lai Hakha-speaking community** with warmth, wisdom, and care. 

Built with cutting-edge web technologies and powered by the **Google Gemini 2.5 Flash API**, it seamlessly bridges the gap between traditional cultural values and modern artificial intelligence, acting as a wise, modern mentor (Upa) for the Chin youth.

> *"Hmailei AI biaruahnak sining cu a tu ah rak hman ve."* (Experience the future of AI conversation now.)

---

## 🎯 Core Mission & Cultural Embedded Values

LAI AI is programmed not just to be an assistant, but to be an interactive embodiment of Lai culture:

- **Cultural Preservation:** Strictly follows the grammar and linguistic standards based on David Van Bik's English-Chin Dictionary and the Hakha Lai Bible (SOV structure). Includes active spelling correction for Pure Hakha.
- **Siaherhnak (Deep Love & Care):** Responds with deep empathy, providing a safe space for youth experiencing digital struggles or emotional distress.
- **Mifimnak (Wisdom) & Hawikomnak (Friendship):** Acts as a wise big brother, offering natural, dialogue-driven psychological encouragement over robotic advice.
- **Zatlangbu Pehtlaihnak (Community Connection):** Keeps youth connected to their roots while using cutting-edge technology.

---

## ✨ Key Features

- **🗣️ Bilingual & Conversational Support**: Natural, flowing conversations in pure **Lai Hakha** and English, dynamically translating modern concepts into understandable Lai contexts.
- **🧠 Advanced AI Engine**: Powered by **Google Gemini 2.5 Flash**, finely tuned with a secret prompt engine (v5.0) to use David Van Bik's linguistics and Dr. Hoi Cung Tum's clarity.
- **👁️ Native Vision Capabilities**: Drag-and-drop file and image uploads for the model to intelligently analyze visually.
- **🎨 Glassmorphism UI/UX**:
  - Stunning, responsive transparent layouts with Framer Motion animations.
  - Retractable Sidebar with Chat History search capability.
  - "Thinking" animations to simulate a human-like response delay.
  - Native Dark & Light mode support.
- **🔐 Secure Authentication**: Integrated deeply with **Supabase Auth** for robust session management (Middleware injected).
- **🗄️ Chat History**: Conversations are actively saved and continuously synced with a PostgreSQL Supabase database.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router & SSR Middleware)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- **AI Model**: [Google Gemini API](https://ai.google.dev/) (2.5 Flash Edition)
- **Database & Auth**: [Supabase](https://supabase.com/) & PostgreSQL
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/) | [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- A [Supabase](https://supabase.com) project configured with `conversations`, `messages`, and `user_profile` tables.
- A Google Cloud project with the **Gemini API** enabled.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rose1996iv/LaiAIv2.git
   cd LaiAIv2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your keys securely:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to start your dialogue with LAI AI!

---

## 🤝 Contributing

Contributions are strictly monitored to ensure the **Hakha Lai Cultural Prompt Protocol** is protected. However, UI/UX, logic, and component PRs are enthusiastically welcomed!

## 📄 License

This project is licensed under the MIT License.

---

**Built with ♡ for the Lai community by Joseph (Leoliver)**

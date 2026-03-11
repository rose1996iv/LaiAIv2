import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LAI AI",
  description: "Privacy Policy for the LAI AI browser extension and web application.",
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d", color: "#ededed" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h1 style={{
            fontSize: "36px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: "12px"
          }}>
            LAI AI – Privacy Policy
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            Last Updated: March 11, 2026
          </p>
        </div>

        <div style={{ lineHeight: "1.8", fontSize: "15px", color: "#d1d5db" }}>

          {/* Section 1 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              1. Introduction
            </h2>
            <p>
              Welcome to LAI AI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). The LAI AI extension is designed to help you summarize webpages, analyze YouTube transcripts, and ask questions using AI. This Privacy Policy outlines how we collect, use, protect, and handle your information when you use our browser extension and associated services. We rely exclusively on Google Sign-In for authentication — no API keys are required.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              2. Information We Collect
            </h2>
            <p style={{ marginBottom: "12px" }}>When you use the LAI AI extension, we collect and process the following types of information:</p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Google Account Information:</strong> When you sign in via Google OAuth, we receive basic profile information (such as your email address and profile picture). This is managed securely via Supabase and used solely for authentication and session management.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Webpage Content:</strong> When you click &quot;Summarize,&quot; the extension extracts the readable text from your current active tab and sends it to our API to generate an AI summary.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>YouTube Transcripts:</strong> When summarizing a YouTube video, the extension fetches the video's closed captions/transcript and sends it to our API for processing.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Conversation History:</strong> Your questions, generated summaries, and follow-up chats are securely stored in our Supabase database tied to your authenticated account so you can access your past conversations.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Usage Data:</strong> We may encounter and log basic usage errors to help us debug and improve the extension's stability.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              3. How We Use Your Information
            </h2>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}>✅ To authenticate your identity and secure your session.</li>
              <li style={{ marginBottom: "8px" }}>✅ To generate accurate summaries of websites and YouTube videos.</li>
              <li style={{ marginBottom: "8px" }}>✅ To save and retrieve your conversation history across your devices.</li>
              <li style={{ marginBottom: "8px" }}>✅ To transmit prompts securely to our AI provider (Google Gemini API).</li>
              <li style={{ marginBottom: "8px" }}>✅ To maintain, troubleshoot, and improve the extension.</li>
            </ul>
            <div style={{
              marginTop: "16px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px",
              padding: "16px"
            }}>
              <p style={{ margin: 0, color: "#fca5a5" }}>
                🚫 <strong>We do NOT sell, rent, or share your data with third-party advertisers or data brokers.</strong> Your data is used strictly to provide the core functionality of the LAI AI service.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              4. Google Sign-In and Authentication
            </h2>
            <p style={{ marginBottom: "12px" }}>
              LAI AI operates purely on Google OAuth. You do not need to provide any API keys. When you log in:
            </p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                Your identity is verified securely by Google. LAI AI never sees or stores your Google password.
              </li>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                An authentication token is generated and stored locally in your browser's extension storage. This token is secure and cannot be accessed by other websites.
              </li>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                If you clear your browser data or uninstall the extension, your local session token is completely removed.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              5. Third-Party Services
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Google Gemini API", desc: "Used as our core AI engine to generate summaries and answer questions. Regulated by Google's Privacy Policy.", link: "https://policies.google.com/privacy", color: "#4ade80" },
                { name: "Supabase", desc: "Used as our secure backend infrastructure for managing Google Sign-In and storing your chat history.", link: "https://supabase.com/privacy", color: "#60a5fa" },
                { name: "Google OAuth 2.0", desc: "Used to authenticate your identity securely without us handling your credentials.", link: "https://policies.google.com/privacy", color: "#f472b6" },
              ].map((service) => (
                <div key={service.name} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px"
                }}>
                  <strong style={{ color: service.color }}>{service.name}</strong>
                  <p style={{ margin: 0, fontSize: "14px", color: "#94a3b8" }}>
                    {service.desc}{" "}
                    <a href={service.link} target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa" }}>
                      Read Privacy Policy
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              6. Data Security and Storage
            </h2>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>In-Transit encryption:</strong> All requests made between the extension, our server, Supabase, and Gemini API are securely encrypted using HTTPS/TLS.
              </li>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Server Storage:</strong> Only your account details and chat histories are stored permanently on our Supabase cloud database to allow continuity across sessions.
              </li>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Temporary Processing:</strong> The actual raw text of the webpages you summarize is only processed temporarily in memory to generate the summary and is not stored long-term.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              7. Your Rights and Choices
            </h2>
            <p style={{ marginBottom: "12px" }}>You have full control over your data. You can:</p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}>🔓 Revoke extension access at any time by uninstalling it from your browser.</li>
              <li style={{ marginBottom: "8px" }}>📤 Export your entire chat history in Markdown or HTML formats directly from the extension UI.</li>
              <li style={{ marginBottom: "8px" }}>🗑️ Request the deletion of your account and associated chat history by contacting our support team.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              8. Children's Privacy
            </h2>
            <p>
              LAI AI is not directed towards individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected data from a child under 13, we will immediately delete such information. Parents and guardians can contact us to request the deletion of their child's data.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by updating the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
            </p>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              10. Contact Us
            </h2>
            <p style={{ marginBottom: "12px" }}>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please feel free to reach out to us:
            </p>
            <div style={{
              background: "rgba(59,130,246,0.08)",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: "12px",
              padding: "20px"
            }}>
              <p style={{ margin: 0, color: "#93c5fd" }}>
                📧 <strong>Email:</strong> support@lai-ai-ivy.vercel.app<br />
                🌐 <strong>Website:</strong>{" "}
                <a href="https://lai-ai-ivy.vercel.app" style={{ color: "#60a5fa" }}>
                  https://lai-ai-ivy.vercel.app
                </a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
            color: "#475569",
            fontSize: "13px"
          }}>
            <p>© 2026 LAI AI. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

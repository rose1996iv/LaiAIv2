import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LAI AI",
  description: "LAI AI extension te ruahnak le data hmuhchihnak chanchin.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#ededed]">
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
            Chiang ah thleng: March 11, 2026
          </p>
        </div>

        <div style={{ lineHeight: "1.8", fontSize: "15px", color: "#d1d5db" }}>

          {/* Section 1 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              1. Thuhlatnak
            </h2>
            <p>
              LAI AI (&quot;keimahni,&quot; &quot;ngei,&quot; le &quot;ka te&quot;) in na ruahnak le na data hmuhchihnak hmun a dik lomi in na thiltih lo ding le na data a thiamnak in hman ding a si. Privacy Policy hi a thleng lio bang in na data le na ruahnak an khua dih bang tiah hngalh dingin na thlirnak a man ko.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              2. Zei Data Dah Ka Hmu?
            </h2>
            <p style={{ marginBottom: "12px" }}>LAI AI extension in data phunphun an dawng thei:</p>
            <ul style={{ paddingLeft: "24px", marginTop: "8px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Google Account Nawl:</strong> Na Google account bia (email le holhpawng) thil ruahnak nih na lakin athiam ding in dawng a si. Supabase in a man a si.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Webpage bia:</strong> Na summarize lak thaak ah webpage bia (text on) kha thawn a si. Bia hi API in AI in hmangin a ruah a si.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Conversation History:</strong> Na chat history kha Supabase database ah chiah a si, na theih ding in.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>YouTube Transcript:</strong> Na YouTube video kha summarize lak ah, transcript kha thawn a si.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              3. Data Zei Ding Dah A Hman?
            </h2>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>Kai dang in extension a dang thiah ding in</li>
              <li style={{ marginBottom: "8px" }}>Na chat history theih ding in</li>
              <li style={{ marginBottom: "8px" }}>Ruahnak bawmnak AI (Google Gemini) tan thawn ding in</li>
              <li style={{ marginBottom: "8px" }}>Extension hman lai ah error le problem hngalh ding in</li>
            </ul>
            <p style={{ marginTop: "12px" }}>
              <strong style={{ color: "#f87171" }}>Ka te in na data kha biakam dang le tangzang pumpi ten thawn lo ding a si.</strong> Na data kha advertiser, data broker, le thil phun dang te tan thawn lo ding a si.
            </p>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              4. Third-Party Service Te
            </h2>
            <p style={{ marginBottom: "12px" }}>LAI AI in service dang phunphun a hman:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Google Gemini API:</strong> Ruahnak le summarize bia kha Gemini API kha thawn a si. Google nih in&nbsp;
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#60a5fa" }}>Privacy Policy a nei.</a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Supabase:</strong> Authentication le conversation history kha Supabase database ah chiah a si. Supabase nih in&nbsp;
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#60a5fa" }}>Privacy Policy a nei.</a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Google OAuth:</strong> Google account in login ding in Google identity service a hman a si.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              5. Data A Khua Dih Dih Dang
            </h2>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Local Storage:</strong> Na token (login nawl) kha Chrome storage ah a chiah a si, extension a hawng bak in an theih ding.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Server:</strong> Na conversation history kha Supabase server ah a chiah a si, TLS/HTTPS in a khua dih a si.
              </li>
              <li style={{ marginBottom: "8px" }}>
                <strong style={{ color: "#93c5fd" }}>Hman lo lio ah:</strong> Na hman lo lio Chat/Session data kha browser memory in a tlei a si.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              6. Na Nawl Te
            </h2>
            <p style={{ marginBottom: "12px" }}>Na nih in:</p>
            <ul style={{ paddingLeft: "24px" }}>
              <li style={{ marginBottom: "8px" }}>Na account tlei theih (extension uninstall lak in)</li>
              <li style={{ marginBottom: "8px" }}>Na conversation history delete dingin ka te tan thawn theih</li>
              <li style={{ marginBottom: "8px" }}>Na data hmuhchihnak chanchin dotam theih</li>
              <li style={{ marginBottom: "8px" }}>Na data export (Markdown / HTML) theih</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              7. Fate Nih Hman (Children's Privacy)
            </h2>
            <p>
              LAI AI kha kum 13 in a thleng lo mi fate tan a si lo. Ka te in fate nih hman dan a hngalh ah, data hi tleitlak a si ding. Na fate in a hman hngalh ah ka te tan nawl theih.
            </p>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              8. Privacy Policy A Thleng Dan
            </h2>
            <p>
              Privacy Policy hi a thleng cio thei a si. Thleng a um ah, date chung ah updated a si ding. Extension in hman in a thleng mi Policy kha na sawm nain a si.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              9. Ka Te Tan Nawl
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Privacy Policy hi a hmun lomi dang um ah le dotam a um ah, ka te tan nawl theih:
            </p>
            <div style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "12px"
            }}>
              <p style={{ margin: 0, color: "#93c5fd" }}>
                📧 <strong>Email:</strong> support@lai-ai-ivy.vercel.app<br />
                🌐 <strong>Website:</strong>{" "}
                <a href="https://lai-ai-ivy.vercel.app"
                  style={{ color: "#60a5fa" }}>https://lai-ai-ivy.vercel.app</a>
              </p>
            </div>
          </section>

          {/* Footer */}
          <div style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            textAlign: "center",
            color: "#64748b",
            fontSize: "13px"
          }}>
            <p>© 2026 LAI AI. Nawl kan nei.</p>
            <p style={{ marginTop: "4px" }}>
              Privacy Policy hi Lai (Hakha Chin) in a si — LAI ruata in kal.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

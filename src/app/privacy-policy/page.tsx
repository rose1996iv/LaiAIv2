import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | LAI AI",
  description: "LAI AI extension te ruahnak le data hmuhchihnak chanchin.",
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
            Thleng ni: March 11, 2026
          </p>
        </div>

        <div style={{ lineHeight: "1.8", fontSize: "15px", color: "#d1d5db" }}>

          {/* Section 1 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              1. Thuhlatnak
            </h2>
            <p>
              LAI AI extension hi Google Sign-In bik in hman theih a si — API key thil dawng a hau lo. Na Google account in sign in lak le, webpage summarize, YouTube video hngalh, le AI tan bia hal theih nak a pek a si. Privacy Policy hi na data le ruahnak an khua dih bang tiah hngalh dingin a si.
            </p>
          </section>

          {/* Section 2 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              2. Zei Data Dah Ka Hmu?
            </h2>
            <p style={{ marginBottom: "12px" }}>LAI AI extension in data phunphun a dawng:</p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Google Account thil:</strong> Na Google account bia — email le holhpawng — Google OAuth (Supabase in a man) bak in a dawng a si. Na login ziangah tlak in authentication ding bak in a hman a si.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Webpage bia:</strong> Na &quot;Summarize&quot; tiin na nhal ah, webpage zung bia (text) kha na browser in khi a si le ka te API server tan thawn a si. Bia hi bak na theih ding in AI in a ruah a si.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>YouTube Transcript:</strong> Na YouTube video summarize lak ah, video transcript (thlir dang na ngei ah) bak API tan thawn a si.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Chat History:</strong> Na AI tan hal mi bia le a dawng mi zawnnak kha Supabase database ah na account in chiah a si, na theih ding in le hlan thawn theih ding in.
              </li>
              <li style={{ marginBottom: "14px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Na hman dan (Usage):</strong> Error le bug hngalh ding in bak usage data phun hrang a dawng kho a si; thil kal dang in a dawng lo.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              3. Ka Te in Data Zei Ding Dah A Hman?
            </h2>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}>✅ Extension a kai dang thiah ding in (authenticate)</li>
              <li style={{ marginBottom: "8px" }}>✅ Na webpage le YouTube video summarize ding in</li>
              <li style={{ marginBottom: "8px" }}>✅ Na chat history chiah le theih ding in</li>
              <li style={{ marginBottom: "8px" }}>✅ AI ruahnak (Google Gemini) a bawm ding in</li>
              <li style={{ marginBottom: "8px" }}>✅ Extension a dang thiah ding le error fix ding in</li>
            </ul>
            <div style={{
              marginTop: "16px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: "10px",
              padding: "16px"
            }}>
              <p style={{ margin: 0, color: "#fca5a5" }}>
                🚫 <strong>Ka te in na data kha tangzang pumpi, advertiser, le data broker te tan thawn lo ding a si.</strong> Na data kha sell lo ding, rent lo ding, le thil pakhatkhat ding ah hman lo ding a si.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              4. Google Sign-In le Authentication
            </h2>
            <p style={{ marginBottom: "12px" }}>
              LAI AI in Google OAuth bak in authentication a hman a si — API key thil dawng lo. Na Google account in sign in lak le:
            </p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                Na Google account thil kha Supabase authentication in a man a si le na extension browser storage ah token in a chiah a si.
              </li>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                Token hi na extension bak in a theih ding a si — URL dang le website dang ten a theih lo ding.
              </li>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                Extension uninstall lak ah le browser storage tlei lak ah, token hi a tlei a si.
              </li>
              <li style={{ marginBottom: "8px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                Google nih in Google Sign-In thil an hria dingin an Privacy Policy <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa" }}>hna in theih theih</a>.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              5. Third-Party Service Te
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { name: "Google Gemini API", desc: "Webpage le YouTube video summarize ding in. Google nih Privacy Policy a nei.", link: "https://policies.google.com/privacy", color: "#4ade80" },
                { name: "Supabase", desc: "Google Sign-In authentication le chat history chiah ding in. Supabase nih Privacy Policy a nei.", link: "https://supabase.com/privacy", color: "#60a5fa" },
                { name: "Google OAuth 2.0", desc: "Na Google account in login ding in. Credentials kha ka te server ah chiah lo — Google tan bak in a kal a si.", link: "https://developers.google.com/identity/protocols/oauth2", color: "#f472b6" },
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
                      Privacy Policy theih.
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              6. Data A Khua Dih Dan
            </h2>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Browser Storage:</strong> Login token kha na browser local storage ah a chiah a si — na extension bak in theih a si.
              </li>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Server (Supabase):</strong> Chat history kha Supabase cloud database ah a chiah a si. HTTPS/TLS encryption in a khua dih a si.
              </li>
              <li style={{ marginBottom: "10px", paddingLeft: "16px", borderLeft: "2px solid rgba(59,130,246,0.4)" }}>
                <strong style={{ color: "#93c5fd" }}>Webpage bia:</strong> Summarize dingin API tan thawn mi webpage bia kha ka te server ah chiah lo — API response dawng le tlei a si.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              7. Na Nawl Te
            </h2>
            <p style={{ marginBottom: "12px" }}>Na nih in:</p>
            <ul style={{ paddingLeft: "24px", listStyle: "none" }}>
              <li style={{ marginBottom: "8px" }}>🔓 Extension uninstall lak in na login token tlei theih</li>
              <li style={{ marginBottom: "8px" }}>📤 Na chat history Markdown/HTML in export theih (extension in)</li>
              <li style={{ marginBottom: "8px" }}>🗑️ Na conversation history delete dingin ka te tan nawl theih</li>
              <li style={{ marginBottom: "8px" }}>📋 Na data hmuhchihnak chanchin dotam theih</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              8. Fate Nih Hman (Children's Privacy)
            </h2>
            <p>
              LAI AI kha kum 13 in a thleng lo mi fate tan a si lo. Ka te in fate nih hman an hngalh ah, data hi tleitlak a si ding le account kha close a si ding. Na fate in a hman hngalh ah ka te tan nawl theih.
            </p>
          </section>

          {/* Section 9 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              9. Privacy Policy A Thleng Dan
            </h2>
            <p>
              Privacy Policy hi a thleng cio thei a si. Thleng a um ah, page chung ah date update a si ding. Extension a hman in a thleng mi Policy kha na sawm nain a si. Pawl thar bia a um ah email in ka hrilhfiah ding.
            </p>
          </section>

          {/* Section 10 */}
          <section style={{ marginBottom: "40px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "600", color: "#f1f5f9", marginBottom: "16px", borderLeft: "3px solid #3b82f6", paddingLeft: "12px" }}>
              10. Ka Te Tan Nawl
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Privacy Policy hi a hmun lomi um ah le dotam a um ah, ka te tan nawl theih:
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

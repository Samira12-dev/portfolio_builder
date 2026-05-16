import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Google Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0a0f; }
        .hero-glow {
          position: absolute; top: -200px; left: 50%;
          transform: translateX(-50%);
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .btn-primary {
          display: inline-block;
          background: #6366f1;
          color: #fff;
          padding: 14px 32px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #4f46e5; transform: translateY(-1px); }
        .btn-outline {
          display: inline-block;
          border: 1.5px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.75);
          padding: 14px 32px;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.4); color: #fff; }
        .feature-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 32px;
          transition: border-color 0.2s;
        }
        .feature-card:hover { border-color: rgba(99,102,241,0.4); }
        .badge {
          display: inline-block;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          color: #a5b4fc;
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
        }
        .step-number {
          width: 36px; height: 36px;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.4);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; color: #a5b4fc;
          margin-bottom: 16px;
        }
        .plan-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 36px 32px;
        }
        .plan-card.popular {
          background: rgba(99,102,241,0.1);
          border-color: rgba(99,102,241,0.4);
        }
        .check { color: #818cf8; margin-right: 8px; }
      `}</style>

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 60px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>
          port<span style={{ color: '#6366f1' }}>AI</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" className="btn-outline" style={{ padding: '10px 22px', fontSize: 14 }}>Sign in</Link>
          <Link to="/register" className="btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>Get started free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: 'relative', textAlign: 'center', padding: '120px 40px 100px', overflow: 'hidden' }}>
        <div className="hero-glow" />
        <div className="badge">✦ AI-powered portfolio & resume builder</div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(42px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24, maxWidth: 800, margin: '0 auto 24px' }}>
          Your portfolio,<br />
          <span style={{ color: '#6366f1' }}>built by AI</span> in minutes
        </h1>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.7, fontWeight: 300 }}>
          Fill in your info, pick a template, and let AI generate a stunning portfolio site and resume — no coding required.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>Build my portfolio →</Link>
          <Link to="/login" className="btn-outline" style={{ fontSize: 16, padding: '16px 36px' }}>Sign in</Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, textAlign: 'center', marginBottom: 60, letterSpacing: '-1px' }}>
          Everything you need
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {[
            { icon: '⚡', title: 'AI Portfolio Builder', desc: 'Fill a simple form and AI generates a beautiful, responsive portfolio website instantly.' },
            { icon: '📄', title: 'Multi-model Resume', desc: 'Get 3 resume versions from Claude, GPT-4o, and Gemini. Compare side by side and pick your favorite.' },
            { icon: '🎨', title: 'Premium Templates', desc: 'Choose from beautiful templates. Free tier includes 3; Pro unlocks all including exclusive designs.' },
            { icon: '🌐', title: 'Instant Publishing', desc: 'Your portfolio goes live at yourname.portai.com with one click. Custom domain on Pro plan.' },
            { icon: '📥', title: 'PDF Export', desc: 'Download your resume as a polished PDF or DOCX, ATS-friendly and ready to send.' },
            { icon: '✏️', title: 'Edit Anytime', desc: 'Update your info and regenerate your portfolio or resume anytime. Changes take seconds.' },
          ].map(f => (
            <div key={f.title} className="feature-card">
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, fontSize: 17, marginBottom: 10 }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '80px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, textAlign: 'center', marginBottom: 60, letterSpacing: '-1px' }}>
            How it works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40 }}>
            {[
              { n: '01', title: 'Create account', desc: 'Sign up free in 30 seconds.' },
              { n: '02', title: 'Fill your profile', desc: 'Add your name, bio, skills, and projects.' },
              { n: '03', title: 'Pick a template', desc: 'Choose the style that fits you best.' },
              { n: '04', title: 'AI generates it', desc: 'Your portfolio and resume are ready instantly.' },
            ].map(s => (
              <div key={s.n}>
                <div className="step-number">{s.n}</div>
                <h3 style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, fontWeight: 300 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 40px' }}>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, textAlign: 'center', marginBottom: 60, letterSpacing: '-1px' }}>
          Simple pricing
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
          {[
            { name: 'Free', price: '$0', period: 'forever', popular: false, features: ['3 portfolio templates', '1 resume (Claude only)', 'yourname.portai.com', 'Portai watermark'] },
            { name: 'Pro', price: '$9', period: '/month', popular: true, features: ['Unlimited templates', '3-model resume compare', 'Custom domain', 'PDF / DOCX export', 'No watermark'] },
            { name: 'Premium', price: '$19', period: '/month', popular: false, features: ['Everything in Pro', 'Exclusive templates', 'Analytics dashboard', 'ATS resume scoring', 'Priority AI generation'] },
          ].map(p => (
            <div key={p.name} className={`plan-card ${p.popular ? 'popular' : ''}`}>
              {p.popular && <div style={{ fontSize: 11, fontWeight: 600, color: '#a5b4fc', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>Most popular</div>}
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{p.name}</div>
              <div style={{ marginBottom: 24 }}>
                <span style={{ fontSize: 40, fontWeight: 700 }}>{p.price}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{p.period}</span>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: 32 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 10, fontWeight: 300 }}>
                    <span className="check">✓</span>{f}
                  </li>
                ))}
              </ul>
              <Link to="/register" className={p.popular ? 'btn-primary' : 'btn-outline'} style={{ display: 'block', textAlign: 'center' }}>
                Get started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '32px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, color: 'rgba(255,255,255,0.5)' }}>port<span style={{ color: '#6366f1' }}>AI</span></div>
        <div>© 2025 portAI. All rights reserved.</div>
      </footer>
    </div>
  )
}

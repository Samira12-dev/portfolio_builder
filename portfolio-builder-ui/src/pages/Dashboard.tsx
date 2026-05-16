import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const cards = [
    { icon: '👤', title: 'My Profile', desc: 'Update your bio, skills, and projects', href: '/profile', cta: 'Edit profile' },
    { icon: '🌐', title: 'Portfolio', desc: 'Generate and publish your portfolio site', href: '/portfolio', cta: 'Build portfolio' },
    { icon: '📄', title: 'Resume', desc: 'Compare 3 AI-generated resume versions', href: '/resume', cta: 'Generate resume' },
    { icon: '🎨', title: 'Templates', desc: 'Browse and switch your portfolio template', href: '/templates', cta: 'Browse templates' },
  ]

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .dash-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 28px;
          text-decoration: none; color: inherit;
          display: block; transition: border-color 0.2s, transform 0.15s;
        }
        .dash-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-2px); }
        .cta-link {
          display: inline-flex; align-items: center; gap: 6px;
          color: #818cf8; font-size: 14px; font-weight: 500;
          text-decoration: none; margin-top: 16px;
        }
        .logout-btn {
          background: none; border: 1.5px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.5); padding: 9px 20px;
          border-radius: 8px; cursor: pointer;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          transition: border-color 0.2s, color 0.2s;
        }
        .logout-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
      `}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <Link to="/" style={styles.logo}>port<span style={{ color: '#6366f1' }}>AI</span></Link>
        <button className="logout-btn" onClick={handleLogout}>Sign out</button>
      </nav>

      <main style={styles.main}>
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>Build your portfolio and resume with AI</p>
        </div>

        {/* Status banner */}
        <div style={styles.banner}>
          <span style={{ fontSize: 20 }}>🚀</span>
          <div>
            <div style={{ fontWeight: 500, fontSize: 15, marginBottom: 4 }}>Complete your profile to get started</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>Add your skills and projects, then generate your portfolio and resume in seconds.</div>
          </div>
          <Link to="/profile" style={styles.bannerBtn}>Start →</Link>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          {cards.map(c => (
            <Link key={c.title} to={c.href} className="dash-card">
              <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 8 }}>{c.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, lineHeight: 1.6, fontWeight: 300 }}>{c.desc}</p>
              <div className="cta-link">{c.cta} →</div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: "'DM Sans', sans-serif" },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', textDecoration: 'none' },
  main: { maxWidth: 900, margin: '0 auto', padding: '60px 40px' },
  header: { marginBottom: 40 },
  title: { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 36, letterSpacing: '-1px', marginBottom: 8 },
  subtitle: { color: 'rgba(255,255,255,0.4)', fontSize: 16, fontWeight: 300 },
  banner: { display: 'flex', alignItems: 'center', gap: 20, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 14, padding: '20px 24px', marginBottom: 40 },
  bannerBtn: { marginLeft: 'auto', background: '#6366f1', color: '#fff', padding: '10px 22px', borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 },
}

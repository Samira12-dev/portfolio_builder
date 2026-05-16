import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { profileApi } from '../api/api'

const STEPS = ['Personal info', 'Skills', 'Projects', 'Links']

export default function ProfileForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [personal, setPersonal] = useState({ fullName: '', title: '', bio: '' })
  const [skills, setSkills] = useState([{ name: '', level: 80 }])
  const [projects, setProjects] = useState([{ title: '', description: '', githubUrl: '', liveDemoUrl: '' }])
  const [links, setLinks] = useState({ github: '', linkedin: '', website: '' })

  const addSkill = () => setSkills([...skills, { name: '', level: 80 }])
  const removeSkill = (i: number) => setSkills(skills.filter((_, idx) => idx !== i))
  const updateSkill = (i: number, field: string, val: string | number) =>
    setSkills(skills.map((s, idx) => idx === i ? { ...s, [field]: val } : s))

  const addProject = () => setProjects([...projects, { title: '', description: '', githubUrl: '', liveDemoUrl: '' }])
  const removeProject = (i: number) => setProjects(projects.filter((_, idx) => idx !== i))
  const updateProject = (i: number, field: string, val: string) =>
    setProjects(projects.map((p, idx) => idx === i ? { ...p, [field]: val } : p))

  const handleSave = async () => {
    setLoading(true)
    setError('')
    try {
      await profileApi.update({ ...personal, skills, projects, ...links })
      navigate('/dashboard')
    } catch {
      setError('Failed to save profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        label { font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.6); }
        input, textarea {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.06);
          border: 1.5px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 14px;
          outline: none; transition: border-color 0.2s; resize: vertical;
        }
        input:focus, textarea:focus { border-color: rgba(99,102,241,0.6); }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input[type="range"] { padding: 0; background: none; border: none; cursor: pointer; }
        .btn { padding: 12px 28px; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: #6366f1; color: #fff; }
        .btn-primary:hover { background: #4f46e5; }
        .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-outline { background: none; border: 1.5px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.6); }
        .btn-outline:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .btn-ghost { background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.2); color: #fca5a5; padding: 6px 12px; border-radius: 8px; font-size: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .item-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
        .add-btn { background: none; border: 1.5px dashed rgba(255,255,255,0.15); color: rgba(255,255,255,0.4); width: 100%; padding: 14px; border-radius: 12px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; transition: border-color 0.2s, color 0.2s; }
        .add-btn:hover { border-color: rgba(99,102,241,0.5); color: #818cf8; }
      `}</style>

      {/* Navbar */}
      <nav style={styles.nav}>
        <Link to="/dashboard" style={styles.logo}>port<span style={{ color: '#6366f1' }}>AI</span></Link>
      </nav>

      <main style={styles.main}>
        {/* Step indicator */}
        <div style={styles.steps}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600,
                background: i < step ? '#6366f1' : i === step ? '#6366f1' : 'rgba(255,255,255,0.08)',
                color: i <= step ? '#fff' : 'rgba(255,255,255,0.3)',
                border: i === step ? '2px solid #818cf8' : '2px solid transparent',
              }}>{i < step ? '✓' : i + 1}</div>
              <span style={{ fontSize: 13, color: i === step ? '#fff' : 'rgba(255,255,255,0.35)', fontWeight: i === step ? 500 : 400 }}>{s}</span>
              {i < STEPS.length - 1 && <div style={{ width: 40, height: 1, background: 'rgba(255,255,255,0.1)', marginLeft: 4 }} />}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{STEPS[step]}</h2>

          {error && <div style={styles.error}>{error}</div>}

          {/* Step 0 — Personal */}
          {step === 0 && (
            <div>
              <div className="field">
                <label>Full name</label>
                <input type="text" placeholder="John Doe" value={personal.fullName}
                  onChange={e => setPersonal({ ...personal, fullName: e.target.value })} />
              </div>
              <div className="field">
                <label>Professional title</label>
                <input type="text" placeholder="Full-stack Developer" value={personal.title}
                  onChange={e => setPersonal({ ...personal, title: e.target.value })} />
              </div>
              <div className="field">
                <label>Bio / About me</label>
                <textarea rows={5} placeholder="Tell the world about yourself..."
                  value={personal.bio} onChange={e => setPersonal({ ...personal, bio: e.target.value })} />
              </div>
            </div>
          )}

          {/* Step 1 — Skills */}
          {step === 1 && (
            <div>
              {skills.map((s, i) => (
                <div key={i} className="item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Skill {i + 1}</span>
                    {skills.length > 1 && <button className="btn-ghost" onClick={() => removeSkill(i)}>Remove</button>}
                  </div>
                  <div className="field">
                    <label>Skill name</label>
                    <input type="text" placeholder="React, Python, Figma…" value={s.name}
                      onChange={e => updateSkill(i, 'name', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Level — {s.level}%</label>
                    <input type="range" min={10} max={100} step={5} value={s.level}
                      onChange={e => updateSkill(i, 'level', Number(e.target.value))} />
                  </div>
                </div>
              ))}
              <button className="add-btn" onClick={addSkill}>+ Add skill</button>
            </div>
          )}

          {/* Step 2 — Projects */}
          {step === 2 && (
            <div>
              {projects.map((p, i) => (
                <div key={i} className="item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Project {i + 1}</span>
                    {projects.length > 1 && <button className="btn-ghost" onClick={() => removeProject(i)}>Remove</button>}
                  </div>
                  <div className="field">
                    <label>Project title</label>
                    <input type="text" placeholder="My Awesome App" value={p.title}
                      onChange={e => updateProject(i, 'title', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <textarea rows={3} placeholder="What does it do?" value={p.description}
                      onChange={e => updateProject(i, 'description', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>GitHub URL (optional)</label>
                    <input type="url" placeholder="https://github.com/you/project" value={p.githubUrl}
                      onChange={e => updateProject(i, 'githubUrl', e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Live demo URL (optional)</label>
                    <input type="url" placeholder="https://myproject.com" value={p.liveDemoUrl}
                      onChange={e => updateProject(i, 'liveDemoUrl', e.target.value)} />
                  </div>
                </div>
              ))}
              <button className="add-btn" onClick={addProject}>+ Add project</button>
            </div>
          )}

          {/* Step 3 — Links */}
          {step === 3 && (
            <div>
              <div className="field">
                <label>GitHub</label>
                <input type="url" placeholder="https://github.com/username" value={links.github}
                  onChange={e => setLinks({ ...links, github: e.target.value })} />
              </div>
              <div className="field">
                <label>LinkedIn</label>
                <input type="url" placeholder="https://linkedin.com/in/username" value={links.linkedin}
                  onChange={e => setLinks({ ...links, linkedin: e.target.value })} />
              </div>
              <div className="field">
                <label>Personal website (optional)</label>
                <input type="url" placeholder="https://yoursite.com" value={links.website}
                  onChange={e => setLinks({ ...links, website: e.target.value })} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <button className="btn btn-outline" onClick={() => step > 0 ? setStep(step - 1) : navigate('/dashboard')}>
              ← {step === 0 ? 'Cancel' : 'Back'}
            </button>
            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? 'Saving...' : '✓ Save profile'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#0a0a0f', color: '#fff', fontFamily: "'DM Sans', sans-serif" },
  nav: { display: 'flex', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  logo: { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, color: '#fff', textDecoration: 'none' },
  main: { maxWidth: 680, margin: '0 auto', padding: '48px 24px' },
  steps: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' },
  card: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 36 },
  cardTitle: { fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 28, letterSpacing: '-0.5px' },
  error: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5', padding: '12px 16px', borderRadius: 10, fontSize: 14, marginBottom: 20 },
}

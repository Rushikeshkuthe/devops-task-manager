import { useState } from 'react'
import './App.css'

type TabId = 'github' | 'kubernetes' | 'docker' | 'redis' | 'development'

type Tab = {
  id: TabId
  label: string
  icon: 'github' | 'kubernetes' | 'docker' | 'redis' | 'development'
  count?: number
}

const tabs: Tab[] = [
  { id: 'github', label: 'GitHub', icon: 'github', count: 12 },
  { id: 'kubernetes', label: 'Kubernetes', icon: 'kubernetes', count: 8 },
  { id: 'docker', label: 'Docker', icon: 'docker', count: 24 },
  { id: 'redis', label: 'Redis', icon: 'redis', count: 4 },
  { id: 'development', label: 'Development', icon: 'development' },
]

const tabDescriptions: Record<TabId, string> = {
  github: 'Repositories, pull requests, and CI workflows',
  kubernetes: 'Clusters, workloads, and resource status',
  docker: 'Containers, images, and running services',
  redis: 'Cache nodes, memory, and key performance',
  development: 'Local environments and development tools',
}

function TabIcon({ type }: { type: Tab['icon'] }) {
  if (type === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.1a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.57c.85 0 1.71.12 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.83-2.34 4.67-4.57 4.92.36.31.68.92.68 1.86v2.11c0 .27.18.58.69.48A10 10 0 0 0 12 2.1Z" />
      </svg>
    )
  }
  if (type === 'kubernetes') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <circle key={angle} cx={12 + 5.6 * Math.cos((angle * Math.PI) / 180)} cy={12 + 5.6 * Math.sin((angle * Math.PI) / 180)} r="1.25" fill="currentColor" />
        ))}
      </svg>
    )
  }
  if (type === 'docker') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11h3V8h3v3h3V8h3v3h3.2c1.8 0 3.2 1.2 3.8 2.8A3.7 3.7 0 0 1 21 20H8.2C4.6 20 2.7 17.7 2 15l1-.9V11Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M4 13.5h13" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    )
  }
  if (type === 'redis') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <ellipse cx="12" cy="7" rx="7.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
        <path d="M4.5 7v10c0 1.7 3.35 3 7.5 3s7.5-1.3 7.5-3V7M4.5 12c0 1.7 3.35 3 7.5 3s7.5-1.3 7.5-3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: 'green' | 'orange' | 'blue' }) {
  return (
    <article className="stat-card">
      <span className={`status-dot ${accent}`} />
      <div>
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
    </article>
  )
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('github')
  const active = tabs.find((tab) => tab.id === activeTab)!

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div>
            <strong>DevOps</strong>
            <span>Task Manager</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Tool categories">
          <p className="nav-heading">WORKSPACE</p>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              <span className="nav-icon">
                <TabIcon type={tab.icon} />
              </span>
              <span className="nav-label">{tab.label}</span>
              {tab.count && <span className="nav-count">{tab.count}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="profile">
            <span className="avatar">RK</span>
            <span className="profile-copy">
              <strong>Rishikesh Kuthe</strong>
              <span>Administrator</span>
            </span>
            <span className="profile-menu" aria-hidden="true">•••</span>
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{active.label}</strong>
          </div>
          <div className="topbar-actions">
            <button type="button" className="icon-button" aria-label="Search">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                <path d="m16 16 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" className="icon-button notification" aria-label="Notifications">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18 16H6l1.5-2v-3.5a4.5 4.5 0 0 1 9 0V14l1.5 2ZM10 19h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span />
            </button>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <h1>{active.label}</h1>
              <p>{tabDescriptions[active.id]}</p>
            </div>
            <button type="button" className="primary-button">
              <span>+</span>
              Add task
            </button>
          </div>

          <div className="stats-grid">
            <StatCard label="Active" value={active.id === 'github' ? '12' : active.id === 'docker' ? '24' : '8'} accent="green" />
            <StatCard label="In progress" value={active.id === 'redis' ? '2' : '5'} accent="orange" />
            <StatCard label="Completed" value="18" accent="blue" />
          </div>

          <section className="task-panel">
            <div className="panel-header">
              <h2>Recent activity</h2>
              <button type="button">View all</button>
            </div>
            <div className="task-list">
              {[
                ['Fix authentication workflow', 'Updated 12 minutes ago', 'In progress'],
                ['Deploy production cluster', 'Updated 38 minutes ago', 'Review'],
                ['Update container configuration', 'Updated 2 hours ago', 'Completed'],
              ].map(([title, time, status]) => (
                <article className="task-row" key={title}>
                  <button type="button" className="task-check" aria-label={`Open ${title}`} />
                  <div className="task-copy">
                    <strong>{title}</strong>
                    <span>{time}</span>
                  </div>
                  <span className={`task-status ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
                  <button type="button" className="row-menu" aria-label={`Actions for ${title}`}>•••</button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default App

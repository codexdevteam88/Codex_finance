import React from 'react'

export default function Docs() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24, fontSize: 28, fontWeight: 'bold' }}>Documentation</h1>
      
      {/* Quick Access */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>📖</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>User Guide</h3>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Complete guide on how to use the system features and navigate through different modules.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Open Guide
          </button>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>🔧</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>API Documentation</h3>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Technical documentation for developers including API endpoints, authentication, and examples.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            View API Docs
          </button>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>❓</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>FAQ</h3>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Frequently asked questions and troubleshooting guides for common issues.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Browse FAQ
          </button>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>📞</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Support</h3>
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 16 }}>
            Contact our support team for technical assistance and feature requests.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }}>
            Contact Support
          </button>
        </div>
      </div>

      {/* Documentation Sections */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Getting Started</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'System Overview', desc: 'Understanding the main features and capabilities' },
              { title: 'First Steps', desc: 'Initial setup and configuration guide' },
              { title: 'User Management', desc: 'Creating and managing user accounts' },
              { title: 'Data Import', desc: 'How to import your existing data' },
              { title: 'Security Setup', desc: 'Configuring security and access controls' }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: 12,
                background: 'var(--surface-alt)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Advanced Topics</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { title: 'Custom Reports', desc: 'Creating and configuring custom reports' },
              { title: 'Data Integration', desc: 'Integrating with external systems' },
              { title: 'Automation', desc: 'Setting up automated workflows' },
              { title: 'Performance Tuning', desc: 'Optimizing system performance' },
              { title: 'Backup & Recovery', desc: 'Data backup and disaster recovery' }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: 12,
                background: 'var(--surface-alt)',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}>
                <div style={{ fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 20 }}>Recent Updates</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { version: 'v2.1.0', date: '2025-01-15', title: 'New Dashboard Features', desc: 'Added advanced filtering and export capabilities to the dashboard' },
            { version: 'v2.0.5', date: '2025-01-10', title: 'Security Enhancements', desc: 'Improved authentication and added two-factor authentication support' },
            { version: 'v2.0.3', date: '2025-01-05', title: 'Performance Improvements', desc: 'Optimized database queries and improved loading times' },
            { version: 'v2.0.1', date: '2024-12-28', title: 'Bug Fixes', desc: 'Fixed issues with report generation and data synchronization' },
            { version: 'v2.0.0', date: '2024-12-20', title: 'Major Release', desc: 'Complete redesign with new UI and enhanced functionality' }
          ].map((update, idx) => (
            <div key={idx} style={{
              display: 'flex',
              alignItems: 'center',
              padding: 16,
              background: 'var(--surface-alt)',
              borderRadius: '8px',
              border: '1px solid var(--border)'
            }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#051014',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                marginRight: 16
              }}>
                {update.version.split('.')[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                  <div style={{ fontWeight: 500 }}>{update.title}</div>
                  <div style={{
                    padding: '2px 6px',
                    background: 'var(--surface)',
                    borderRadius: '4px',
                    fontSize: 11,
                    fontWeight: 500
                  }}>
                    {update.version}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 4 }}>{update.desc}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{update.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

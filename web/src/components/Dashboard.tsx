import React from 'react'

export default function Dashboard() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24, fontSize: 28, fontWeight: 'bold' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
        {/* Key Metrics Cards */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>💰</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Total Revenue</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--success)', marginBottom: 8 }}>
            $2,450,000
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            +12.5% from last month
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>📊</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Active Projects</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary)', marginBottom: 8 }}>
            24
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            3 new this week
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>👥</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Team Members</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary2)', marginBottom: 8 }}>
            156
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            +2 this month
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>🎯</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Goal Progress</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--warning)', marginBottom: 8 }}>
            87%
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            On track for Q4 target
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Revenue Trend</h3>
          <div style={{
            height: 300,
            background: 'var(--surface-alt)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted)',
            fontSize: 16
          }}>
            📈 Chart Placeholder
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { icon: '💰', text: 'Payment received from Client A', time: '2 hours ago' },
              { icon: '📄', text: 'New contract signed', time: '4 hours ago' },
              { icon: '👥', text: 'Team meeting completed', time: '6 hours ago' },
              { icon: '📊', text: 'Monthly report generated', time: '1 day ago' }
            ].map((activity, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 16 }}>{activity.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14 }}>{activity.text}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

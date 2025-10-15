import React from 'react'

// FilterType1: عرض بيانات سنة واحدة (شهري/ربع سنوي/سنوي)
type Props = {
  year: number
  setYear: (y: number) => void
  viewMode: 'monthly' | 'quarterly' | 'yearly'
  setViewMode: (v: 'monthly' | 'quarterly' | 'yearly') => void
  report: 'IS' | 'BS' | 'CF'
  setReport: (r: 'IS' | 'BS' | 'CF') => void
  onApply: () => void
}

export default function FilterType1(p: Props) {
  const years = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + 1 - i)

  return (
    <div className="card" style={{ padding: 20, marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px 0', color: 'var(--primary)', fontSize: 18 }}>
          📊 Single Year Data View
        </h3>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
          Select year and display method (Monthly, Quarterly, or Yearly)
        </p>
      </div>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Year Selection */}
        <span className="pill">
          <span style={{ marginLeft: 8, fontSize: 14 }}>Year:</span>
          <select
            value={p.year}
            onChange={e => p.setYear(Number(e.target.value))}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontWeight: 'bold',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </span>

        {/* Display Method */}
        <span className="pill">
          <span style={{ marginLeft: 8, fontSize: 14 }}>Display:</span>
          <select
            value={p.viewMode}
            onChange={e => p.setViewMode(e.target.value as any)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontWeight: 'bold',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="monthly">Monthly (12 months)</option>
            <option value="quarterly">Quarterly (4 quarters)</option>
            <option value="yearly">Yearly (Total)</option>
          </select>
        </span>

        {/* Report Type */}
        <span className="pill">
          <span style={{ marginLeft: 8, fontSize: 14 }}>Report:</span>
          <select
            value={p.report}
            onChange={e => p.setReport(e.target.value as any)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontWeight: 'bold',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="IS">Income Statement (IS)</option>
            <option value="BS">Balance Sheet (BS)</option>
            <option value="CF">Cash Flow (CF)</option>
          </select>
        </span>

        {/* Apply Button */}
        <button
          className="btn btn-primary"
          onClick={p.onApply}
          style={{ marginRight: 'auto' }}
        >
          View Report
        </button>
      </div>
    </div>
  )
}


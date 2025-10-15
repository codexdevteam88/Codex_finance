import React from 'react'

// FilterType2: مقارنة فترات عبر سنوات مختلفة
type Props = {
  periodType: 'year' | 'quarter' | 'month'
  setPeriodType: (v: 'year' | 'quarter' | 'month') => void
  selectedYears: number[]
  setSelectedYears: (years: number[]) => void
  quarter: 1 | 2 | 3 | 4
  setQuarter: (q: 1 | 2 | 3 | 4) => void
  month: number
  setMonth: (m: number) => void
  report: 'IS' | 'BS' | 'CF'
  setReport: (r: 'IS' | 'BS' | 'CF') => void
  onApply: () => void
}

export default function FilterType2(p: Props) {
  const availableYears = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + 1 - i)
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  const toggleYear = (year: number) => {
    if (p.selectedYears.includes(year)) {
      p.setSelectedYears(p.selectedYears.filter(y => y !== year))
    } else {
      // الحد الأقصى 3 سنوات
      if (p.selectedYears.length < 3) {
        p.setSelectedYears([...p.selectedYears, year].sort((a, b) => b - a))
      }
    }
  }

  return (
    <div className="card" style={{ padding: 20, marginBottom: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px 0', color: 'var(--primary2)', fontSize: 18 }}>
          📅 Year Comparison
        </h3>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
          Compare same periods across different years (up to 3 years)
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Period Type */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="pill">
            <span style={{ marginLeft: 8, fontSize: 14 }}>Period:</span>
            <select
              value={p.periodType}
              onChange={e => p.setPeriodType(e.target.value as any)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text)',
                fontWeight: 'bold',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="year">Full Year</option>
              <option value="quarter">Quarterly</option>
              <option value="month">Monthly</option>
            </select>
          </span>

          {/* If quarterly selected */}
          {p.periodType === 'quarter' && (
            <span className="pill">
              <span style={{ marginLeft: 8, fontSize: 14 }}>Quarter:</span>
              <select
                value={p.quarter}
                onChange={e => p.setQuarter(Number(e.target.value) as any)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="1">Q1 (Jan - Mar)</option>
                <option value="2">Q2 (Apr - Jun)</option>
                <option value="3">Q3 (Jul - Sep)</option>
                <option value="4">Q4 (Oct - Dec)</option>
              </select>
            </span>
          )}

          {/* If monthly selected */}
          {p.periodType === 'month' && (
            <span className="pill">
              <span style={{ marginLeft: 8, fontSize: 14 }}>Month:</span>
              <select
                value={p.month}
                onChange={e => p.setMonth(Number(e.target.value))}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                {monthNames.map((name, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </span>
          )}

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
        </div>

        {/* Year Selection */}
        <div>
          <div style={{ marginBottom: 10, fontSize: 14, color: 'var(--muted)' }}>
            Select years for comparison (up to 3 years):
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {availableYears.map(year => (
              <label
                key={year}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 14px',
                  background: p.selectedYears.includes(year) ? 'var(--primary)' : 'var(--surface-alt)',
                  color: p.selectedYears.includes(year) ? '#051014' : 'var(--text)',
                  border: `1px solid ${p.selectedYears.includes(year) ? 'var(--primary)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-button)',
                  cursor: 'pointer',
                  fontWeight: p.selectedYears.includes(year) ? 'bold' : 'normal',
                  transition: 'all 0.2s'
                }}
              >
                <input
                  type="checkbox"
                  checked={p.selectedYears.includes(year)}
                  onChange={() => toggleYear(year)}
                  style={{ cursor: 'pointer' }}
                />
                <span>{year}</span>
              </label>
            ))}
          </div>
          {p.selectedYears.length === 0 && (
            <div style={{ marginTop: 8, fontSize: 13, color: 'var(--danger)' }}>
              ⚠️ Must select at least one year
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div>
          <button
            className="btn btn-primary"
            onClick={p.onApply}
            disabled={p.selectedYears.length === 0}
            style={{
              opacity: p.selectedYears.length === 0 ? 0.5 : 1,
              cursor: p.selectedYears.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            View Comparison
          </button>
        </div>
      </div>
    </div>
  )
}


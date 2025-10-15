import React from 'react'
import FilterType1 from './FilterType1'
import FilterType2 from './FilterType2'
import MultiColumnTable from './MultiColumnTable'
import { fetchAll } from '../services/firestore'
import { monthsOf } from '../utils/periods'

type Column = {
  key: string
  label: string
  data: Map<string, {amount: number, name: string}>
}

type Props = {
  reportType: 'IS' | 'BS' | 'CF'
}

export default function FinancialReport({ reportType }: Props) {
  const now = new Date()
  
  
  // حالة اختيار نوع الفلتر
  const [filterMode, setFilterMode] = React.useState<1 | 2>(1)

  // حالات الفلتر الأول (عرض سنة واحدة)
  const [year1, setYear1] = React.useState(now.getFullYear())
  const [viewMode, setViewMode] = React.useState<'monthly' | 'quarterly' | 'yearly'>('monthly')
  const [report1, setReport1] = React.useState<'IS' | 'BS' | 'CF'>(reportType)

  // حالات الفلتر الثاني (مقارنة عبر سنوات)
  const [periodType, setPeriodType] = React.useState<'year' | 'quarter' | 'month'>('year')
  const [selectedYears, setSelectedYears] = React.useState<number[]>([now.getFullYear(), now.getFullYear() - 1])
  const [quarter2, setQuarter2] = React.useState<1 | 2 | 3 | 4>(2)
  const [month2, setMonth2] = React.useState<number>(now.getMonth() + 1)
  const [report2, setReport2] = React.useState<'IS' | 'BS' | 'CF'>(reportType)

  // تحديث reportType عند تغيير الـ prop
  React.useEffect(() => {
    setReport1(reportType)
    setReport2(reportType)
  }, [reportType])

  // حالات العرض
  const [columns, setColumns] = React.useState<Column[]>([])
  const [label, setLabel] = React.useState<string>('—')
  const [loading, setLoading] = React.useState(false)

  // دالة تطبيق الفلتر الأول
  async function applyFilter1() {
    setLoading(true)
    const cols: Column[] = []
    let lbl = ''

    if (viewMode === 'monthly') {
      // عرض 12 شهر
      lbl = `Monthly view for ${year1} - ${report1 === 'IS' ? 'Income Statement' : report1 === 'BS' ? 'Balance Sheet' : 'Cash Flow'}`
      
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]

      for (let m = 1; m <= 12; m++) {
        const data = await fetchAll('mv_monthly', {
          report_type: report1,
          year: year1,
          month: m
        })

        const map = new Map<string, {amount: number, name: string}>()
        data.forEach((r: any) => {
          const existing = map.get(r.account_code)
          map.set(r.account_code, {
            amount: (existing?.amount || 0) + Number(r.amount || 0),
            name: r.account_name || r.account_code
          })
        })

        cols.push({
          key: `m${m}`,
          label: monthNames[m - 1],
          data: map
        })
      }
    } else if (viewMode === 'quarterly') {
      // عرض 4 أرباع
      lbl = `Quarterly view for ${year1} - ${report1 === 'IS' ? 'Income Statement' : report1 === 'BS' ? 'Balance Sheet' : 'Cash Flow'}`

      for (let q = 1; q <= 4; q++) {
        const data = await fetchAll('mv_quarterly', {
          report_type: report1,
          year: year1,
          quarter: q
        })

        const map = new Map<string, {amount: number, name: string}>()
        data.forEach((r: any) => {
          const existing = map.get(r.account_code)
          map.set(r.account_code, {
            amount: (existing?.amount || 0) + Number(r.amount || 0),
            name: r.account_name || r.account_code
          })
        })

        cols.push({
          key: `q${q}`,
          label: `Q${q}`,
          data: map
        })
      }
    } else {
      // عرض سنوي
      lbl = `Yearly view for ${year1} - ${report1 === 'IS' ? 'Income Statement' : report1 === 'BS' ? 'Balance Sheet' : 'Cash Flow'}`

      const data = await fetchAll('mv_yearly', {
        report_type: report1,
        year: year1
      })

      const map = new Map<string, {amount: number, name: string}>()
      data.forEach((r: any) => {
        const existing = map.get(r.account_code)
        map.set(r.account_code, {
          amount: (existing?.amount || 0) + Number(r.amount || 0),
          name: r.account_name || r.account_code
        })
      })

      cols.push({
        key: `y${year1}`,
        label: `${year1}`,
        data: map
      })
    }

    setColumns(cols)
    setLabel(lbl)
    setLoading(false)
  }

  // دالة تطبيق الفلتر الثاني
  async function applyFilter2() {
    if (selectedYears.length === 0) return

    setLoading(true)
    const cols: Column[] = []
    let lbl = ''

    const reportName = report2 === 'IS' ? 'Income Statement' : report2 === 'BS' ? 'Balance Sheet' : 'Cash Flow'

    if (periodType === 'year') {
      // مقارنة سنوات كاملة
      lbl = `Year comparison: ${selectedYears.join(' vs ')} - ${reportName}`

      for (const year of selectedYears) {
        const data = await fetchAll('mv_yearly', {
          report_type: report2,
          year: year
        })

        const map = new Map<string, {amount: number, name: string}>()
        data.forEach((r: any) => {
          const existing = map.get(r.account_code)
          map.set(r.account_code, {
            amount: (existing?.amount || 0) + Number(r.amount || 0),
            name: r.account_name || r.account_code
          })
        })

        cols.push({
          key: `y${year}`,
          label: `${year}`,
          data: map
        })
      }
    } else if (periodType === 'quarter') {
      // مقارنة نفس الربع عبر سنوات
      lbl = `Q${quarter2} comparison across years: ${selectedYears.join(', ')} - ${reportName}`

      for (const year of selectedYears) {
        const data = await fetchAll('mv_quarterly', {
          report_type: report2,
          year: year,
          quarter: quarter2
        })

        const map = new Map<string, {amount: number, name: string}>()
        data.forEach((r: any) => {
          const existing = map.get(r.account_code)
          map.set(r.account_code, {
            amount: (existing?.amount || 0) + Number(r.amount || 0),
            name: r.account_name || r.account_code
          })
        })

        cols.push({
          key: `q${quarter2}_${year}`,
          label: `Q${quarter2}-${year}`,
          data: map
        })
      }
    } else {
      // مقارنة نفس الشهر عبر سنوات
      const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      lbl = `${monthNames[month2 - 1]} comparison across years: ${selectedYears.join(', ')} - ${reportName}`

      for (const year of selectedYears) {
        const data = await fetchAll('mv_monthly', {
          report_type: report2,
          year: year,
          month: month2
        })

        const map = new Map<string, {amount: number, name: string}>()
        data.forEach((r: any) => {
          const existing = map.get(r.account_code)
          map.set(r.account_code, {
            amount: (existing?.amount || 0) + Number(r.amount || 0),
            name: r.account_name || r.account_code
          })
        })

        cols.push({
          key: `m${month2}_${year}`,
          label: `${monthNames[month2 - 1]} ${year}`,
          data: map
        })
      }
    }

    setColumns(cols)
    setLabel(lbl)
    setLoading(false)
  }

  // تطبيق تلقائي عند التحميل
  React.useEffect(() => {
    applyFilter1()
  }, [])

  const reportTitle = reportType === 'IS' ? 'Income Statement' : reportType === 'BS' ? 'Balance Sheet' : 'Cash Flow'

  return (
    <div style={{ padding: 24, opacity: loading ? 0.7 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>{reportTitle}</h1>
        <div style={{
          background: 'var(--warning)',
          color: '#051014',
          padding: '8px 16px',
          borderRadius: 'var(--radius-button)',
          fontWeight: 'bold',
          fontSize: 14
        }}>
          🎲 Demo Mode
        </div>
      </div>

      {/* Filter Mode Toggle Buttons */}
      <div style={{ marginBottom: 20, display: 'flex', gap: 12 }}>
        <button
          onClick={() => setFilterMode(1)}
          style={{
            padding: '12px 24px',
            background: filterMode === 1 ? 'var(--primary)' : 'var(--surface)',
            color: filterMode === 1 ? '#051014' : 'var(--text)',
            border: `1px solid ${filterMode === 1 ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-button)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📊 Single Year View
        </button>
        <button
          onClick={() => setFilterMode(2)}
          style={{
            padding: '12px 24px',
            background: filterMode === 2 ? 'var(--primary2)' : 'var(--surface)',
            color: filterMode === 2 ? '#051014' : 'var(--text)',
            border: `1px solid ${filterMode === 2 ? 'var(--primary2)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-button)',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          📅 Year Comparison
        </button>
      </div>

      {/* Display appropriate filter */}
      {filterMode === 1 ? (
        <FilterType1
          year={year1}
          setYear={setYear1}
          viewMode={viewMode}
          setViewMode={setViewMode}
          report={report1}
          setReport={setReport1}
          onApply={applyFilter1}
        />
      ) : (
        <FilterType2
          periodType={periodType}
          setPeriodType={setPeriodType}
          selectedYears={selectedYears}
          setSelectedYears={setSelectedYears}
          quarter={quarter2}
          setQuarter={setQuarter2}
          month={month2}
          setMonth={setMonth2}
          report={report2}
          setReport={setReport2}
          onApply={applyFilter2}
        />
      )}

      {/* Display table */}
      <MultiColumnTable columns={columns} label={label} showTotals={true} />
    </div>
  )
}

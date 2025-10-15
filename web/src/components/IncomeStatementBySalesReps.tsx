import React from 'react'
import FilterType1 from './FilterType1'
import FilterType2 from './FilterType2'
import MultiColumnTable from './MultiColumnTable'
import { salesReps, getSalesRepForAccount } from '../utils/demoData'

// Income Statement by Sales Reps
export default function IncomeStatementBySalesReps() {
  const [filterMode, setFilterMode] = React.useState<'type1' | 'type2'>('type1')
  
  // Filter Type 1 states
  const [year1, setYear1] = React.useState(new Date().getFullYear())
  const [period1, setPeriod1] = React.useState<'monthly' | 'quarterly' | 'yearly'>('monthly')
  const [report1, setReport1] = React.useState<'IS' | 'BS' | 'CF'>('IS')
  
  // Filter Type 2 states
  const [periodType, setPeriodType] = React.useState<'year' | 'quarter' | 'month'>('year')
  const [selectedYears, setSelectedYears] = React.useState<number[]>([new Date().getFullYear()])
  const [quarter, setQuarter] = React.useState<1 | 2 | 3 | 4>(1)
  const [month, setMonth] = React.useState(new Date().getMonth() + 1)
  const [report2, setReport2] = React.useState<'IS' | 'BS' | 'CF'>('IS')
  
  const [columns, setColumns] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(false)

  // Sales Reps data structure
  const salesRepsData = salesReps

  const applyFilter1 = async () => {
    setLoading(true)
    try {
      let data: any[] = []
      
      if (period1 === 'monthly') {
        data = await fetchMonthlyData(report1, year1)
      } else if (period1 === 'quarterly') {
        data = await fetchQuarterlyData(report1, year1)
      } else {
        data = await fetchYearlyData(report1, year1)
      }

      // Group data by sales rep
      const salesRepData = new Map<string, Map<string, {amount: number, name: string}>>()
      
      salesRepsData.forEach(rep => {
        salesRepData.set(rep.id, new Map())
      })

      data.forEach((record: any) => {
        // Simulate sales rep assignment based on account
        const repId = getSalesRepForAccount(record.account_code)
        const repData = salesRepData.get(repId)
        if (repData) {
          const existing = repData.get(record.account_code)
          repData.set(record.account_code, {
            amount: (existing?.amount || 0) + Number(record.amount || 0),
            name: record.account_name || record.account_code
          })
        }
      })

      // Create columns for each sales rep
      const newColumns = salesRepsData.map(rep => {
        const repData = salesRepData.get(rep.id) || new Map()
        return {
          key: rep.id,
          label: `${rep.name} (${rep.code})`,
          data: repData
        }
      })

      setColumns(newColumns)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilter2 = async () => {
    setLoading(true)
    try {
      const newColumns: any[] = []
      
      for (const year of selectedYears) {
        let data: any[] = []
        
        if (periodType === 'year') {
          data = await fetchYearlyData(report2, year)
        } else if (periodType === 'quarter') {
          data = await fetchQuarterlyData(report2, year)
        } else {
          data = await fetchMonthlyData(report2, year)
        }

        // Group data by sales rep
        const salesRepData = new Map<string, Map<string, {amount: number, name: string}>>()
        
        salesRepsData.forEach(rep => {
          salesRepData.set(rep.id, new Map())
        })

        data.forEach((record: any) => {
          const repId = getSalesRepForAccount(record.account_code)
          const repData = salesRepData.get(repId)
          if (repData) {
            const existing = repData.get(record.account_code)
            repData.set(record.account_code, {
              amount: (existing?.amount || 0) + Number(record.amount || 0),
              name: record.account_name || record.account_code
            })
          }
        })

        // Add columns for each sales rep
        salesRepsData.forEach(rep => {
          const repData = salesRepData.get(rep.id) || new Map()
          newColumns.push({
            key: `${rep.id}_${year}`,
            label: `${rep.name} - ${year}`,
            data: repData
          })
        })
      }

      setColumns(newColumns)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, marginBottom: 8 }}>Income Statement by Sales Reps</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 14 }}>
          Analyze income statement performance by individual sales representatives
        </p>
      </div>

      {/* Filter Mode Toggle */}
      <div style={{ 
        display: 'flex', 
        gap: 8, 
        marginBottom: 24,
        background: 'var(--surface-alt)',
        padding: 4,
        borderRadius: '8px',
        width: 'fit-content'
      }}>
        <button
          onClick={() => setFilterMode('type1')}
          style={{
            padding: '8px 16px',
            background: filterMode === 'type1' ? 'var(--primary)' : 'transparent',
            color: filterMode === 'type1' ? '#051014' : 'var(--text)',
            border: 'none',
            borderRadius: '6px',
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Current Year Analysis
        </button>
        <button
          onClick={() => setFilterMode('type2')}
          style={{
            padding: '8px 16px',
            background: filterMode === 'type2' ? 'var(--primary)' : 'transparent',
            color: filterMode === 'type2' ? '#051014' : 'var(--text)',
            border: 'none',
            borderRadius: '6px',
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
        >
          Multi-Year Comparison
        </button>
      </div>

      {/* Filters */}
      {filterMode === 'type1' ? (
        <FilterType1
          year={year1}
          setYear={setYear1}
          period={period1}
          setPeriod={setPeriod1}
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
          quarter={quarter}
          setQuarter={setQuarter}
          month={month}
          setMonth={setMonth}
          report={report2}
          setReport={setReport2}
          onApply={applyFilter2}
        />
      )}

      {/* Results */}
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 200,
          color: 'var(--muted)'
        }}>
          Loading...
        </div>
      ) : (
        <MultiColumnTable 
          columns={columns} 
          label="Income Statement by Sales Reps" 
          showTotals={true}
        />
      )}
    </div>
  )
}

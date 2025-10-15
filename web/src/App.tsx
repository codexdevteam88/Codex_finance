import React from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import FinancialReport from './components/FinancialReport'
import Sales from './components/Sales'
import Reports from './components/Reports'
import IncomeStatementBySalesReps from './components/IncomeStatementBySalesReps'
import IncomeStatementByDepartments from './components/IncomeStatementByDepartments'

export default function App() {
  const [activePage, setActivePage] = React.useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'balance-sheet':
        return <FinancialReport reportType="BS" />
      case 'cash-flow':
        return <FinancialReport reportType="CF" />
      case 'sales':
        return <Sales />
      case 'reports':
        return <Reports />
      case 'income-statement-sales':
        return <IncomeStatementBySalesReps />
      case 'income-statement-depts':
        return <IncomeStatementByDepartments />
      default:
        return <Dashboard />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activeItem={activePage} onItemClick={setActivePage} />
      <div style={{ 
        flex: 1, 
        marginLeft: 280,
        background: 'var(--bg)',
        minHeight: '100vh'
      }}>
        {renderPage()}
      </div>
    </div>
  )
}

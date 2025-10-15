import React from 'react'

// صفحة شجرة الحسابات الاحترافية
export default function ChartOfAccounts() {
  const [expandedAccounts, setExpandedAccounts] = React.useState<Set<string>>(new Set(['1', '2', '3', '4', '5']))
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedAccount, setSelectedAccount] = React.useState<string | null>(null)

  // هيكل شجرة الحسابات الكاملة
  const chartOfAccounts = [
    {
      code: '1',
      name: 'Assets',
      icon: '🏦',
      color: 'var(--success)',
      children: [
        {
          code: '10',
          name: 'Current Assets',
          children: [
            { code: '1000', name: 'Cash & Bank', type: 'Asset', normalBalance: 'Debit' },
            { code: '1100', name: 'Accounts Receivable', type: 'Asset', normalBalance: 'Debit' },
            { code: '1200', name: 'Inventory', type: 'Asset', normalBalance: 'Debit' },
            { code: '1300', name: 'Prepaid Expenses', type: 'Asset', normalBalance: 'Debit' },
            { code: '1400', name: 'Short-term Investments', type: 'Asset', normalBalance: 'Debit' }
          ]
        },
        {
          code: '15',
          name: 'Fixed Assets',
          children: [
            { code: '1500', name: 'Land', type: 'Asset', normalBalance: 'Debit' },
            { code: '1510', name: 'Buildings', type: 'Asset', normalBalance: 'Debit' },
            { code: '1520', name: 'Equipment', type: 'Asset', normalBalance: 'Debit' },
            { code: '1530', name: 'Vehicles', type: 'Asset', normalBalance: 'Debit' },
            { code: '1540', name: 'Accumulated Depreciation', type: 'Asset', normalBalance: 'Credit' }
          ]
        },
        {
          code: '18',
          name: 'Other Assets',
          children: [
            { code: '1800', name: 'Intangible Assets', type: 'Asset', normalBalance: 'Debit' },
            { code: '1810', name: 'Goodwill', type: 'Asset', normalBalance: 'Debit' },
            { code: '1820', name: 'Long-term Investments', type: 'Asset', normalBalance: 'Debit' }
          ]
        }
      ]
    },
    {
      code: '2',
      name: 'Liabilities',
      icon: '⚖️',
      color: 'var(--danger)',
      children: [
        {
          code: '20',
          name: 'Current Liabilities',
          children: [
            { code: '2000', name: 'Accounts Payable', type: 'Liability', normalBalance: 'Credit' },
            { code: '2100', name: 'Short-term Loans', type: 'Liability', normalBalance: 'Credit' },
            { code: '2200', name: 'Accrued Expenses', type: 'Liability', normalBalance: 'Credit' },
            { code: '2300', name: 'Taxes Payable', type: 'Liability', normalBalance: 'Credit' },
            { code: '2400', name: 'Unearned Revenue', type: 'Liability', normalBalance: 'Credit' }
          ]
        },
        {
          code: '25',
          name: 'Long-term Liabilities',
          children: [
            { code: '2500', name: 'Long-term Loans', type: 'Liability', normalBalance: 'Credit' },
            { code: '2510', name: 'Bonds Payable', type: 'Liability', normalBalance: 'Credit' },
            { code: '2520', name: 'Mortgage Payable', type: 'Liability', normalBalance: 'Credit' }
          ]
        }
      ]
    },
    {
      code: '3',
      name: 'Equity',
      icon: '🏛️',
      color: 'var(--primary)',
      children: [
        {
          code: '30',
          name: 'Owner\'s Equity',
          children: [
            { code: '3000', name: 'Capital', type: 'Equity', normalBalance: 'Credit' },
            { code: '3100', name: 'Retained Earnings', type: 'Equity', normalBalance: 'Credit' },
            { code: '3200', name: 'Current Year Profit', type: 'Equity', normalBalance: 'Credit' }
          ]
        }
      ]
    },
    {
      code: '4',
      name: 'Revenue',
      icon: '💰',
      color: 'var(--success)',
      children: [
        {
          code: '40',
          name: 'Operating Revenue',
          children: [
            { code: '4000', name: 'Product Sales', type: 'Revenue', normalBalance: 'Credit' },
            { code: '4100', name: 'Service Fees', type: 'Revenue', normalBalance: 'Credit' },
            { code: '4200', name: 'Subscriptions', type: 'Revenue', normalBalance: 'Credit' },
            { code: '4300', name: 'Consulting Revenue', type: 'Revenue', normalBalance: 'Credit' }
          ]
        },
        {
          code: '45',
          name: 'Other Revenue',
          children: [
            { code: '4500', name: 'Interest Income', type: 'Revenue', normalBalance: 'Credit' },
            { code: '4510', name: 'Other Income', type: 'Revenue', normalBalance: 'Credit' }
          ]
        }
      ]
    },
    {
      code: '5',
      name: 'Expenses',
      icon: '📉',
      color: 'var(--danger)',
      children: [
        {
          code: '50',
          name: 'Cost of Goods Sold',
          children: [
            { code: '5000', name: 'Cost of Product Sales', type: 'Expense', normalBalance: 'Debit' },
            { code: '5100', name: 'Cost of Service Fees', type: 'Expense', normalBalance: 'Debit' },
            { code: '5200', name: 'Cost of Subscriptions', type: 'Expense', normalBalance: 'Debit' }
          ]
        },
        {
          code: '53',
          name: 'Staff Costs',
          children: [
            { code: '5300', name: 'Salaries', type: 'Expense', normalBalance: 'Debit' },
            { code: '5310', name: 'Leave Allowance', type: 'Expense', normalBalance: 'Debit' },
            { code: '5320', name: 'Overtime', type: 'Expense', normalBalance: 'Debit' },
            { code: '5330', name: 'Benefits & Insurance', type: 'Expense', normalBalance: 'Debit' }
          ]
        },
        {
          code: '54',
          name: 'Marketing & Advertising',
          children: [
            { code: '5400', name: 'Performance Ads', type: 'Expense', normalBalance: 'Debit' },
            { code: '5410', name: 'Creative & Content', type: 'Expense', normalBalance: 'Debit' },
            { code: '5420', name: 'Events & Sponsorship', type: 'Expense', normalBalance: 'Debit' }
          ]
        },
        {
          code: '55',
          name: 'Rent, Utilities & Operations',
          children: [
            { code: '5500', name: 'Rent', type: 'Expense', normalBalance: 'Debit' },
            { code: '5510', name: 'Utilities', type: 'Expense', normalBalance: 'Debit' },
            { code: '5520', name: 'IT & Subscriptions', type: 'Expense', normalBalance: 'Debit' },
            { code: '5530', name: 'Miscellaneous', type: 'Expense', normalBalance: 'Debit' }
          ]
        },
        {
          code: '56',
          name: 'Other Expenses',
          children: [
            { code: '5600', name: 'Interest Expense', type: 'Expense', normalBalance: 'Debit' },
            { code: '5610', name: 'Professional Fees', type: 'Expense', normalBalance: 'Debit' },
            { code: '5620', name: 'Insurance', type: 'Expense', normalBalance: 'Debit' },
            { code: '5630', name: 'Depreciation', type: 'Expense', normalBalance: 'Debit' }
          ]
        }
      ]
    }
  ]

  const toggleAccount = (accountCode: string) => {
    const newExpanded = new Set(expandedAccounts)
    if (newExpanded.has(accountCode)) {
      newExpanded.delete(accountCode)
    } else {
      newExpanded.add(accountCode)
    }
    setExpandedAccounts(newExpanded)
  }

  const renderAccount = (account: any, level = 0) => {
    const isExpanded = expandedAccounts.has(account.code)
    const hasChildren = account.children && account.children.length > 0
    const isSelected = selectedAccount === account.code

    return (
      <div key={account.code}>
        <div
          onClick={() => {
            if (hasChildren) {
              toggleAccount(account.code)
            } else {
              setSelectedAccount(account.code)
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 12px',
            margin: '2px 0',
            borderRadius: '6px',
            cursor: 'pointer',
            background: isSelected ? 'var(--primary)' : 'transparent',
            color: isSelected ? '#051014' : 'var(--text)',
            fontWeight: isSelected ? 'bold' : 'normal',
            transition: 'all 0.2s',
            paddingLeft: `${12 + level * 20}px`,
            border: isSelected ? '1px solid var(--primary)' : '1px solid transparent'
          }}
        >
          {hasChildren && (
            <span style={{ 
              fontSize: 12, 
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              marginRight: 8,
              color: account.color || 'var(--muted)'
            }}>
              ▶
            </span>
          )}
          {account.icon && (
            <span style={{ fontSize: 16, marginRight: 8 }}>{account.icon}</span>
          )}
          <span style={{ fontSize: 12, color: 'var(--muted)', marginRight: 8, minWidth: 60 }}>
            {account.code}
          </span>
          <span style={{ flex: 1, fontSize: 14 }}>{account.name}</span>
          {account.type && (
            <span style={{ 
              fontSize: 11, 
              padding: '2px 6px', 
              borderRadius: '4px',
              background: account.type === 'Asset' ? 'var(--success)' :
                         account.type === 'Liability' ? 'var(--danger)' :
                         account.type === 'Equity' ? 'var(--primary)' :
                         account.type === 'Revenue' ? 'var(--success)' :
                         'var(--danger)',
              color: '#051014',
              fontWeight: 'bold'
            }}>
              {account.type}
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {account.children.map((child: any) => renderAccount(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  const filteredAccounts = React.useMemo(() => {
    if (!searchTerm) return chartOfAccounts
    
    const filterAccounts = (accounts: any[]): any[] => {
      return accounts.filter(account => {
        const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            account.code.includes(searchTerm)
        
        if (account.children) {
          const filteredChildren = filterAccounts(account.children)
          if (filteredChildren.length > 0) {
            return { ...account, children: filteredChildren }
          }
        }
        
        return matchesSearch
      })
    }
    
    return filterAccounts(chartOfAccounts)
  }, [searchTerm])

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Chart of Accounts</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setExpandedAccounts(new Set(['1', '2', '3', '4', '5']))}
            style={{
              padding: '8px 16px',
              background: 'var(--primary)',
              color: '#051014',
              border: 'none',
              borderRadius: '6px',
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedAccounts(new Set())}
            style={{
              padding: '8px 16px',
              background: 'var(--surface-alt)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: 14,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          position: 'relative',
          background: 'var(--surface-alt)',
          borderRadius: '8px',
          border: '1px solid var(--border)',
          maxWidth: 400
        }}>
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text)',
              fontSize: 14,
              outline: 'none'
            }}
          />
          <span style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted)',
            fontSize: 14
          }}>
            🔍
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        {/* Chart of Accounts Tree */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 20 }}>Account Hierarchy</h3>
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {filteredAccounts.map(account => renderAccount(account))}
          </div>
        </div>

        {/* Account Details */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 20 }}>Account Details</h3>
          {selectedAccount ? (
            <div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Account Code</div>
                <div style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedAccount}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Account Name</div>
                <div style={{ fontSize: 14 }}>Selected Account Name</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Account Type</div>
                <div style={{ fontSize: 14 }}>Asset/Liability/Equity/Revenue/Expense</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Normal Balance</div>
                <div style={{ fontSize: 14 }}>Debit/Credit</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4 }}>Description</div>
                <div style={{ fontSize: 14, color: 'var(--muted)' }}>
                  This account is used to track...
                </div>
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--muted)', textAlign: 'center', padding: 40 }}>
              Select an account to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

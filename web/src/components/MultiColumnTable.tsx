import React from 'react'

// جدول متعدد الأعمدة لعرض البيانات المالية بطرق مختلفة
type Column = {
  key: string
  label: string
  data: Map<string, {amount: number, name: string}>
}

type Props = {
  columns: Column[]
  label: string
  showTotals?: boolean
}

function fmt(n: number) {
  return Number(n || 0).toLocaleString('en-US')
}

export default function MultiColumnTable({ columns, label, showTotals = true }: Props) {
  const [expandedGroups, setExpandedGroups] = React.useState<Set<string>>(new Set(['revenue', 'cogs', 'operating_expenses', 'staff_costs', 'marketing', 'rent_utilities', 'other_income']))

  // جمع جميع الحسابات من كل الأعمدة
  const allAccounts = React.useMemo(() => {
    const accounts = new Set<string>()
    columns.forEach(col => {
      col.data.forEach((_, acc) => {
        accounts.add(acc)
      })
    })
    return accounts
  }, [columns])

  const accountNames = React.useMemo(() => {
    const names = new Map<string, string>()
    columns.forEach(col => {
      col.data.forEach((data, acc) => {
        names.set(acc, data.name)
      })
    })
    return names
  }, [columns])

  // هيكل الحسابات الهرمي مثل الصورة
  const accountHierarchy = React.useMemo(() => {
    const hierarchy = [
      {
        id: 'revenue',
        name: 'Revenue',
        icon: '💰',
        color: 'var(--success)',
        accounts: [
          { code: '4000', name: 'Product Sales' },
          { code: '4100', name: 'Service Fees' },
          { code: '4200', name: 'Subscriptions' }
        ]
      },
      {
        id: 'cogs',
        name: 'Cost of Goods Sold',
        icon: '📦',
        color: 'var(--danger)',
        accounts: [
          { code: '5000', name: 'Cost of Product Sales' },
          { code: '5100', name: 'Cost of Service Fees' },
          { code: '5200', name: 'Cost of Subscriptions' }
        ]
      },
      {
        id: 'gross_profit',
        name: 'Gross Profit',
        icon: '📊',
        color: 'var(--primary)',
        isSummary: true,
        accounts: []
      },
      {
        id: 'operating_expenses',
        name: 'Operating Expenses',
        icon: '🏢',
        color: 'var(--warning)',
        subCategories: [
          {
            id: 'staff_costs',
            name: 'Staff Costs',
            accounts: [
              { code: '5300', name: 'Salaries' },
              { code: '5310', name: 'Leave Allowance' },
              { code: '5320', name: 'Overtime' },
              { code: '5330', name: 'Benefits & Insurance' }
            ]
          },
          {
            id: 'marketing',
            name: 'Marketing & Advertising',
            accounts: [
              { code: '5400', name: 'Performance Ads' },
              { code: '5410', name: 'Creative & Content' },
              { code: '5420', name: 'Events & Sponsorship' }
            ]
          },
          {
            id: 'rent_utilities',
            name: 'Rent, Utilities & Operations',
            accounts: [
              { code: '5500', name: 'Rent' },
              { code: '5510', name: 'Utilities' },
              { code: '5520', name: 'IT & Subscriptions' },
              { code: '5530', name: 'Miscellaneous' }
            ]
          }
        ]
      },
      {
        id: 'operating_profit',
        name: 'Operating Profit',
        icon: '📈',
        color: 'var(--primary)',
        isSummary: true,
        accounts: []
      },
      {
        id: 'other_income',
        name: 'Other Income / (Expense)',
        icon: '💼',
        color: 'var(--muted)',
        accounts: [
          { code: '5600', name: 'Interest Expense' },
          { code: '5700', name: 'Other Income' }
        ]
      },
      {
        id: 'net_profit',
        name: 'Net Profit',
        icon: '🎯',
        color: 'var(--success)',
        isSummary: true,
        accounts: []
      }
    ]

    return hierarchy
  }, [])

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups)
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId)
    } else {
      newExpanded.add(groupId)
    }
    setExpandedGroups(newExpanded)
  }

  // حساب إجمالي مجموعة الحسابات
  const calculateGroupTotal = (accountCodes: string[]) => {
    return columns.map(col => {
      let total = 0
      accountCodes.forEach(code => {
        const data = col.data.get(code)
        if (data) {
          total += data.amount
        }
      })
      return total
    })
  }

  // عرض الحسابات الفرعية
  const renderSubAccounts = (accounts: any[], level = 1) => {
    return accounts.map(account => (
      <tr key={account.code}>
        <td style={{ 
          position: 'sticky', 
          left: 0, 
          background: 'var(--surface)', 
          paddingLeft: `${16 + level * 20}px` 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--muted)' }}>•</span>
            <div>
              <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{account.code}</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{account.name}</div>
            </div>
          </div>
        </td>
        {columns.map(col => {
          const data = col.data.get(account.code)
          const value = data?.amount || 0
          return (
            <td
              key={col.key}
              style={{
                textAlign: 'left',
                color: value === 0 ? 'var(--muted)' : 'var(--text)'
              }}
            >
              {fmt(value)}
            </td>
          )
        })}
      </tr>
    ))
  }

  // حساب الإجماليات
  const totals = React.useMemo(() => {
    return columns.map(col => {
      let sum = 0
      col.data.forEach(data => {
        sum += data.amount
      })
      return sum
    })
  }, [columns])

  // Early return بعد جميع الـ hooks
  if (columns.length === 0) {
    return (
      <div className="card" style={{ padding: 20 }}>
        <div style={{ color: 'var(--muted)', textAlign: 'center' }}>
          No data to display
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div
          className="badge"
          style={{
            display: 'inline-block',
            background: 'var(--surface-alt)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '6px 12px',
            color: 'var(--muted)',
            fontSize: 14
          }}
        >
          📊 {label}
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              const allIds = new Set<string>()
              accountHierarchy.forEach(group => {
                if (!group.isSummary) allIds.add(group.id)
                if (group.subCategories) {
                  group.subCategories.forEach(sub => allIds.add(sub.id))
                }
              })
              setExpandedGroups(allIds)
            }}
            style={{
              padding: '6px 12px',
              background: 'var(--primary)',
              color: '#051014',
              border: 'none',
              borderRadius: '6px',
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Expand All
          </button>
          <button
            onClick={() => setExpandedGroups(new Set())}
            style={{
              padding: '6px 12px',
              background: 'var(--surface-alt)',
              color: 'var(--text)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ width: '100%', minWidth: 600 }}>
          <thead>
            <tr>
              <th style={{ position: 'sticky', left: 0, background: 'var(--surface-alt)', minWidth: 150 }}>
                Account
              </th>
              {columns.map(col => (
                <th key={col.key} style={{ minWidth: 120, textAlign: 'left' }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {accountHierarchy.map((group) => {
              const isGroupExpanded = expandedGroups.has(group.id)
              const accountCodes = group.accounts?.map(acc => acc.code) || []
              const groupTotals = calculateGroupTotal(accountCodes)

              return (
                <React.Fragment key={group.id}>
                  {/* Main Group Header */}
                  <tr style={{ 
                    background: group.isSummary ? 'var(--surface-alt)' : 'var(--surface-alt)', 
                    fontWeight: 'bold',
                    borderTop: group.isSummary ? '2px solid var(--border)' : 'none'
                  }}>
                    <td 
                      style={{ 
                        position: 'sticky', 
                        left: 0, 
                        background: 'var(--surface-alt)',
                        cursor: group.isSummary ? 'default' : 'pointer',
                        paddingLeft: 16
                      }}
                      onClick={() => !group.isSummary && toggleGroup(group.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {!group.isSummary && (
                          <span style={{ 
                            fontSize: 12, 
                            transform: isGroupExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s',
                            color: group.color
                          }}>
                            ▶
                          </span>
                        )}
                        <span style={{ fontSize: 16, marginRight: 8 }}>{group.icon}</span>
                        <span style={{ fontSize: 14, fontWeight: 'bold', color: group.color }}>
                          {group.name}
                        </span>
                        {!group.isSummary && (
                          <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                            ({accountCodes.length} accounts)
                          </span>
                        )}
                      </div>
                    </td>
                    {groupTotals.map((total, idx) => (
                      <td key={columns[idx].key} style={{ 
                        textAlign: 'left', 
                        fontWeight: 'bold', 
                        color: group.color 
                      }}>
                        {fmt(total)}
                      </td>
                    ))}
                  </tr>

                  {/* Sub Accounts */}
                  {isGroupExpanded && group.accounts && renderSubAccounts(group.accounts)}

                  {/* Sub Categories (for Operating Expenses) */}
                  {isGroupExpanded && group.subCategories && group.subCategories.map(subCategory => {
                    const isSubExpanded = expandedGroups.has(subCategory.id)
                    const subAccountCodes = subCategory.accounts.map(acc => acc.code)
                    const subTotals = calculateGroupTotal(subAccountCodes)

                    return (
                      <React.Fragment key={subCategory.id}>
                        {/* Sub Category Header */}
                        <tr style={{ background: 'var(--surface)', fontWeight: 'bold' }}>
                          <td 
                            style={{ 
                              position: 'sticky', 
                              left: 0, 
                              background: 'var(--surface)',
                              cursor: 'pointer',
                              paddingLeft: 36
                            }}
                            onClick={() => toggleGroup(subCategory.id)}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ 
                                fontSize: 12, 
                                transform: isSubExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                                color: 'var(--warning)'
                              }}>
                                ▶
                              </span>
                              <span style={{ fontSize: 14, fontWeight: 'bold' }}>
                                {subCategory.name}
                              </span>
                              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                                ({subAccountCodes.length} accounts)
                              </span>
                            </div>
                          </td>
                          {subTotals.map((total, idx) => (
                            <td key={columns[idx].key} style={{ 
                              textAlign: 'left', 
                              fontWeight: 'bold', 
                              color: 'var(--warning)' 
                            }}>
                              {fmt(total)}
                            </td>
                          ))}
                        </tr>

                        {/* Sub Category Accounts */}
                        {isSubExpanded && renderSubAccounts(subCategory.accounts, 2)}
                      </React.Fragment>
                    )
                  })}
                </React.Fragment>
              )
            })}

            {/* Total row */}
            {showTotals && (
              <tr style={{ borderTop: '2px solid var(--border)', fontWeight: 'bold', background: 'var(--surface-alt)' }}>
                <td style={{ position: 'sticky', left: 0, background: 'var(--surface-alt)', paddingLeft: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 'bold' }}>TOTAL</div>
                </td>
                {totals.map((total, idx) => (
                  <td
                    key={columns[idx].key}
                    style={{
                      textAlign: 'left',
                      color: total >= 0 ? 'var(--success)' : 'var(--danger)',
                      fontSize: 16,
                      fontWeight: 'bold'
                    }}
                  >
                    {fmt(total)}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}


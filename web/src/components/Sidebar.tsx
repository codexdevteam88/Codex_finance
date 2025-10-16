import React from 'react'

// Navbar Component
type NavItem = {
  id: string
  label: string
  icon: string
  children?: NavItem[]
}

type Props = {
  activeItem: string
  onItemClick: (itemId: string) => void
}

const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊'
  },
        {
          id: 'financials',
          label: 'Financials',
          icon: '🏛️',
          children: [
            { id: 'balance-sheet', label: 'Balance Sheet', icon: '⚖️' },
            { 
              id: 'income-statement', 
              label: 'Income Statement', 
              icon: '📄',
              children: [
                { id: 'income-statement', label: 'Income Statement', icon: '📄' },
                { id: 'income-statement-sales', label: 'Income Statement by Sales Reps', icon: '👥' },
                { id: 'income-statement-depts', label: 'Income Statement by Departments', icon: '🏢' }
              ]
            },
            { id: 'cash-flow', label: 'Cash Flow', icon: '💰' }
          ]
        },
  {
    id: 'sales',
    label: 'Sales',
    icon: '📈'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📋'
  },
        {
          id: 'chart-of-accounts',
          label: 'Chart of Accounts',
          icon: '🌳'
        },
]

export default function Sidebar({ activeItem, onItemClick }: Props) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set(['financials', 'income-statement']))

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = activeItem === item.id
    const isExpanded = expandedItems.has(item.id)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <div
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id)
            } else {
              onItemClick(item.id)
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            margin: '2px 8px',
            borderRadius: '8px',
            cursor: 'pointer',
            background: isActive ? 'var(--primary)' : 'transparent',
            color: isActive ? '#051014' : 'var(--text)',
            fontWeight: isActive ? 'bold' : 'normal',
            transition: 'all 0.2s',
            paddingLeft: `${16 + level * 20}px`
          }}
        >
          <span style={{ marginRight: 12, fontSize: 16 }}>{item.icon}</span>
          <span style={{ flex: 1 }}>{item.label}</span>
          {hasChildren && (
            <span style={{ fontSize: 12, transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
              ▼
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{
      width: 280,
      height: '100vh',
      background: 'var(--surface)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 1000
    }}>
      {/* Header */}
      <div style={{
        padding: 20,
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--primary2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          color: '#051014'
        }}>
          DT
        </div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 'bold', color: 'var(--text)' }}>
            DEVELOPMENT TEAM
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>
            Administrator
          </div>
        </div>
        <div style={{ marginLeft: 'auto', cursor: 'pointer', color: 'var(--muted)' }}>
          ▼
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: 16 }}>
        <div style={{
          position: 'relative',
          background: 'var(--surface-alt)',
          borderRadius: '8px',
          border: '1px solid var(--border)'
        }}>
          <input
            type="text"
            placeholder="Search..."
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

      {/* Navigation */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            marginBottom: 8
          }}>
            Overview
          </div>
          {renderNavItem(navItems[0])}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            marginBottom: 8
          }}>
            Financials
          </div>
          {renderNavItem(navItems[1])}
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'var(--muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '8px 16px',
            marginBottom: 8
          }}>
            Applications
          </div>
          {navItems.slice(2).map(item => renderNavItem(item))}
        </div>
      </div>
    </div>
  )
}

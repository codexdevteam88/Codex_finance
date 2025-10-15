import React from 'react'

export default function Sales() {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24, fontSize: 28, fontWeight: 'bold' }}>Sales Dashboard</h1>
      
      {/* Sales Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>💰</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Total Sales</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--success)', marginBottom: 8 }}>
            $1,250,000
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            +8.2% from last month
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>📦</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Orders</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary)', marginBottom: 8 }}>
            1,247
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            +15 new today
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>👥</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>New Customers</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--primary2)', marginBottom: 8 }}>
            89
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            This month
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 24, marginRight: 12 }}>📊</div>
            <h3 style={{ margin: 0, fontSize: 18 }}>Conversion Rate</h3>
          </div>
          <div style={{ fontSize: 32, fontWeight: 'bold', color: 'var(--warning)', marginBottom: 8 }}>
            3.2%
          </div>
          <div style={{ fontSize: 14, color: 'var(--muted)' }}>
            +0.3% improvement
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Sales Trend</h3>
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
            📈 Sales Chart
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ marginBottom: 20 }}>Top Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { name: 'Product A', sales: '$125,000', growth: '+12%' },
              { name: 'Product B', sales: '$98,000', growth: '+8%' },
              { name: 'Product C', sales: '$87,000', growth: '+15%' },
              { name: 'Product D', sales: '$76,000', growth: '+5%' },
              { name: 'Product E', sales: '$65,000', growth: '+22%' }
            ].map((product, idx) => (
              <div key={idx} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '12px 0',
                borderBottom: idx < 4 ? '1px solid var(--border)' : 'none'
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{product.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)' }}>{product.sales}</div>
                </div>
                <div style={{ 
                  fontSize: 12, 
                  color: 'var(--success)', 
                  fontWeight: 'bold' 
                }}>
                  {product.growth}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ marginBottom: 20 }}>Recent Sales</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#12345', customer: 'John Smith', product: 'Product A', amount: '$1,250', status: 'Completed', date: '2025-01-15' },
                { id: '#12346', customer: 'Sarah Johnson', product: 'Product B', amount: '$890', status: 'Processing', date: '2025-01-15' },
                { id: '#12347', customer: 'Mike Wilson', product: 'Product C', amount: '$2,100', status: 'Shipped', date: '2025-01-14' },
                { id: '#12348', customer: 'Lisa Brown', product: 'Product A', amount: '$750', status: 'Completed', date: '2025-01-14' },
                { id: '#12349', customer: 'David Lee', product: 'Product D', amount: '$1,500', status: 'Pending', date: '2025-01-13' }
              ].map((sale, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 500 }}>{sale.id}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.product}</td>
                  <td style={{ fontWeight: 500 }}>{sale.amount}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: 12,
                      fontWeight: 500,
                      background: sale.status === 'Completed' ? 'var(--success)' : 
                                 sale.status === 'Processing' ? 'var(--warning)' :
                                 sale.status === 'Shipped' ? 'var(--primary2)' : 'var(--muted)',
                      color: sale.status === 'Pending' ? 'var(--text)' : '#051014'
                    }}>
                      {sale.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)' }}>{sale.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

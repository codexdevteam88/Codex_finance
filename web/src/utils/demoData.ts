// بيانات تجريبية للنظام المالي
// يمكن استخدامها بدون Firebase لتجربة النظام

export type DemoRecord = {
  account_code: string
  account_name: string
  amount: number
  report_type: 'IS' | 'BS' | 'CF'
  year: number
  month?: number
  quarter?: number
}

// بيانات المناديب
export const salesReps = [
  { id: 'ahmed', name: 'Ahmed Mohamed', code: 'SR001' },
  { id: 'fatima', name: 'Fatima Ali', code: 'SR002' },
  { id: 'mohamed', name: 'Mohamed Hassan', code: 'SR003' },
  { id: 'sara', name: 'Sara Ahmed', code: 'SR004' },
  { id: 'omar', name: 'Omar Khalil', code: 'SR005' }
]

// بيانات الأقسام
export const departments = [
  { id: 'sales', name: 'Sales Department', code: 'DEPT001' },
  { id: 'marketing', name: 'Marketing Department', code: 'DEPT002' },
  { id: 'production', name: 'Production Department', code: 'DEPT003' },
  { id: 'hr', name: 'Human Resources', code: 'DEPT004' },
  { id: 'finance', name: 'Finance Department', code: 'DEPT005' },
  { id: 'it', name: 'IT Department', code: 'DEPT006' }
]

// تحديد المندوب لكل حساب
export function getSalesRepForAccount(accountCode: string): string {
  const code = parseInt(accountCode)
  const reps = ['ahmed', 'fatima', 'mohamed', 'sara', 'omar']
  return reps[code % reps.length]
}

// تحديد القسم لكل حساب
export function getDepartmentForAccount(accountCode: string): string {
  const code = parseInt(accountCode)
  
  // Revenue accounts -> Sales Department
  if (code >= 4000 && code < 5000) return 'sales'
  
  // Cost of goods sold -> Production Department
  if (code >= 5000 && code < 5100) return 'production'
  
  // Staff costs -> HR Department
  if (code >= 5300 && code < 5340) return 'hr'
  
  // Marketing expenses -> Marketing Department
  if (code >= 5400 && code < 5430) return 'marketing'
  
  // IT & Subscriptions -> IT Department
  if (code >= 5520 && code < 5530) return 'it'
  
  // Other expenses -> Finance Department
  return 'finance'
}
const incomeAccounts = [
  // Revenue
  { code: '4000', name: 'Product Sales', range: [80000, 120000] },
  { code: '4100', name: 'Service Fees', range: [30000, 50000] },
  { code: '4200', name: 'Subscriptions', range: [15000, 25000] },
  
  // Cost of Goods Sold
  { code: '5000', name: 'Cost of Product Sales', range: [-40000, -30000] },
  { code: '5100', name: 'Cost of Service Fees', range: [-20000, -15000] },
  { code: '5200', name: 'Cost of Subscriptions', range: [-8000, -5000] },
  
  // Staff Costs
  { code: '5300', name: 'Salaries', range: [-35000, -25000] },
  { code: '5310', name: 'Leave Allowance', range: [-5000, -3000] },
  { code: '5320', name: 'Overtime', range: [-3000, -2000] },
  { code: '5330', name: 'Benefits & Insurance', range: [-8000, -5000] },
  
  // Marketing & Advertising
  { code: '5400', name: 'Performance Ads', range: [-12000, -8000] },
  { code: '5410', name: 'Creative & Content', range: [-6000, -4000] },
  { code: '5420', name: 'Events & Sponsorship', range: [-4000, -2000] },
  
  // Rent, Utilities & Operations
  { code: '5500', name: 'Rent', range: [-15000, -12000] },
  { code: '5510', name: 'Utilities', range: [-3000, -2000] },
  { code: '5520', name: 'IT & Subscriptions', range: [-5000, -3000] },
  { code: '5530', name: 'Miscellaneous', range: [-2000, -1000] },
  
  // Other Income / Expense
  { code: '5600', name: 'Interest Expense', range: [-2000, -1000] },
  { code: '5700', name: 'Other Income', range: [3000, 5000] },
]

// حسابات الميزانية (Balance Sheet)
const balanceAccounts = [
  { code: '1000', name: 'Cash & Bank', range: [150000, 250000] },
  { code: '1100', name: 'Accounts Receivable', range: [80000, 120000] },
  { code: '1200', name: 'Inventory', range: [100000, 150000] },
  { code: '1300', name: 'Fixed Assets', range: [500000, 600000] },
  { code: '2000', name: 'Accounts Payable', range: [-60000, -40000] },
  { code: '2100', name: 'Short-term Loans', range: [-100000, -80000] },
  { code: '2200', name: 'Long-term Loans', range: [-300000, -250000] },
  { code: '3000', name: 'Equity Capital', range: [400000, 500000] },
]

// حسابات التدفقات النقدية (Cash Flow)
const cashFlowAccounts = [
  { code: '6000', name: 'Operating Cash Flow', range: [40000, 60000] },
  { code: '6100', name: 'Investing Cash Flow', range: [-30000, -10000] },
  { code: '6200', name: 'Financing Cash Flow', range: [-20000, 10000] },
]

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateMonthlyData(
  accountCode: string,
  accountName: string,
  reportType: 'IS' | 'BS' | 'CF',
  year: number,
  baseRange: [number, number]
): DemoRecord[] {
  const records: DemoRecord[] = []
  const [min, max] = baseRange
  
  for (let month = 1; month <= 12; month++) {
    // إضافة تباين موسمي (الربع الرابع عادة أعلى)
    const seasonalFactor = month >= 10 ? 1.2 : month <= 3 ? 0.9 : 1.0
    const amount = randomInRange(
      Math.floor(min * seasonalFactor),
      Math.floor(max * seasonalFactor)
    )
    
    records.push({
      account_code: accountCode,
      account_name: accountName,
      amount,
      report_type: reportType,
      year,
      month,
      quarter: Math.ceil(month / 3) as 1 | 2 | 3 | 4
    })
  }
  
  return records
}

export function generateDemoData(years: number[] = [2023, 2024, 2025]): DemoRecord[] {
  const allRecords: DemoRecord[] = []
  
  for (const year of years) {
    // إضافة نمو سنوي (كل سنة أعلى من السابقة)
    const yearGrowth = (year - 2023) * 0.1 + 1 // 10% نمو سنوياً
    
    // قائمة الدخل
    incomeAccounts.forEach(acc => {
      const adjustedRange: [number, number] = [
        Math.floor(acc.range[0] * yearGrowth),
        Math.floor(acc.range[1] * yearGrowth)
      ]
      allRecords.push(...generateMonthlyData(acc.code, acc.name, 'IS', year, adjustedRange))
    })
    
    // الميزانية
    balanceAccounts.forEach(acc => {
      const adjustedRange: [number, number] = [
        Math.floor(acc.range[0] * yearGrowth),
        Math.floor(acc.range[1] * yearGrowth)
      ]
      allRecords.push(...generateMonthlyData(acc.code, acc.name, 'BS', year, adjustedRange))
    })
    
    // التدفقات النقدية
    cashFlowAccounts.forEach(acc => {
      const adjustedRange: [number, number] = [
        Math.floor(acc.range[0] * yearGrowth),
        Math.floor(acc.range[1] * yearGrowth)
      ]
      allRecords.push(...generateMonthlyData(acc.code, acc.name, 'CF', year, adjustedRange))
    })
  }
  
  return allRecords
}

// دالة لتحويل البيانات إلى الشكل المطلوب للـ views
export function buildMonthlyView(demoData: DemoRecord[], reportType: 'IS' | 'BS' | 'CF', year: number) {
  const filtered = demoData.filter(r => r.report_type === reportType && r.year === year && r.month)
  const grouped = new Map<string, {amount: number, name: string}>()
  
  filtered.forEach(r => {
    const key = `${r.year}_${r.month}_${r.account_code}`
    const existing = grouped.get(key)
    grouped.set(key, {
      amount: (existing?.amount || 0) + r.amount,
      name: r.account_name
    })
  })
  
  return Array.from(grouped.entries()).map(([key, data]) => {
    const [y, m, code] = key.split('_')
    return {
      report_type: reportType,
      year: Number(y),
      month: Number(m),
      account_code: code,
      account_name: data.name,
      amount: data.amount
    }
  })
}

export function buildQuarterlyView(demoData: DemoRecord[], reportType: 'IS' | 'BS' | 'CF', year: number) {
  const filtered = demoData.filter(r => r.report_type === reportType && r.year === year)
  const grouped = new Map<string, {amount: number, name: string}>()
  
  filtered.forEach(r => {
    const quarter = r.quarter || Math.ceil((r.month || 1) / 3)
    const key = `${r.year}_${quarter}_${r.account_code}`
    const existing = grouped.get(key)
    grouped.set(key, {
      amount: (existing?.amount || 0) + r.amount,
      name: r.account_name
    })
  })
  
  return Array.from(grouped.entries()).map(([key, data]) => {
    const [y, q, code] = key.split('_')
    return {
      report_type: reportType,
      year: Number(y),
      quarter: Number(q),
      account_code: code,
      account_name: data.name,
      amount: data.amount
    }
  })
}

export function buildYearlyView(demoData: DemoRecord[], reportType: 'IS' | 'BS' | 'CF', year: number) {
  const filtered = demoData.filter(r => r.report_type === reportType && r.year === year)
  const grouped = new Map<string, {amount: number, name: string}>()
  
  filtered.forEach(r => {
    const key = `${r.year}_${r.account_code}`
    const existing = grouped.get(key)
    grouped.set(key, {
      amount: (existing?.amount || 0) + r.amount,
      name: r.account_name
    })
  })
  
  return Array.from(grouped.entries()).map(([key, data]) => {
    const [y, code] = key.split('_')
    return {
      report_type: reportType,
      year: Number(y),
      account_code: code,
      account_name: data.name,
      amount: data.amount
    }
  })
}


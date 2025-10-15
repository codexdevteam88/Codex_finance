import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'
import { firebaseConfig } from '../firebaseConfig'
import { generateDemoData, buildMonthlyView, buildQuarterlyView, buildYearlyView } from '../utils/demoData'

// تفعيل وضع Demo (بيانات تجريبية بدون Firebase)
const DEMO_MODE = true

let app: any
let db: any

if (!DEMO_MODE) {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
}

// تخزين البيانات التجريبية في الذاكرة
let demoDataCache: any[] | null = null

function getDemoData() {
  if (!demoDataCache) {
    demoDataCache = generateDemoData([2023, 2024, 2025])
  }
  return demoDataCache
}

type FilterMap = Record<string, any>

export async function fetchAll(colName: string, filters: FilterMap) {
  // إذا كان وضع Demo مفعل، استخدم البيانات التجريبية
  if (DEMO_MODE) {
    const demoData = getDemoData()
    const { report_type, year, month, quarter } = filters
    
    if (colName === 'mv_monthly') {
      const monthlyData = buildMonthlyView(demoData, report_type, year)
      let filtered = monthlyData
      
      if (month !== undefined) {
        if (Array.isArray(month)) {
          filtered = monthlyData.filter(r => month.includes(r.month))
        } else {
          filtered = monthlyData.filter(r => r.month === month)
        }
      }
      
      return filtered
    }
    
    if (colName === 'mv_quarterly') {
      const quarterlyData = buildQuarterlyView(demoData, report_type, year)
      let filtered = quarterlyData
      
      if (quarter !== undefined) {
        filtered = quarterlyData.filter(r => r.quarter === quarter)
      }
      
      return filtered
    }
    
    if (colName === 'mv_yearly') {
      return buildYearlyView(demoData, report_type, year)
    }
    
    return []
  }
  
  // الكود الأصلي للـ Firebase
  let qref = collection(db, colName)
  const clauses: any[] = []
  for (const [k, v] of Object.entries(filters)) {
    if (Array.isArray(v)) {
      if (k === 'month') clauses.push(where(k, 'in', v))
    } else {
      clauses.push(where(k, '==', v))
    }
  }
  const snap = await getDocs(query(qref, ...clauses))
  return snap.docs.map(d => d.data() as any)
}

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
const db = admin.firestore();

type ReportType = "IS" | "BS" | "CF";

function quarterOfMonth(m: number){ return Math.ceil(m/3); }

export const rebuildViews = functions.https.onCall(async (data, context) => {
  const year = Number(data?.year || new Date().getFullYear());
  const types: ReportType[] = ["IS","BS","CF"];
  for (const t of types){
    await buildMonthly(t, year);
    await buildQuarterly(t, year);
    await buildYearly(t, year);
  }
  return { ok: true, year };
});

async function buildMonthly(reportType: ReportType, year: number){
  const snap = await db.collection("fact_ledgers")
    .where("report_type","==",reportType).where("year","==",year).get();

  const buckets = new Map<string, number>();
  snap.forEach(doc => {
    const r = doc.data() as any;
    const key = `${r.year}|${r.month}|${r.account_code}`;
    buckets.set(key, (buckets.get(key) || 0) + Number(r.amount || 0));
  });

  const batch = db.batch();
  for (const [key, sum] of buckets){
    const [y, m, acc] = key.split("|");
    const ref = db.collection("mv_monthly").doc(`${reportType}_${y}_${m}_${acc}`);
    batch.set(ref, {
      report_type: reportType,
      year: Number(y),
      month: Number(m),
      account_code: acc,
      amount: sum
    }, { merge: true });
  }
  await batch.commit();
}

async function buildQuarterly(reportType: ReportType, year: number){
  const snap = await db.collection("fact_ledgers")
    .where("report_type","==",reportType).where("year","==",year).get();

  const buckets = new Map<string, number>();
  snap.forEach(doc => {
    const r = doc.data() as any;
    const q = Number(r.quarter) || quarterOfMonth(Number(r.month || 1));
    const key = `${r.year}|${q}|${r.account_code}`;
    buckets.set(key, (buckets.get(key) || 0) + Number(r.amount || 0));
  });

  const batch = db.batch();
  for (const [key, sum] of buckets){
    const [y, q, acc] = key.split("|");
    const ref = db.collection("mv_quarterly").doc(`${reportType}_${y}_Q${q}_${acc}`);
    batch.set(ref, {
      report_type: reportType,
      year: Number(y),
      quarter: Number(q),
      account_code: acc,
      amount: sum
    }, { merge: true });
  }
  await batch.commit();
}

async function buildYearly(reportType: ReportType, year: number){
  const snap = await db.collection("fact_ledgers")
    .where("report_type","==",reportType).where("year","==",year).get();

  const buckets = new Map<string, number>();
  snap.forEach(doc => {
    const r = doc.data() as any;
    const key = `${r.year}|${r.account_code}`;
    buckets.set(key, (buckets.get(key) || 0) + Number(r.amount || 0));
  });

  const batch = db.batch();
  for (const [key, sum] of buckets){
    const [y, acc] = key.split("|");
    const ref = db.collection("mv_yearly").doc(`${reportType}_${y}_${acc}`);
    batch.set(ref, {
      report_type: reportType,
      year: Number(y),
      account_code: acc,
      amount: sum
    }, { merge: true });
  }
  await batch.commit();
}

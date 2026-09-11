// LOCAL DEMO DATA ONLY — no external system is contacted anywhere in V1.
// Replace these exports with real data-fetching adapters when integrations land.

import type {
  AIAnalysis,
  Assessment,
  ClinicalDocument,
  ClinicalSummary,
  DecisionSupportAlert,
  Doctor,
  MedicalRecord,
  MissingItem,
  Patient,
  TimelineEvent,
} from "@/types/clinical";

export const currentDoctor: Doctor = {
  id: "doc-meera",
  name: "Dr. Meera Sharma",
  department: "General Medicine",
};

export const demoPatients: Patient[] = [
  {
    id: "TH-01452",
    name: "Rahul Kumar",
    age: 42,
    gender: "Male",
    language: "Telugu",
    visitDate: "07 Sep 2026",
    triage: "moderate",
    complaint: "Fever & Cough (3 days)",
    assignment: { kind: "active", doctorName: "Dr. M. Sharma (You)" },
  },
  {
    id: "TH-01453",
    name: "Suresh Patel",
    age: 55,
    gender: "Male",
    language: "Gujarati",
    visitDate: "07 Sep 2026",
    triage: "high",
    complaint: "Chest Pain & Breathlessness",
    assignment: { kind: "locked", doctorName: "Dr. A. Desai", note: "Returning" },
  },
  {
    id: "TH-01454",
    name: "Anjali Desai",
    age: 28,
    gender: "Female",
    language: "Telugu",
    visitDate: "07 Sep 2026",
    triage: "routine",
    complaint: "Routine consultation",
    assignment: { kind: "assigned", doctorName: "Dr. K. Reddy" },
  },
];

export const demoAIAnalysis: AIAnalysis = {
  percent: 75,
  processed: 9,
  total: 12,
  sections: [
    { label: "Personal Information", status: "completed" },
    { label: "Current Complaint", status: "completed" },
    { label: "Past Medical History", status: "completed" },
    { label: "Current Medications", status: "completed" },
    { label: "Previous Documents", status: "completed" },
    { label: "Symptoms", status: "completed" },
    { label: "Allergy History", status: "incomplete" },
    { label: "Family History", status: "incomplete" },
    { label: "Previous Surgery", status: "incomplete" },
  ],
};

export const demoMissing: MissingItem[] = [
  { label: "Allergy History", reason: "Not provided by patient" },
  { label: "Family History", reason: "Not provided by patient" },
  { label: "Previous Surgery", reason: "Not provided by patient" },
];

export const demoSummary: ClinicalSummary = {
  chiefComplaint: "Fever and cough for 3 days",
  pastMedicalHistory: "Diabetes (Type 2)",
  currentMedication: "Metformin 500mg",
  allergies: "Information unavailable",
};

export const ayushSummary: ClinicalSummary = {
  chiefComplaint: "Jeerna Jwara & Kasa (3 Days)",
  pastMedicalHistory: "Madhumeha",
  currentMedication: "Vata-Pitta Shamak & Guduchi Vati",
  allergies: "Information unavailable",
};

export const demoAlerts: DecisionSupportAlert[] = [
  {
    id: "a1",
    kind: "urgent",
    title: "URGENT REVIEW",
    detail: "Fever duration exceeds 72 hours",
  },
  {
    id: "a2",
    kind: "verify",
    title: "VERIFY",
    detail: "Confirm dosage of diabetes medication",
  },
  {
    id: "a3",
    kind: "info",
    title: "ABHA SYNC",
    detail: "Longitudinal past records successfully attached",
  },
];

export const demoVerifiedRecords: MedicalRecord[] = [
  {
    id: "r1",
    title: "Diabetes (Type 2)",
    detail: "Physician verified on Jul 12, 2026",
    status: "Verified",
  },
  {
    id: "r2",
    title: "Metformin 500mg",
    detail: "Long-term maintenance dose",
    status: "Verified",
  },
];

export const ayushVerifiedRecords: MedicalRecord[] = [
  {
    id: "r1",
    title: "Madhumeha",
    detail: "Physician verified on Jul 12, 2026",
    status: "Verified",
  },
  {
    id: "r2",
    title: "Guduchi / Triphala Churna",
    detail: "Long-term maintenance regimen",
    status: "Verified",
  },
];

export const demoDocuments: ClinicalDocument[] = [
  {
    id: "d1",
    fileName: "Previous_Lab_Report.pdf",
    type: "pdf",
    note: "Demo document entry — OCR not performed in V1",
  },
];

export const demoTimeline: TimelineEvent[] = [
  {
    id: "t1",
    date: "Sep 07, 2026",
    doctorName: "Dr. Meera Sharma (You)",
    lines: ["Fever & cough", "Pending diagnosis"],
    current: true,
    assessment: "Consultation in progress. Assessment not yet finalised.",
  },
  {
    id: "t2",
    date: "Jul 12, 2026",
    doctorName: "Dr. A. Desai",
    lines: ["Type 2 Diabetes", "Metformin prescribed"],
    current: false,
    assessment:
      "Type 2 Diabetes Mellitus confirmed on fasting glucose and HbA1c. Started on Metformin 500mg once daily with dietary counselling. Review in 3 months.",
  },
  {
    id: "t3",
    date: "Mar 04, 2026",
    doctorName: "Dr. C. Reddy",
    lines: ["Routine consultation"],
    current: false,
    assessment:
      "Routine general check-up. Vitals within normal limits. No acute complaints recorded. Advised annual screening.",
  },
];

export const demoAssessment: Assessment = {
  diagnosis:
    "Suspected Viral Fever. Patient is stable. Continue diabetes medication.",
  medicines: "Tab Paracetamol 650mg (SOS)\nCough Syrup (10ml BD)",
  investigations: "Complete Blood Count (CBC)\nDengue NS1 Antigen Test",
};

export const demoTranscript = {
  spoken:
    "నమస్కారం డాక్టర్ గారు. నాకు గత మూడు రోజుల నుంచి బాగా జ్వరంగా ఉంది. మరియు దగ్గు కూడా ఉంది.",
  translated:
    "Hello Doctor. Patient reports acute fever and persistent cough for the past 3 days.",
};

export const patientViewContent = {
  complaint: "తీవ్రమైన జ్వరం మరియు దగ్గు (3 రోజుల నుండి)",
  history: "మధుమేహం (షుగర్ వ్యాధి)",
  medication: "మెట్‌ఫార్మిన్ (షుగర్ బిళ్లలు)",
};

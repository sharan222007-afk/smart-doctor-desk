// Domain model for AI Patient Assistant — Doctor Dashboard V1.
// All data is local demo data. Shapes are kept backend-agnostic so a real
// data source (e.g. Supabase) can be wired in later without UI changes.

export type TriageLevel = "routine" | "moderate" | "high";

export type QueueAssignment =
  | { kind: "unassigned" }
  | { kind: "active"; doctorName: string }
  | { kind: "locked"; doctorName: string; note?: string }
  | { kind: "assigned"; doctorName: string };
  
export interface Doctor {
  id: string;
  name: string;
  department: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  language: string;
  visitDate: string;
  triage: TriageLevel;
  complaint: string;
  assignment: QueueAssignment;
}

export interface AIAnalysisSection {
  label: string;
  status: "completed" | "incomplete";
}

export interface AIAnalysis {
  percent: number;
  processed: number;
  total: number;
  sections: AIAnalysisSection[];
}

export interface MissingItem {
  label: string;
  reason: string;
}

export interface ClinicalSummary {
  chiefComplaint: string;
  pastMedicalHistory: string;
  currentMedication: string;
  allergies: string;
}

export type AlertKind = "urgent" | "verify" | "info";

export interface DecisionSupportAlert {
  id: string;
  kind: AlertKind;
  title: string;
  detail: string;
}

export interface MedicalRecord {
  id: string;
  title: string;
  detail: string;
  status: "Verified";
}

export interface ClinicalDocument {
  id: string;
  fileName: string;
  type: "pdf";
  note: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  doctorName: string;
  lines: string[];
  current: boolean;
  assessment: string;
}

export type CaseRoutingStatus = "awaiting-lab" | "complete";

export interface Assessment {
  diagnosis: string;
  medicines: string;
  investigations: string;
}

export interface Visit {
  patientId: string;
  newComplaint: string;
  documents: ClinicalDocument[];
  timeline: TimelineEvent[];
  assessment: Assessment;
  routing: CaseRoutingStatus;
}

export type DashboardMode = "allopathy" | "ayush" | "patient";

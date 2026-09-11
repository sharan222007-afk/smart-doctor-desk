import type { Patient, Doctor } from "@/types/clinical";

export type StaffRole =
  | "Reception"
  | "Registration"
  | "Medical Records"
  | "Digitization Operator"
  | "Nurse"
  | "Administrator";

export interface HealthCentre {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "Active";
}

export interface ClinovaDoctor extends Doctor {
  qualification: string;
  specialization: string;
  registrationNumber: string;
  mobile: string;
  email: string;
  language: string;
  status: "Active" | "Inactive";
  healthCentreId: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: StaffRole;
  mobile: string;
  email: string;
  status: "Active" | "Inactive";
  healthCentreId: string;
}

export interface ClinovaPatient extends Patient {
  mobile: string;
  healthCentreId: string;
  assignedDoctorId: string;
  currentComplaint: string;
  history: string;
  allergies: string;
  familyHistory: string;
  previousSurgery: string;
  verification: "pending" | "verified";
  historyCompleted: boolean;
  documents: string[];
}

const STORAGE_KEY = "clinova-v1";

export interface ClinovaStore {
  healthCentre: HealthCentre;
  doctors: ClinovaDoctor[];
  staff: StaffMember[];
  patients: ClinovaPatient[];
  activeDoctorId: string | null;
  activePatientId: string | null;
}

const seed: ClinovaStore = {
  healthCentre: {
    id: "HC-GJ-00001",
    name: "Tertiary Government Hospital",
    type: "Government Hospital",
    location: "Gandhinagar, Gujarat",
    status: "Active",
  },
  doctors: [
    {
      id: "DOC-GJ-00001",
      name: "Dr. Meera Sharma",
      department: "General Medicine",
      qualification: "MBBS, MD",
      specialization: "General Medicine",
      registrationNumber: "DEMO-REG-001",
      mobile: "9876543201",
      email: "meera.sharma@hospital.demo",
      language: "English",
      status: "Active",
      healthCentreId: "HC-GJ-00001",
    },
    {
      id: "DOC-GJ-00002",
      name: "Dr. A. Desai",
      department: "Cardiology",
      qualification: "MBBS, MD",
      specialization: "Cardiology",
      registrationNumber: "DEMO-REG-002",
      mobile: "9876543202",
      email: "a.desai@hospital.demo",
      language: "English",
      status: "Active",
      healthCentreId: "HC-GJ-00001",
    },
    {
      id: "DOC-GJ-00003",
      name: "Dr. K. Reddy",
      department: "General Medicine",
      qualification: "MBBS",
      specialization: "General Medicine",
      registrationNumber: "DEMO-REG-003",
      mobile: "9876543203",
      email: "k.reddy@hospital.demo",
      language: "Telugu",
      status: "Active",
      healthCentreId: "HC-GJ-00001",
    },
  ],
  staff: [
    {
      id: "STF-GJ-00001",
      name: "Anita Patel",
      role: "Administrator",
      mobile: "9876500001",
      email: "anita.patel@hospital.demo",
      status: "Active",
      healthCentreId: "HC-GJ-00001",
    },
    {
      id: "STF-GJ-00002",
      name: "Ravi Kumar",
      role: "Digitization Operator",
      mobile: "9876500002",
      email: "ravi.kumar@hospital.demo",
      status: "Active",
      healthCentreId: "HC-GJ-00001",
    },
  ],
  patients: [
    {
      id: "PAT-GJ-00001",
      name: "Rahul Kumar",
      age: 42,
      gender: "Male",
      language: "Telugu",
      visitDate: "07 Sep 2026",
      triage: "moderate",
      complaint: "Fever & Cough (3 days)",
      assignment: { kind: "active", doctorName: "Dr. Meera Sharma" },
      mobile: "9876543210",
      healthCentreId: "HC-GJ-00001",
      assignedDoctorId: "DOC-GJ-00001",
      currentComplaint: "Fever and cough for 3 days",
      history: "Type 2 diabetes",
      allergies: "Information unavailable",
      familyHistory: "",
      previousSurgery: "",
      verification: "pending",
      historyCompleted: true,
      documents: ["Previous_Lab_Report.pdf"],
    },
    {
      id: "PAT-GJ-00002",
      name: "Suresh Patel",
      age: 55,
      gender: "Male",
      language: "Gujarati",
      visitDate: "07 Sep 2026",
      triage: "high",
      complaint: "Chest Pain & Breathlessness",
      assignment: { kind: "locked", doctorName: "Dr. A. Desai", note: "Returning" },
      mobile: "9876543211",
      healthCentreId: "HC-GJ-00001",
      assignedDoctorId: "DOC-GJ-00002",
      currentComplaint: "Chest pain and breathlessness",
      history: "",
      allergies: "Information unavailable",
      familyHistory: "",
      previousSurgery: "",
      verification: "pending",
      historyCompleted: false,
      documents: [],
    },
  ],
  activeDoctorId: null,
  activePatientId: null,
};

function read(): ClinovaStore {
  if (typeof window === "undefined") return seed;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as ClinovaStore : seed;
  } catch {
    return seed;
  }
}

function write(store: ClinovaStore) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  window.dispatchEvent(new Event("clinova-store-updated"));
}

export function getStore() {
  return read();
}

export function resetStore() {
  write(seed);
}

export function getHealthCentre() {
  return read().healthCentre;
}

export function getDoctors() {
  return read().doctors;
}

export function getStaff() {
  return read().staff;
}

export function getPatients() {
  return read().patients;
}

export function getDoctorById(id: string) {
  return read().doctors.find((doctor) => doctor.id === id);
}

export function getPatientById(id: string) {
  return read().patients.find((patient) => patient.id === id);
}

function nextId(prefix: string, existing: string[], digits = 5) {
  const max = existing
    .map((id) => Number(id.split("-").pop()))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 0);
  return `${prefix}-${String(max + 1).padStart(digits, "0")}`;
}

export function createDoctor(input: Omit<ClinovaDoctor, "id" | "healthCentreId">) {
  const store = read();
  const doctor: Doctor = {
    ...input,
    id: nextId("DOC-GJ", store.doctors.map((item) => item.id)),
  };
  write({ ...store, doctors: [...store.doctors, doctor] });
  return doctor;
}

export function updateDoctor(id: string, input: Omit<ClinovaDoctor, "id" | "healthCentreId">) {
  const store = read();
  write({
    ...store,
    doctors: store.doctors.map((doctor) =>
      doctor.id === id ? { ...input, id, healthCentreId: doctor.healthCentreId } : doctor,
    ),
  });
}

export function toggleDoctor(id: string) {
  // Doctor status is introduced in the full backend model later.
  // For the prototype, this function is intentionally a no-op.
  return id;
}

export function createStaff(input: Omit<StaffMember, "id" | "healthCentreId">) {
  const store = read();
  const member: StaffMember = {
    ...input,
    id: nextId("STF-GJ", store.staff.map((item) => item.id)),
    healthCentreId: store.healthCentre.id,
  };
  write({ ...store, staff: [...store.staff, member] });
  return member;
}

export function toggleStaff(id: string) {
  const store = read();
  write({
    ...store,
    staff: store.staff.map((member) =>
      member.id === id
        ? { ...member, status: member.status === "Active" ? "Inactive" : "Active" }
        : member,
    ),
  });
}

export function createPatient(input: Omit<ClinovaPatient, "id" | "healthCentreId">) {
  const store = read();
  const patient: ClinovaPatient = {
    ...input,
    id: nextId("PAT-GJ", store.patients.map((item) => item.id)),
    healthCentreId: store.healthCentre.id,
  };
  write({ ...store, patients: [...store.patients, patient] });
  return patient;
}

export function updatePatient(id: string, patch: Partial<ClinovaPatient>) {
  const store = read();
  write({
    ...store,
    patients: store.patients.map((patient) =>
      patient.id === id ? { ...patient, ...patch } : patient,
    ),
  });
}

export function setActiveDoctor(id: string | null) {
  const store = read();
  write({ ...store, activeDoctorId: id });
}

export function setActivePatient(id: string | null) {
  const store = read();
  write({ ...store, activePatientId: id });
}

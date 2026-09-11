import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Header } from "@/components/dashboard/Header";
import { OPDQueue } from "@/components/dashboard/OPDQueue";
import { ModeTabs } from "@/components/dashboard/ModeTabs";
import { PatientInfoCard } from "@/components/dashboard/PatientInfoCard";
import { AIAnalysisCard } from "@/components/dashboard/AIAnalysisCard";
import { MissingInformationCard } from "@/components/dashboard/MissingInformationCard";
import { ClinicalSummaryCard } from "@/components/dashboard/ClinicalSummaryCard";
import { DecisionSupportCard } from "@/components/dashboard/DecisionSupportCard";
import { VerifiedRecordsCard } from "@/components/dashboard/VerifiedRecordsCard";
import { CurrentVisitCard } from "@/components/dashboard/CurrentVisitCard";
import { PatientTimeline } from "@/components/dashboard/PatientTimeline";
import { PastRecordModal } from "@/components/dashboard/PastRecordModal";
import { DoctorAssessment } from "@/components/dashboard/DoctorAssessment";
import { VoiceTranscriptModal } from "@/components/dashboard/VoiceTranscriptModal";
import { BottomActionBar } from "@/components/dashboard/BottomActionBar";
import { PatientViewPanel } from "@/components/dashboard/PatientViewPanel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import {
  ayushSummary,
  ayushVerifiedRecords,
  currentDoctor as demoDoctor,
  demoAIAnalysis,
  demoAlerts,
  demoAssessment,
  demoMissing,
  demoSummary,
  demoTimeline,
  demoVerifiedRecords,
} from "@/data/demo";
import { getDoctorById, getStore, getPatients, startConsultation } from "@/data/clinovaStore";
import type { Assessment, CaseRoutingStatus, ClinicalSummary, DashboardMode, TimelineEvent, ClinicalDocument } from "@/types/clinical";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doctor Dashboard â€” Clinova" },
      { name: "description", content: "Clinova physician dashboard with OPD queue, patient history, reports and clinical review." },
    ],
  }),
  component: DoctorDashboard,
});

function DoctorDashboard() {
  const [tick, setTick] = useState(0);
  const [mode, setMode] = useState<DashboardMode>("allopathy");
  const [selectedId, setSelectedId] = useState("");
  const [queueOpen, setQueueOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [pastRecord, setPastRecord] = useState<TimelineEvent | null>(null);
  const [assessment, setAssessment] = useState<Assessment>(demoAssessment);
  const [routing, setRouting] = useState<CaseRoutingStatus>("awaiting-lab");
  const [summaryOverride, setSummaryOverride] = useState<ClinicalSummary | null>(null);

  useEffect(() => {
    const refresh = () => setTick((value) => value + 1);
    window.addEventListener("clinova-store-updated", refresh);
    return () => window.removeEventListener("clinova-store-updated", refresh);
  }, []);

  const store = useMemo(() => getPatients(), [tick]);
  const activeDoctorId = useMemo(() => getStore().activeDoctorId, [tick]);
  const doctor = (activeDoctorId ? getDoctorById(activeDoctorId) : undefined) ?? demoDoctor;
  const queuePatients = store.filter((patient) => patient.assignedDoctorId === doctor.id);
  const fallbackPatient = queuePatients[0] ?? store[0];
  const patient = queuePatients.find((p) => p.id === selectedId) ?? fallbackPatient;

  const isAyush = mode === "ayush";
  const isPatientView = mode === "patient";
  const baseSummary: ClinicalSummary = isAyush
    ? ayushSummary
    : patient
      ? {
          chiefComplaint: patient.currentComplaint || patient.complaint,
          pastMedicalHistory: patient.history || "Information unavailable",
          currentMedication: "Information unavailable",
          allergies: patient.allergies || "Information unavailable",
        }
      : demoSummary;
  const summary = summaryOverride ?? baseSummary;
  const records = isAyush ? ayushVerifiedRecords : demoVerifiedRecords;

  const documents: ClinicalDocument[] = (patient?.documents ?? []).map((file, index) => ({
    id: `${patient?.id ?? "demo"}-doc-${index}`,
    fileName: file,
    type: "pdf",
    note: "Patient document â€” prototype entry",
  }));

  function handlePrimaryAction() {
    if (isPatientView) {
      toast.info("Demo action", { description: "Patient-facing sharing is not connected yet." });
      return;
    }
    toast.info("Integration not connected", {
      description: isAyush ? "NAMASTE integration is simulated." : "HIS / ABDM integration is simulated.",
    });
  }

  if (!patient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-6">
        <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">No patient is assigned to this doctor</h1>
          <p className="mt-2 text-sm text-muted-foreground">Register a patient in the Staff Portal and assign them to {doctor.name}.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header doctor={doctor} onToggleQueue={() => setQueueOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1">
        <aside className={`${queueOpen ? "block" : "hidden"} w-full shrink-0 border-r border-border lg:block lg:w-[300px]`}>
          <OPDQueue
            patients={queuePatients}
            selectedId={patient.id}
            onSelect={(p) => {
              setSelectedId(p.id);
              setQueueOpen(false);
              setSummaryOverride(null);
            }}
          />
        </aside>

        <main className={`${queueOpen ? "hidden lg:flex" : "flex"} min-w-0 flex-1 flex-col`}>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
            <ModeTabs
              mode={mode}
              onChange={(m) => { setMode(m); setSummaryOverride(null); setEditing(false); }}
              onOpenTranscript={() => setTranscriptOpen(true)}
            />
            <PatientInfoCard patient={patient} />

            {isPatientView ? (
              <PatientViewPanel patient={patient} />
            ) : (
              <>
                <div className="grid gap-4 xl:grid-cols-2">
                  <AIAnalysisCard analysis={demoAIAnalysis} />
                  <MissingInformationCard items={demoMissing} onCollect={() => setStaffOpen(true)} />
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  <ClinicalSummaryCard summary={summary} editable={editing} onChange={setSummaryOverride} />
                  <DecisionSupportCard alerts={demoAlerts} />
                </div>
                <VerifiedRecordsCard records={records} />
                <CurrentVisitCard complaint={summary.chiefComplaint} documents={documents} />
              </>
            )}

            <PatientTimeline events={demoTimeline} onOpen={setPastRecord} />
            <DoctorAssessment
              assessment={assessment}
              onChange={setAssessment}
              routing={routing}
              onRoutingChange={setRouting}
              readOnly={isPatientView}
            />
          </div>

          <BottomActionBar
            mode={mode}
            editing={editing}
            onToggleEdit={() => {
              setEditing((v) => !v);
              toast.message(editing ? "Editing closed" : "Editing enabled for AI-extracted fields");
            }}
            onVerifySave={() => toast.success("Verified & saved locally", { description: "Prototype only â€” no external system was contacted." })}
            onPrimaryAction={handlePrimaryAction}
          />
        </main>
      </div>

      <PastRecordModal event={pastRecord} onClose={() => setPastRecord(null)} />
      <VoiceTranscriptModal open={transcriptOpen} onClose={() => setTranscriptOpen(false)} />

      <Dialog open={staffOpen} onOpenChange={setStaffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Staff-assisted collection</DialogTitle>
            <DialogDescription>
              Missing allergy, family and surgical history can be collected through the Staff Portal. The production version will save the collected information to the patient's shared record.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStaffOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}


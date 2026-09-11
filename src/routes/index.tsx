import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  ayushSummary,
  ayushVerifiedRecords,
  currentDoctor,
  demoAIAnalysis,
  demoAlerts,
  demoAssessment,
  demoDocuments,
  demoMissing,
  demoPatients,
  demoSummary,
  demoTimeline,
  demoVerifiedRecords,
} from "@/data/demo";
import type {
  Assessment,
  CaseRoutingStatus,
  ClinicalSummary,
  DashboardMode,
  TimelineEvent,
} from "@/types/clinical";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doctor Dashboard — AI Patient Assistant" },
      {
        name: "description",
        content:
          "Clinical dashboard demo for tertiary government hospital OPD: triage queue, verified ABHA history, decision support and physician assessment.",
      },
      { property: "og:title", content: "Doctor Dashboard — AI Patient Assistant" },
      {
        property: "og:description",
        content:
          "Demo doctor dashboard with OPD queue, AI-extracted summary, verified records and physician assessment.",
      },
    ],
  }),
  component: DoctorDashboard,
});
const fallbackPatient = demoPatients[0]!;

function DoctorDashboard() {
  const [mode, setMode] = useState<DashboardMode>("allopathy");
  const [selectedId, setSelectedId] = useState(fallbackPatient.id);

  const [queueOpen, setQueueOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [staffOpen, setStaffOpen] = useState(false);
  const [pastRecord, setPastRecord] = useState<TimelineEvent | null>(null);
  const [assessment, setAssessment] = useState<Assessment>(demoAssessment);
  const [routing, setRouting] = useState<CaseRoutingStatus>("awaiting-lab");
  const [summaryOverride, setSummaryOverride] = useState<ClinicalSummary | null>(null);

  const patient = useMemo(
    () => demoPatients.find((p) => p.id === selectedId) ?? demoPatients[0],
    [selectedId],
  );

  const isAyush = mode === "ayush";
  const isPatientView = mode === "patient";
  const baseSummary = isAyush ? ayushSummary : demoSummary;
  const summary = summaryOverride ?? baseSummary;
  const records = isAyush ? ayushVerifiedRecords : demoVerifiedRecords;

  function handlePrimaryAction() {
    if (isPatientView) {
      toast.info("Demo action", {
        description: "PDF sharing is not connected. Nothing was sent to the patient.",
      });
      return;
    }
    if (isAyush) {
      toast.info("Integration not connected — demo action", {
        description: "NAMASTE portal upload is simulated. No data left this device.",
      });
      return;
    }
    toast.info("Integration not connected — demo action", {
      description: "HIS / ABDM transmission is simulated. No data left this device.",
    });
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <Header doctor={currentDoctor} onToggleQueue={() => setQueueOpen((v) => !v)} />

      <div className="flex min-h-0 flex-1">
        <aside
          className={`${
            queueOpen ? "block" : "hidden"
          } w-full shrink-0 border-r border-border lg:block lg:w-[300px]`}
        >
          <OPDQueue
            patients={demoPatients}
            selectedId={patient.id}
            onSelect={(p) => {
              setSelectedId(p.id);
              setQueueOpen(false);
              setSummaryOverride(null);
            }}
          />
        </aside>

        <main
          className={`${queueOpen ? "hidden lg:flex" : "flex"} min-w-0 flex-1 flex-col`}
        >
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
            <ModeTabs
              mode={mode}
              onChange={(m) => {
                setMode(m);
                setSummaryOverride(null);
                setEditing(false);
              }}
              onOpenTranscript={() => setTranscriptOpen(true)}
            />

            <PatientInfoCard patient={patient} />

            {isPatientView ? (
              <PatientViewPanel patient={patient} />
            ) : (
              <>
                <div className="grid gap-4 xl:grid-cols-2">
                  <AIAnalysisCard analysis={demoAIAnalysis} />
                  <MissingInformationCard
                    items={demoMissing}
                    onCollect={() => setStaffOpen(true)}
                  />
                </div>

                <div className="grid gap-4 xl:grid-cols-2">
                  <ClinicalSummaryCard
                    summary={summary}
                    editable={editing}
                    onChange={setSummaryOverride}
                  />
                  <DecisionSupportCard alerts={demoAlerts} />
                </div>

                <VerifiedRecordsCard records={records} />

                <CurrentVisitCard
                  complaint={summary.chiefComplaint}
                  documents={demoDocuments}
                />
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
              toast.message(
                editing ? "Editing closed" : "Editing enabled for AI-extracted fields",
              );
            }}
            onVerifySave={() =>
              toast.success("Verified & saved locally", {
                description: "Demo only — the record was stored in this session, not sent anywhere.",
              })
            }
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
              Collecting allergy, family and surgical history with front-desk staff support is a
              planned workflow. It is not available in this demo version.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStaffOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

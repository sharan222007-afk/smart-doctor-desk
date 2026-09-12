import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { ayushSummary,ayushVerifiedRecords,demoAIAnalysis,demoAlerts,demoAssessment,demoMissing,demoSummary,demoTimeline,demoVerifiedRecords } from "@/data/demo";
import { getDoctorById,getStore,getPatients } from "@/data/clinovaStore";
import type { Assessment,CaseRoutingStatus,ClinicalSummary,DashboardMode,TimelineEvent,ClinicalDocument } from "@/types/clinical";

export const Route=createFileRoute("/")({
  head:()=>({meta:[
    {title:"Doctor Dashboard — Clinova"},
    {name:"description",content:"Clinova physician dashboard with OPD queue, patient history, reports and clinical review."},
  ]}),
  component:DoctorDashboard,
});

function DoctorDashboard(){
  const navigate=useNavigate();
  const [tick,setTick]=useState(0);
  const [mode,setMode]=useState<DashboardMode>("allopathy");
  const [selectedId,setSelectedId]=useState("");
  const [queueOpen,setQueueOpen]=useState(false);
  const [editing,setEditing]=useState(false);
  const [transcriptOpen,setTranscriptOpen]=useState(false);
  const [staffOpen,setStaffOpen]=useState(false);
  const [pastRecord,setPastRecord]=useState<TimelineEvent|null>(null);
  const [assessment,setAssessment]=useState<Assessment>(demoAssessment);
  const [routing,setRouting]=useState<CaseRoutingStatus>("awaiting-lab");
  const [summaryOverride,setSummaryOverride]=useState<ClinicalSummary|null>(null);

  useEffect(()=>{
    const refresh=()=>setTick(v=>v+1);
    window.addEventListener("clinova-store-updated",refresh);
    return()=>window.removeEventListener("clinova-store-updated",refresh);
  },[]);

  const activeDoctorId=useMemo(()=>getStore().activeDoctorId,[tick]);

  useEffect(()=>{
    if(!activeDoctorId) navigate({to:"/doctor",replace:true});
  },[activeDoctorId,navigate]);

  const doctor=useMemo(()=>activeDoctorId?getDoctorById(activeDoctorId):undefined,[activeDoctorId,tick]);
  const patients=useMemo(()=>getPatients(),[tick]);

  const severityRank:Record<string,number>={high:0,moderate:1,routine:2};
  const queuePatients=[...patients]
    .filter(p=>p.visitStatus!=="completed")
    .sort((a,b)=>{
      const severity=(severityRank[a.triage]??9)-(severityRank[b.triage]??9);
      if(severity!==0)return severity;
      const aTime=a.lastUpdatedAt?Date.parse(a.lastUpdatedAt):0;
      const bTime=b.lastUpdatedAt?Date.parse(b.lastUpdatedAt):0;
      return bTime-aTime;
    });

  const fallbackPatient=queuePatients[0]??patients[0];
  const patient=queuePatients.find(p=>p.id===selectedId)??fallbackPatient;
  const isAyush=mode==="ayush";
  const isPatientView=mode==="patient";

  const baseSummary:ClinicalSummary=isAyush?ayushSummary:patient?{
    chiefComplaint:patient.currentComplaint||patient.complaint,
    pastMedicalHistory:patient.history||"Information unavailable",
    currentMedication:"Information unavailable",
    allergies:patient.allergies||"Information unavailable",
  }:demoSummary;

  const summary=summaryOverride??baseSummary;
  const records=isAyush?ayushVerifiedRecords:demoVerifiedRecords;
  const documents:ClinicalDocument[]=(patient?.documents??[]).map((file,index)=>({
    id:`${patient?.id??"demo"}-doc-${index}`,fileName:file,type:"pdf",note:"Patient document — prototype entry",
  }));

  function handlePrimaryAction(){
    if(isPatientView){toast.info("Demo action",{description:"Patient-facing sharing is not connected yet."});return;}
    toast.info("Integration not connected",{description:isAyush?"NAMASTE integration is simulated.":"HIS / ABDM integration is simulated."});
  }

  if(!activeDoctorId)return null;

  if(!doctor)return <div className="flex min-h-screen items-center justify-center bg-background p-6"><div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm"><h1 className="text-xl font-semibold">Doctor account not found</h1><p className="mt-2 text-sm text-muted-foreground">The current doctor session is invalid. Please sign in again.</p><Button className="mt-5" onClick={()=>navigate({to:"/doctor",replace:true})}>Return to Doctor Login</Button></div></div>;

  if(!patient)return <div className="flex min-h-screen items-center justify-center bg-background p-6"><div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm"><h1 className="text-xl font-semibold">No patients in the OPD queue</h1><p className="mt-2 text-sm text-muted-foreground">Register a patient in the Staff Portal. Waiting patients will appear in the common OPD queue.</p></div></div>;

  return <div className="flex h-screen flex-col bg-background text-foreground">
    <Header doctor={doctor} onToggleQueue={()=>setQueueOpen(v=>!v)}/>
    <div className="flex min-h-0 flex-1">
      <aside className={`${queueOpen?"block":"hidden"} w-full shrink-0 border-r border-border lg:block lg:w-[300px]`}>
        <OPDQueue patients={queuePatients} selectedId={patient.id} onSelect={p=>{setSelectedId(p.id);setQueueOpen(false);setSummaryOverride(null);}}/>
      </aside>
      <main className={`${queueOpen?"hidden lg:flex":"flex"} min-w-0 flex-1 flex-col`}>
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4 lg:p-6">
          <ModeTabs mode={mode} onChange={m=>{setMode(m);setSummaryOverride(null);setEditing(false);}} onOpenTranscript={()=>setTranscriptOpen(true)}/>
          <PatientInfoCard patient={patient}/>
          {isPatientView?<PatientViewPanel patient={patient}/>:<>
            <div className="grid gap-4 xl:grid-cols-2"><AIAnalysisCard analysis={demoAIAnalysis}/><MissingInformationCard items={demoMissing} onCollect={()=>setStaffOpen(true)}/></div>
            <div className="grid gap-4 xl:grid-cols-2"><ClinicalSummaryCard summary={summary} editable={editing} onChange={setSummaryOverride}/><DecisionSupportCard alerts={demoAlerts}/></div>
            <VerifiedRecordsCard records={records}/>
            <CurrentVisitCard complaint={summary.chiefComplaint} documents={documents}/>
          </>}
          <PatientTimeline events={demoTimeline} onOpen={setPastRecord}/>
          <DoctorAssessment assessment={assessment} onChange={setAssessment} routing={routing} onRoutingChange={setRouting} readOnly={isPatientView}/>
        </div>
        <BottomActionBar mode={mode} editing={editing}
          onToggleEdit={()=>{setEditing(v=>!v);toast.message(editing?"Editing closed":"Editing enabled for AI-extracted fields");}}
          onVerifySave={()=>toast.success("Verified & saved locally",{description:"Prototype only — no external system was contacted."})}
          onPrimaryAction={handlePrimaryAction}/>
      </main>
    </div>
    <PastRecordModal event={pastRecord} onClose={()=>setPastRecord(null)}/>
    <VoiceTranscriptModal open={transcriptOpen} onClose={()=>setTranscriptOpen(false)}/>
    <Dialog open={staffOpen} onOpenChange={setStaffOpen}>
      <DialogContent><DialogHeader><DialogTitle>Staff-assisted collection</DialogTitle><DialogDescription>Missing allergy, family and surgical history can be collected through the Staff Portal. The production version will save the collected information to the patient's shared record.</DialogDescription></DialogHeader><DialogFooter><Button variant="outline" onClick={()=>setStaffOpen(false)}>Close</Button></DialogFooter></DialogContent>
    </Dialog>
  </div>;
}

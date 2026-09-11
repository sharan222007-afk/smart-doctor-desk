import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check, FileText, Plus, ScanLine, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { getPatientById, getPatients, updatePatient } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/digitize")({ component: DigitizationPage });

function DigitizationPage() {
  const [patients] = useState(getPatients);
  const [patientId, setPatientId] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pending = window.localStorage.getItem("clinova-pending-digitization");
      if (pending && getPatientById(pending)) setPatientId(pending);
    }
  }, []);

  const patient = patientId ? getPatientById(patientId) : undefined;

  function save() {
    if (!patient || files.length === 0) return;
    updatePatient(patient.id, { documents: [...new Set([...patient.documents, ...files])], historyCompleted: true });
    if (typeof window !== "undefined") window.localStorage.removeItem("clinova-pending-digitization");
    setSaved(true);
  }

  return <StaffLayout>
    <div className="mb-7"><p className="text-sm font-medium text-primary">MEDICAL RECORDS</p><h1 className="mt-2 text-3xl font-semibold">Staff-assisted Digitization</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Preserve the original document and prepare it for the future OCR/document-understanding pipeline. No medical interpretation is performed by this prototype.</p></div>

    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <label className="block text-sm font-medium">Patient</label>
      <select value={patientId} onChange={e=>{setPatientId(e.target.value);setSaved(false)}} className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm md:max-w-xl">
        <option value="">Select patient</option>{patients.map(p=><option key={p.id} value={p.id}>{p.name} • {p.id}</option>)}
      </select>

      {patient && <div className="mt-7">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4"><p className="text-sm font-semibold">{patient.name} <span className="ml-2 text-xs font-normal text-muted-foreground">{patient.id}</span></p><p className="mt-1 text-xs text-muted-foreground">Assigned doctor: {patient.assignedDoctorId}</p></div>
        <div className="mt-6 rounded-xl border-2 border-dashed border-border bg-muted/20 p-10 text-center">
          <Upload className="mx-auto h-8 w-8 text-primary"/><h2 className="mt-4 font-semibold">Add previous medical reports</h2><p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">PDFs and images can be selected. In production, scanning and secure storage will be connected here.</p>
          <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4"/> Add files<input type="file" multiple accept=".pdf,image/*" className="hidden" onChange={e=>setFiles(current=>[...current,...Array.from(e.target.files??[]).map(f=>f.name)])}/></label>
        </div>
        {files.length>0&&<div className="mt-6 space-y-2">{files.map((file,i)=><div key={`${file}-${i}`} className="flex items-center gap-3 rounded-lg border border-border p-3"><FileText className="h-5 w-5 text-primary"/><span className="min-w-0 flex-1 truncate text-sm">{file}</span><button type="button" onClick={()=>setFiles(current=>current.filter((_,idx)=>idx!==i))}><Trash2 className="h-4 w-4 text-muted-foreground"/></button></div>)}</div>}
        <div className="mt-6 rounded-xl border border-border p-4"><div className="flex gap-3"><ScanLine className="h-5 w-5 text-primary"/><div><p className="text-sm font-medium">What happens later?</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Original → processing copy → OCR/document vision → structured extraction → source/page evidence → confidence → staff/patient verification → verified record.</p></div></div></div>
        {saved&&<div className="mt-5 flex items-center gap-2 rounded-lg bg-primary/10 p-3 text-sm text-primary"><Check className="h-4 w-4"/> Documents saved to this prototype patient record.</div>}
        <div className="mt-6 flex justify-end gap-3"><Link to="/staff/patients" className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">Back</Link><button type="button" onClick={save} disabled={!files.length} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">Save Documents <Check className="h-4 w-4"/></button></div>
      </div>}
    </section>
  </StaffLayout>
}

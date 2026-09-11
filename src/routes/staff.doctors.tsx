import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Edit3, Plus, Search, Stethoscope, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { createDoctor, getDoctors, updateDoctor } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/doctors")({ component: DoctorsPage });

const departments = ["General Medicine","Cardiology","Pediatrics","Orthopedics","Gynecology","Dermatology","ENT","Ayurveda","Other"];
const languages = ["English","Telugu","Hindi","Gujarati","Tamil","Kannada","Malayalam"];

function DoctorsPage() {
  const [doctors, setDoctors] = useState(getDoctors);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", department:"General Medicine", qualification:"", specialization:"", registrationNumber:"", mobile:"", email:"", language:"English" });

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return doctors.filter((d) => !q || `${d.id} ${d.name} ${d.department}`.toLowerCase().includes(q));
  }, [doctors, search]);

  function reset() {
    setForm({ name:"", department:"General Medicine", qualification:"", specialization:"", registrationNumber:"", mobile:"", email:"", language:"English" });
    setEditing(null); setSubmitted(false); setShow(false);
  }

  function save() {
    setSubmitted(true);
    if (form.name.trim().length < 3 || form.qualification.trim().length < 2 || form.specialization.trim().length < 2 || form.registrationNumber.trim().length < 3 || form.mobile.replace(/\D/g,"").length !== 10 || !form.email.includes("@")) return;
    const data = { name: form.name.trim(), department: form.department, qualification: form.qualification.trim(), specialization: form.specialization.trim(), registrationNumber: form.registrationNumber.trim(), mobile: form.mobile.replace(/\D/g,""), email: form.email.trim(), language: form.language, status: "Active" as const };
    if (editing) updateDoctor(editing, data);
    else createDoctor(data);
    setDoctors(getDoctors());
    reset();
  }

  return (
    <StaffLayout>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-primary">DOCTOR DIRECTORY</p>
          <h1 className="mt-2 text-3xl font-semibold">Doctors</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">Create doctor identities before patients are registered. Doctor IDs are generated automatically.</p>
        </div>
        <button type="button" onClick={() => { reset(); setShow(true); }} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Create Doctor</button>
      </div>

      {show && <section className="mb-7 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm lg:p-8">
        <div className="flex items-start justify-between">
          <div><h2 className="text-xl font-semibold">{editing ? "Edit Doctor Profile" : "Create Doctor Profile"}</h2><p className="mt-1 text-sm text-muted-foreground">{editing ? "Doctor ID stays unchanged." : "A new Doctor ID will be generated on save."}</p></div>
          <button type="button" onClick={reset} className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted">Close</button>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <Field label="Full name" error={submitted && form.name.trim().length < 3 ? "Enter the doctor's name." : undefined}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Dr. Meera Sharma" /></Field>
          <Field label="Department"><select value={form.department} onChange={e=>setForm({...form,department:e.target.value})}>{departments.map(d=><option key={d}>{d}</option>)}</select></Field>
          <Field label="Qualification" error={submitted && form.qualification.trim().length < 2 ? "Enter qualification." : undefined}><input value={form.qualification} onChange={e=>setForm({...form,qualification:e.target.value})} placeholder="MBBS, MD" /></Field>
          <Field label="Specialization" error={submitted && form.specialization.trim().length < 2 ? "Enter specialization." : undefined}><input value={form.specialization} onChange={e=>setForm({...form,specialization:e.target.value})} placeholder="General Medicine" /></Field>
          <Field label="Medical registration number" error={submitted && form.registrationNumber.trim().length < 3 ? "Enter registration number." : undefined}><input value={form.registrationNumber} onChange={e=>setForm({...form,registrationNumber:e.target.value})} placeholder="State Council / NMC registration" /></Field>
          <Field label="Mobile number" error={submitted && form.mobile.replace(/\D/g,"").length!==10 ? "Enter a 10-digit number." : undefined}><input inputMode="numeric" maxLength={10} value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,"")})} placeholder="9876543201" /></Field>
          <Field label="Official email" error={submitted && !form.email.includes("@") ? "Enter a valid email." : undefined}><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="doctor@hospital.gov.in" /></Field>
          <Field label="Preferred language"><select value={form.language} onChange={e=>setForm({...form,language:e.target.value})}>{languages.map(l=><option key={l}>{l}</option>)}</select></Field>
        </div>
        <div className="mt-6 flex justify-end gap-3 border-t border-border pt-6">
          <button type="button" onClick={reset} className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">Cancel</button>
          <button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">{editing ? "Save Changes" : "Create Doctor"} <ArrowRight className="h-4 w-4" /></button>
        </div>
      </section>}

      <section className="rounded-2xl border border-border bg-card shadow-sm">
        <div className="flex flex-col gap-4 border-b border-border p-6 md:flex-row md:items-center md:justify-between">
          <div><h2 className="font-semibold">Registered Doctors</h2><p className="mt-1 text-xs text-muted-foreground">{doctors.length} doctor profiles in this centre</p></div>
          <div className="relative w-full md:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, department or ID" className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pl-9 text-sm outline-none focus:border-primary" /></div>
        </div>
        <div className="divide-y divide-border">{filtered.map(doctor => <div key={doctor.id} className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="h-5 w-5" /></div>
              <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{doctor.name}</h3><span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">Active</span></div><p className="mt-1 text-sm text-muted-foreground">{doctor.department} • {doctor.specialization}</p><div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground"><b className="text-foreground">{doctor.id}</b><span>{doctor.qualification}</span><span>Reg: {doctor.registrationNumber}</span><span>{doctor.mobile}</span></div></div>
            </div>
            <button type="button" onClick={()=>{setEditing(doctor.id);setForm({name:doctor.name,department:doctor.department,qualification:doctor.qualification,specialization:doctor.specialization,registrationNumber:doctor.registrationNumber,mobile:doctor.mobile,email:doctor.email,language:doctor.language});setShow(true);setSubmitted(false);}} className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-muted"><Edit3 className="h-4 w-4" /> Edit</button>
          </div>
        </div>)}</div>
      </section>
    </StaffLayout>
  );
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}) {
  return <div><label className="mb-2 block text-sm font-medium">{label}</label><div className="[&>input]:w-full [&>input]:rounded-lg [&>input]:border [&>input]:border-input [&>input]:bg-background [&>input]:px-4 [&>input]:py-3 [&>input]:text-sm [&>input]:outline-none [&>input]:focus:border-primary [&>select]:w-full [&>select]:rounded-lg [&>select]:border [&>select]:border-input [&>select]:bg-background [&>select]:px-4 [&>select]:py-3 [&>select]:text-sm">{children}</div>{error&&<p className="mt-1.5 text-xs text-destructive">{error}</p>}</div>
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Pencil, Save, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { getDoctorById, getStore, updateDoctor } from "@/data/clinovaStore";

export const Route = createFileRoute("/doctor/profile")({ component: DoctorProfile });

function DoctorProfile() {
  const store = getStore();
  const doctor = getDoctorById(store.activeDoctorId ?? store.doctors[0]?.id ?? "");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(() => doctor ? {
    name: doctor.name, department: doctor.department, qualification: doctor.qualification,
    specialization: doctor.specialization, registrationNumber: doctor.registrationNumber,
    mobile: doctor.mobile, email: doctor.email, language: doctor.language,
  } : null);

  if (!doctor || !form) return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8">
        <h1 className="text-2xl font-semibold">Doctor profile unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">No registered doctor account is available.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft className="size-4"/> Back to Dashboard</Link>
      </div>
    </div>
  );

  function save() {
    updateDoctor(doctor.id, { ...form, status: doctor.status });
    setEditing(false); setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
        <div><p className="text-sm font-semibold">AI Patient Assistant</p><p className="text-xs text-muted-foreground">Doctor Profile</p></div>
        <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-secondary"><ArrowLeft className="size-4"/> Back to Dashboard</Link>
      </header>
      <main className="mx-auto max-w-5xl space-y-5 p-4 lg:p-8">
        <div><p className="text-sm font-medium text-primary">DOCTOR ACCOUNT</p><h1 className="mt-1 text-3xl font-semibold">Doctor Profile</h1><p className="mt-2 text-sm text-muted-foreground">Your professional identity and account details for this health centre.</p></div>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
          <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"><span className="text-xl font-semibold">{doctor.name.replace(/^Dr\.\s*/,"").split(" ").map(x=>x[0]).slice(0,2).join("")}</span></div>
              <div><h2 className="text-xl font-semibold">{doctor.name}</h2><p className="text-sm text-muted-foreground">{doctor.specialization} • {doctor.department}</p><p className="mt-1 text-xs font-semibold text-primary">{doctor.id}</p></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><CheckCircle2 className="size-3.5"/> {doctor.status}</span>
              {!editing && <button onClick={()=>setEditing(true)} className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2 text-sm font-medium hover:bg-secondary"><Pencil className="size-4"/> Edit Profile</button>}
            </div>
          </div>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {([
              ["Full name","name"],["Department","department"],["Qualification","qualification"],["Specialization","specialization"],
              ["Medical registration number","registrationNumber"],["Preferred language","language"],["Mobile number","mobile"],["Official email","email"]
            ] as const).map(([label,key])=><label key={key} className="block"><span className="mb-2 block text-sm font-medium">{label}</span><input disabled={!editing} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm disabled:bg-muted/40"/></label>)}
          </div>
          {editing && <div className="mt-7 flex justify-end gap-3 border-t border-border pt-6"><button onClick={()=>setEditing(false)} className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-secondary">Cancel</button><button onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Save className="size-4"/> Save Changes</button></div>}
          {saved && <div className="mt-5 flex items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm"><CheckCircle2 className="size-5 text-primary"/> Profile updated and saved locally.</div>}
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 size-5 text-primary"/><div><h2 className="font-semibold">Account & security</h2><p className="mt-1 text-sm leading-6 text-muted-foreground">Production authentication, MFA, role-based permissions, session management and audit logs will be connected to the backend.</p></div></div></section>
      </main>
    </div>
  );
}

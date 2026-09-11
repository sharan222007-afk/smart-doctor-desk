import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, HeartPulse, LockKeyhole, Stethoscope } from "lucide-react";
import { useState } from "react";
import { getDoctors, setActiveDoctor } from "@/data/clinovaStore";

export const Route = createFileRoute("/doctor")({ component: DoctorLogin });

function DoctorLogin() {
  const navigate = useNavigate();
  const doctors = getDoctors();
  const [doctorId,setDoctorId]=useState(doctors[0]?.id??"");
  const [mobile,setMobile]=useState("");
  const [error,setError]=useState("");

  function login(){
    const doctor=doctors.find(d=>d.id===doctorId);
    if(!doctor){setError("Select a doctor.");return;}
    if(mobile.replace(/\D/g,"") !== doctor.mobile){setError("Mobile number does not match this Doctor ID.");return;}
    setActiveDoctor(doctor.id);
    navigate({to:"/"});
  }

  return <div className="min-h-screen bg-background text-foreground">
    <header className="border-b border-border bg-card"><div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 lg:px-8"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><HeartPulse className="h-5 w-5"/></span><div><p className="text-sm font-semibold">Clinova</p><p className="text-xs text-muted-foreground">Doctor Portal</p></div></div></header>
    <main className="mx-auto max-w-md px-4 py-12"><div className="mb-8 text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Stethoscope className="h-7 w-7"/></div><h1 className="mt-5 text-2xl font-semibold">Doctor Sign In</h1><p className="mt-2 text-sm leading-6 text-muted-foreground">Choose your registered doctor identity to open the clinical dashboard.</p></div>
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
        <label className="block text-sm font-medium">Doctor ID</label><select value={doctorId} onChange={e=>setDoctorId(e.target.value)} className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm">{doctors.map(d=><option key={d.id} value={d.id}>{d.name} • {d.id}</option>)}</select>
        <label className="mt-5 block text-sm font-medium">Mobile number</label><input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,""))} maxLength={10} placeholder="Demo: any 10 digits" className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"/>
        {error&&<p className="mt-2 text-xs text-destructive">{error}</p>}
        <button type="button" onClick={login} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Open Doctor Dashboard <ArrowRight className="h-4 w-4"/></button>
        <div className="mt-5 flex gap-3 rounded-xl bg-primary/5 p-4"><LockKeyhole className="h-5 w-5 shrink-0 text-primary"/><p className="text-xs leading-5 text-muted-foreground">Prototype authentication only. Production login will use hospital-approved identity, MFA and role-based access.</p></div>
      </section>
    </main>
  </div>
}

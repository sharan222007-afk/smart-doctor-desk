import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Plus, UserRound, Users } from "lucide-react";
import { useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { createStaff, getStaff, type StaffRole } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/staff")({ component: StaffManagement });

const roles: StaffRole[] = ["Reception","Registration","Medical Records","Digitization Operator","Nurse","Administrator"];

function StaffManagement() {
  const [members, setMembers] = useState(getStaff);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({name:"",role:"Reception" as StaffRole,mobile:"",email:""});
  const [submitted,setSubmitted]=useState(false);

  function save() {
    setSubmitted(true);
    if(form.name.trim().length<2 || form.mobile.replace(/\D/g,"").length!==10 || !form.email.includes("@")) return;
    createStaff({name:form.name.trim(),role:form.role,mobile:form.mobile.replace(/\D/g,""),email:form.email.trim(),status:"Active"});
    setMembers(getStaff()); setForm({name:"",role:"Reception",mobile:"",email:""});setSubmitted(false);setShow(false);
  }

  return <StaffLayout>
    <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div><p className="text-sm font-medium text-primary">STAFF DIRECTORY</p><h1 className="mt-2 text-3xl font-semibold">Staff</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">Create operational accounts for reception, registration, medical records and digitization support.</p></div>
      <button type="button" onClick={()=>setShow(true)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4"/> Create Staff</button>
    </div>

    {show && <section className="mb-7 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Create Staff Account</h2>
      <p className="mt-1 text-sm text-muted-foreground">The Staff ID is generated automatically and linked to this health centre.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={submitted&&form.name.trim().length<2?"Enter a name.":undefined}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Staff member name"/></Field>
        <Field label="Role"><select value={form.role} onChange={e=>setForm({...form,role:e.target.value as StaffRole})}>{roles.map(r=><option key={r}>{r}</option>)}</select></Field>
        <Field label="Mobile number" error={submitted&&form.mobile.replace(/\D/g,"").length!==10?"Enter a 10-digit number.":undefined}><input inputMode="numeric" maxLength={10} value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,"")})} placeholder="9876543210"/></Field>
        <Field label="Official email" error={submitted&&!form.email.includes("@")?"Enter a valid email.":undefined}><input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="staff@hospital.gov.in"/></Field>
      </div>
      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-6"><button type="button" onClick={()=>setShow(false)} className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">Cancel</button><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Create Staff <ArrowRight className="h-4 w-4"/></button></div>
    </section>}

    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-6"><h2 className="font-semibold">Registered Staff</h2><p className="mt-1 text-xs text-muted-foreground">{members.length} staff accounts</p></div>
      <div className="divide-y divide-border">{members.map(member=><div key={member.id} className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound className="h-5 w-5"/></div><div><h3 className="font-semibold">{member.name}</h3><p className="mt-1 text-sm text-muted-foreground">{member.role}</p><div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground"><b className="text-foreground">{member.id}</b><span>{member.mobile}</span><span>{member.email}</span></div></div></div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><Users className="h-3.5 w-3.5"/> {member.status}</span>
      </div>)}</div>
    </section>
  </StaffLayout>
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <div><label className="mb-2 block text-sm font-medium">{label}</label><div className="[&>input]:w-full [&>input]:rounded-lg [&>input]:border [&>input]:border-input [&>input]:bg-background [&>input]:px-4 [&>input]:py-3 [&>input]:text-sm [&>select]:w-full [&>select]:rounded-lg [&>select]:border [&>select]:border-input [&>select]:bg-background [&>select]:px-4 [&>select]:py-3 [&>select]:text-sm">{children}</div>{error&&<p className="mt-1.5 text-xs text-destructive">{error}</p>}</div>}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { createPatient, getDoctors, type ClinovaPatient } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/patients/register")({ component: RegisterPatient });

const languages = ["Telugu","Hindi","English","Gujarati","Tamil","Kannada","Malayalam"];

function RegisterPatient() {
  const navigate = useNavigate();
  const doctors = getDoctors();
  const [submitted,setSubmitted]=useState(false);
  const [createdId,setCreatedId]=useState("");
  const [form,setForm]=useState({name:"",age:"",gender:"",language:"Telugu",mobile:"",doctorId:doctors[0]?.id ?? "",digitize:true});

  function save(){
    setSubmitted(true);
    if(form.name.trim().length<2||!(Number(form.age)>0&&Number(form.age)<=120)||!form.gender||form.mobile.replace(/\D/g,"").length!==10||!form.doctorId)return;
    const doctor=doctors.find(d=>d.id===form.doctorId)!;
    const patient=createPatient({
      name:form.name.trim(),age:Number(form.age),gender:form.gender as ClinovaPatient["gender"],language:form.language,
      visitDate:new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),
      triage:"routine",complaint:"New patient — history pending",
      assignment:{kind:"assigned",doctorName:doctor.name},
      mobile:form.mobile.replace(/\D/g,""),assignedDoctorId:doctor.id,currentComplaint:"",
      history:"",allergies:"",familyHistory:"",previousSurgery:"",verification:"pending",
      historyCompleted:false,documents:[]
    });
    if(form.digitize&&typeof window!=="undefined") window.localStorage.setItem("clinova-pending-digitization",patient.id);
    setCreatedId(patient.id);
  }

  if(createdId) return <StaffLayout>
    <div className="mx-auto max-w-2xl">
      <Link to="/staff/patients" className="inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4"/> Back to Patients</Link>
      <section className="mt-6 rounded-2xl border border-primary/20 bg-card p-8 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary"><CheckCircle2 className="h-7 w-7"/></div>
        <p className="mt-5 text-sm font-medium text-primary">PATIENT REGISTERED</p>
        <h1 className="mt-2 text-2xl font-semibold">Patient account created</h1>
        <p className="mt-2 text-sm text-muted-foreground">The patient identity has been created and the Patient ID is ready for use.</p>
        <div className="mx-auto mt-6 max-w-sm rounded-xl border border-border bg-muted/40 p-5">
          <p className="text-xs text-muted-foreground">Patient ID</p>
          <p className="mt-1 text-2xl font-semibold tracking-wide">{createdId}</p>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/staff/patients" className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">View Patients</Link>
          {form.digitize && <Link to="/staff/digitize" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Continue to Digitization <ArrowRight className="h-4 w-4"/></Link>}
        </div>
      </section>
    </div>
  </StaffLayout>;

  return <StaffLayout>
    <div className="mb-7">
      <Link to="/staff/patients" className="inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4"/> Back to Patients</Link>
      <p className="mt-6 text-sm font-medium text-primary">PATIENT REGISTRATION</p>
      <h1 className="mt-2 text-3xl font-semibold">Register New Patient</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">Create the patient identity, assign the OPD doctor and optionally continue to staff-assisted report digitization.</p>
    </div>

    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={submitted&&form.name.trim().length<2?"Enter the patient's name.":undefined}><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Rahul Kumar"/></Field>
        <Field label="Age" error={submitted&&!(Number(form.age)>0&&Number(form.age)<=120)?"Enter age 1–120.":undefined}><input type="number" min="1" max="120" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="42"/></Field>
        <Field label="Gender" error={submitted&&!form.gender?"Select gender.":undefined}><select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select></Field>
        <Field label="Preferred language"><select value={form.language} onChange={e=>setForm({...form,language:e.target.value})}>{languages.map(l=><option key={l}>{l}</option>)}</select></Field>
        <Field label="Mobile number" error={submitted&&form.mobile.replace(/\D/g,"").length!==10?"Enter a 10-digit number.":undefined}><div className="flex"><span className="flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">+91</span><input inputMode="numeric" maxLength={10} value={form.mobile} onChange={e=>setForm({...form,mobile:e.target.value.replace(/\D/g,"")})} placeholder="9876543210" className="w-full rounded-r-lg border border-input bg-background px-4 py-3 text-sm"/></div></Field>
        <Field label="Assign OPD doctor"><select value={form.doctorId} onChange={e=>setForm({...form,doctorId:e.target.value})}>{doctors.map(d=><option key={d.id} value={d.id}>{d.name} • {d.department} • {d.id}</option>)}</select></Field>
      </div>
      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"><input type="checkbox" checked={form.digitize} onChange={e=>setForm({...form,digitize:e.target.checked})} className="mt-1 h-4 w-4"/><span><span className="block text-sm font-medium">Digitize previous medical history now</span><span className="mt-1 block text-xs leading-5 text-muted-foreground">After creating the account, continue to staff-assisted report upload.</span></span></label>
      <div className="mt-6 flex justify-end gap-3 border-t border-border pt-6"><button type="button" onClick={()=>navigate({to:"/staff/patients"})} className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">Cancel</button><button type="button" onClick={save} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Create Patient <ArrowRight className="h-4 w-4"/></button></div>
    </section>
  </StaffLayout>;
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <div><label className="mb-2 block text-sm font-medium">{label}</label>{children}{error&&<p className="mt-1.5 text-xs text-destructive">{error}</p>}</div>}

import { createFileRoute } from "@tanstack/react-router";
import { Building2, Check, HeartPulse, MapPin, Pencil, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { StaffLayout } from "@/components/portal/StaffLayout";
import { getHealthCentre } from "@/data/clinovaStore";

export const Route = createFileRoute("/staff/health-centre")({ component: HealthCentreProfile });

function HealthCentreProfile() {
  const centre = getHealthCentre();
  const [editing,setEditing]=useState(false);
  const [name,setName]=useState(centre.name);
  const [location,setLocation]=useState(centre.location);
  const [saved,setSaved]=useState(false);

  return <StaffLayout>
    <div className="mb-7"><p className="text-sm font-medium text-primary">CENTRE ACCOUNT</p><h1 className="mt-2 text-3xl font-semibold">Health Centre Profile</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">The health centre is the top-level organisation. Doctors, staff and patients created here belong to this centre.</p></div>
    <section className="rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex items-center gap-4 border-b border-border p-6 lg:p-8"><div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary"><Building2 className="h-7 w-7"/></div><div><h2 className="text-xl font-semibold">{centre.name}</h2><p className="mt-1 text-sm text-muted-foreground">{centre.id}</p></div></div>
      <div className="grid gap-6 p-6 lg:grid-cols-2 lg:p-8">
        <div><label className="mb-2 block text-sm font-medium">Health Centre ID</label><div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm font-semibold">{centre.id}</div><p className="mt-2 text-xs text-muted-foreground">System-issued identifier. It should not be manually changed.</p></div>
        <div><label className="mb-2 block text-sm font-medium">Centre type</label><div className="rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm">{centre.type}</div></div>
        <div><label className="mb-2 block text-sm font-medium">Centre name</label><input disabled={!editing} value={name} onChange={e=>setName(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm disabled:bg-muted/30"/></div>
        <div><label className="mb-2 block text-sm font-medium">Location</label><div className="flex"><span className="flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3"><MapPin className="h-4 w-4 text-muted-foreground"/></span><input disabled={!editing} value={location} onChange={e=>setLocation(e.target.value)} className="w-full rounded-r-lg border border-input bg-background px-4 py-3 text-sm disabled:bg-muted/30"/></div></div>
      </div>
      <div className="flex justify-end gap-3 border-t border-border p-6 lg:px-8">
        {editing ? <><button type="button" onClick={()=>{setEditing(false);setName(centre.name);setLocation(centre.location)}} className="rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted">Cancel</button><button type="button" onClick={()=>{setEditing(false);setSaved(true)}} className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Check className="h-4 w-4"/> Save</button></> : <button type="button" onClick={()=>{setEditing(true);setSaved(false)}} className="inline-flex items-center gap-2 rounded-lg border border-input px-4 py-2.5 text-sm font-medium hover:bg-muted"><Pencil className="h-4 w-4"/> Edit Profile</button>}
      </div>
    </section>
    {saved&&<div className="mt-5 flex items-center gap-3 rounded-xl bg-primary/10 p-4 text-sm text-primary"><Check className="h-5 w-5"/> Prototype profile changes saved for this session.</div>}
    <div className="mt-6 flex gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-primary"/><p className="text-xs leading-5 text-muted-foreground">Production will add verified organisation identity, administrator permissions, audit logs and secure authentication here.</p></div>
  </StaffLayout>
}

import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  FileText,
  HeartPulse,
  Languages,
  LockKeyhole,
  Mic,
  ShieldCheck,
  UserRound,
  HelpCircle,
  Smartphone,
  UserCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  getDoctorById,
  getPatientById,
  getPatients,
  setActivePatient,
  updatePatient,
} from "@/data/clinovaStore";

export const Route = createFileRoute("/patient")({ component: PatientPortal });

const languages = ["Telugu", "Hindi", "English", "Gujarati", "Tamil", "Kannada", "Malayalam"];

type LoginMode = "otp" | "staff";
type Screen = "home" | "history" | "reports" | "verify";

function PatientPortal() {
  const patients = getPatients();

  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");

  // Patient login is intentionally mobile-first. Patient ID is never requested from the patient.
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState("");
  const [loginError, setLoginError] = useState("");

  // Help flow: staff can locate the account using the issued Patient ID and verify identity.
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpStep, setHelpStep] = useState<"id" | "verify" | "granted">("id");
  const [staffPatientId, setStaffPatientId] = useState("");
  const [staffPatient, setStaffPatient] = useState<ReturnType<typeof getPatientById>>();
  const [staffVerified, setStaffVerified] = useState(false);
  const [staffError, setStaffError] = useState("");

  const [patientId, setPatientId] = useState("");
  const [answer, setAnswer] = useState("");
  const [language, setLanguage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const patient = loggedIn ? getPatientById(patientId) : undefined;

  function findPatientByMobile() {
    const clean = mobile.replace(/\D/g, "");
    return patients.find((p) => p.mobile.replace(/\D/g, "") === clean);
  }

  function sendOtp() {
    setLoginError("");
    const clean = mobile.replace(/\D/g, "");

    if (clean.length !== 10) {
      setLoginError("Enter your registered 10-digit mobile number.");
      return;
    }

    const matched = findPatientByMobile();

    if (!matched) {
      setLoginError(
        "We couldn't find a patient account with this mobile number. Please use Help for staff-assisted access."
      );
      return;
    }

    // Prototype only: real SMS/OTP service will replace this.
    const generated = "123456";
    setDemoOtp(generated);
    setOtpSent(true);
  }

  function verifyOtp() {
    setLoginError("");

    if (otp !== demoOtp) {
      setLoginError("Incorrect OTP. Please check the OTP and try again.");
      return;
    }

    const matched = findPatientByMobile();
    if (!matched) {
      setLoginError("Patient account could not be found.");
      return;
    }

    setPatientId(matched.id);
    setActivePatient(matched.id);
    setLanguage(matched.language);
    setLoggedIn(true);
    setOtpSent(false);
    setOtp("");
  }

  function staffLookup() {
    setStaffError("");
    const id = staffPatientId.trim().toUpperCase();
    const matched = getPatientById(id);

    if (!matched) {
      setStaffPatient(undefined);
      setStaffError("Patient ID not found. Ask the staff member to check the issued ID.");
      return;
    }

    setStaffPatient(matched);
    setStaffVerified(false);
    setHelpStep("verify");
  }

  function grantStaffAccess() {
    if (!staffPatient || !staffVerified) return;

    setPatientId(staffPatient.id);
    setActivePatient(staffPatient.id);
    setLanguage(staffPatient.language);
    setLoggedIn(true);
    setHelpStep("granted");
    setHelpOpen(false);
  }

  function submitHistory() {
    if (!patient) return;

    updatePatient(patient.id, {
      currentComplaint: answer,
      complaint: answer || patient.complaint,
      language: language || patient.language,
      historyCompleted: true,
    });

    setScreen("verify");
  }

  if (!loggedIn) {
    return (
      <Shell>
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <HeartPulse className="h-7 w-7" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold">Patient Portal</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your mobile number to securely access your health information.
            </p>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-4">
              <Smartphone className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Login with your mobile number</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We will send a one-time password to your registered mobile.
                </p>
              </div>
            </div>

            <label className="mt-6 block text-sm font-medium">Mobile number</label>
            <div className="mt-2 flex">
              <span className="flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-3 text-sm text-muted-foreground">
                +91
              </span>
              <input
                inputMode="numeric"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, ""));
                  setLoginError("");
                }}
                maxLength={10}
                placeholder="9876543210"
                className="w-full rounded-r-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary"
                disabled={otpSent}
              />
            </div>

            {otpSent && (
              <>
                <label className="mt-5 block text-sm font-medium">Enter OTP</label>
                <input
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ""));
                    setLoginError("");
                  }}
                  maxLength={6}
                  placeholder="6-digit OTP"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm tracking-[0.3em] outline-none focus:border-primary"
                />

                <div className="mt-3 rounded-lg border border-dashed border-primary/30 bg-primary/5 px-3 py-2 text-xs text-muted-foreground">
                  Prototype only: use OTP <b className="text-foreground">{demoOtp}</b>. In the real system this will be sent by SMS.
                </div>
              </>
            )}

            {loginError && (
              <p className="mt-3 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
                {loginError}
              </p>
            )}

            {!otpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Send OTP <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setLoginError("");
                  }}
                  className="flex-1 rounded-lg border border-input px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  Change number
                </button>
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Verify OTP <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setHelpOpen(true);
                setHelpStep("id");
                setStaffError("");
                setStaffPatient(undefined);
                setStaffVerified(false);
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-background px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5"
            >
              <HelpCircle className="h-4 w-4" />
              Can't receive OTP? Get help at the hospital
            </button>

            <div className="mt-5 flex gap-3 rounded-xl bg-muted/50 p-4">
              <LockKeyhole className="h-5 w-5 shrink-0 text-primary" />
              <p className="text-xs leading-5 text-muted-foreground">
                Your mobile number is used only to find your registered patient account. OTP verification confirms access.
              </p>
            </div>
          </section>
        </div>

        {helpOpen && (
          <StaffAccessModal
            step={helpStep}
            patientId={staffPatientId}
            setPatientId={setStaffPatientId}
            patient={staffPatient}
            verified={staffVerified}
            setVerified={setStaffVerified}
            error={staffError}
            onLookup={staffLookup}
            onGrant={grantStaffAccess}
            onClose={() => setHelpOpen(false)}
          />
        )}
      </Shell>
    );
  }

  if (!patient) return null;

  if (screen === "history") {
    return (
      <Shell>
        <Back onClick={() => setScreen("home")} />
        <div className="mx-auto max-w-3xl">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <p className="text-sm font-medium text-primary">{language}</p>
            <h1 className="mt-2 text-2xl font-semibold">Tell us about your current problem</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Use your own words. You can type or speak. The clinical system will structure the response later.
            </p>

            <div className="mt-7 rounded-xl bg-muted/40 p-5 text-lg font-medium">
              {language === "Telugu"
                ? "మీకు ప్రస్తుతం ఏ సమస్య ఉంది?"
                : "What problem are you currently experiencing?"}
            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              placeholder={
                language === "Telugu"
                  ? "మీ సమాధానాన్ని ఇక్కడ టైప్ చేయండి..."
                  : "Type your answer here..."
              }
              className="mt-5 w-full resize-none rounded-xl border border-input bg-background p-4 text-sm outline-none focus:border-primary"
            />

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-border p-4 text-sm font-medium hover:bg-muted/40"
            >
              <Mic className="h-5 w-5 text-primary" />
              Tap to answer by voice
            </button>

            <button
              type="button"
              onClick={submitHistory}
              className="mt-6 ml-auto flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          </section>
        </div>
      </Shell>
    );
  }

  if (screen === "reports") {
    return (
      <Shell>
        <Back onClick={() => setScreen("home")} />
        <div className="mx-auto max-w-3xl">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold">Previous Medical Reports</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              These documents were added by hospital staff. Original documents remain separate from AI-processed information.
            </p>

            <div className="mt-6 space-y-3">
              {patient.documents.length ? (
                patient.documents.map((document, index) => (
                  <div key={`${document}-${index}`} className="flex items-center gap-3 rounded-xl border border-border p-4">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="flex-1 text-sm">{document}</span>
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No previous reports have been added yet.
                </div>
              )}
            </div>
          </section>
        </div>
      </Shell>
    );
  }

  if (screen === "verify") {
    return (
      <Shell>
        <div className="mx-auto max-w-3xl">
          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <div>
                <h1 className="text-2xl font-semibold">Verify your information</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Check before your information is sent for doctor review.
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <Row label="Patient" value={patient.name} />
              <Row label="Patient ID" value={patient.id} />
              <Row
                label="Assigned Doctor"
                value={getDoctorById(patient.assignedDoctorId)?.name ?? patient.assignedDoctorId}
              />
              <Row label="Current complaint" value={patient.currentComplaint || "Not provided"} />
              <Row label="Previous reports" value={`${patient.documents.length} document(s) available`} />
            </div>

            <label className="mt-6 flex gap-3 rounded-xl border border-border p-4">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 h-4 w-4"
              />
              <span className="text-sm">I confirm that this information is correct.</span>
            </label>

            <button
              type="button"
              disabled={!confirmed}
              onClick={() => setScreen("home")}
              className="mt-6 w-full rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              Confirm & Submit
            </button>
          </section>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-primary/5 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Clinova Patient Assistant</p>
                <p className="text-xs text-muted-foreground">
                  {patient.name} • {patient.language}
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-[520px] p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-muted/60 px-5 py-4">
                <p className="text-base leading-7">
                  {language === "Telugu"
                    ? `నమస్కారం ${patient.name.split(" ")[0]} 👋 ఈరోజు మిమ్మల్ని ఆసుపత్రికి తీసుకువచ్చిన సమస్య ఏమిటి?`
                    : `Hello ${patient.name.split(" ")[0]} 👋 What happened? Please tell me what brought you to the hospital today.`}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  You can speak naturally. You don't need to use medical terms.
                </p>
              </div>
            </div>

            {answer && (
              <div className="mt-6 flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-5 py-4 text-sm text-primary-foreground">
                  {answer}
                </div>
              </div>
            )}

            <div className="mt-8">
              <label className="text-sm font-medium">
                {language === "Telugu" ? "మీ సమాధానం" : "Your answer"}
              </label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={4}
                autoFocus
                placeholder={
                  language === "Telugu"
                    ? "ఇక్కడ టైప్ చేయండి..."
                    : "Type what happened in your own words..."
                }
                className="mt-2 w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm outline-none transition focus:border-primary"
              />

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-4 text-sm font-medium hover:bg-muted/40"
                >
                  <Mic className="h-5 w-5 text-primary" />
                  Speak your answer
                </button>

                <button
                  type="button"
                  onClick={submitHistory}
                  disabled={!answer.trim()}
                  className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue conversation
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/40 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-xs leading-5 text-muted-foreground">
                  The assistant will ask one question at a time and collect your
                  history before preparing information for your doctor.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-4 flex items-center justify-between px-1 text-xs text-muted-foreground">
          <span>Patient: {patient.id}</span>
          <span>{language}</span>
        </div>
      </div>
    </Shell>
  );
}

function StaffAccessModal({
  step,
  patientId,
  setPatientId,
  patient,
  verified,
  setVerified,
  error,
  onLookup,
  onGrant,
  onClose,
}: {
  step: "id" | "verify" | "granted";
  patientId: string;
  setPatientId: (value: string) => void;
  patient?: ReturnType<typeof getPatientById>;
  verified: boolean;
  setVerified: (value: boolean) => void;
  error: string;
  onLookup: () => void;
  onGrant: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="Close help" />

      <section className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <HelpCircle className="h-5 w-5" />
              <p className="text-sm font-semibold">Need help accessing your account?</p>
            </div>
            <h2 className="mt-2 text-xl font-semibold">Staff-assisted access</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              A hospital staff member can verify your identity and grant temporary access when you cannot receive an OTP.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-muted" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {step === "id" && (
            <>
              <label className="block text-sm font-medium">Patient ID</label>
              <input
                value={patientId}
                onChange={(e) => {
                  setPatientId(e.target.value.toUpperCase());
                }}
                placeholder="Example: PAT-GJ-00001"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm"
              />
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                The staff member enters the Patient ID issued by the hospital. The patient does not need to remember or enter it themselves.
              </p>

              {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

              <button
                type="button"
                onClick={onLookup}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Find Patient <ArrowRight className="h-4 w-4" />
              </button>
            </>
          )}

          {step === "verify" && patient && (
            <>
              <div className="rounded-2xl border border-border bg-muted/30 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UserRound className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.gender}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-primary">{patient.id}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">Registered mobile</p>
                    <p className="mt-1 text-sm font-medium">+91 ••••••{patient.mobile.slice(-4)}</p>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <p className="text-[11px] text-muted-foreground">Preferred language</p>
                    <p className="mt-1 text-sm font-medium">{patient.language}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-amber-300/50 bg-amber-50 p-4 text-sm">
                <p className="font-semibold">Staff verification required</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Staff should compare the displayed name and profile information with the patient and, where available, the hospital profile photo/ID before granting access.
                </p>
              </div>

              <label className="mt-5 flex items-start gap-3 rounded-xl border border-border p-4">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <span className="text-sm">
                  I am hospital staff and I have verified that this patient matches the displayed identity.
                </span>
              </label>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPatientId("");
                  }}
                  className="flex-1 rounded-lg border border-input px-4 py-3 text-sm font-medium hover:bg-muted"
                >
                  Search again
                </button>
                <button
                  type="button"
                  disabled={!verified}
                  onClick={onGrant}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-50"
                >
                  <UserCheck className="h-4 w-4" />
                  Grant Access
                </button>
              </div>
            </>
          )}
        </div>

        <div className="border-t border-border bg-muted/30 px-6 py-4">
          <p className="text-xs leading-5 text-muted-foreground">
            Prototype workflow: staff verification is recorded only in the current browser. Production will require authenticated staff accounts, audit logs, consent/access reason and time-limited sessions.
          </p>
        </div>
      </section>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 lg:px-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Clinova</p>
            <p className="text-xs text-muted-foreground">Patient Portal</p>
          </div>
        </div>
      </header>
      <main className="px-4 py-8 lg:px-8">{children}</main>
    </div>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
    >
      ← Back
    </button>
  );
}

function Card({
  icon,
  title,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-border bg-background p-5 text-left hover:border-primary/40 hover:bg-primary/5"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <h2 className="mt-4 font-semibold">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
        Open <ArrowRight className="h-4 w-4" />
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

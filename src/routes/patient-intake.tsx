import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, HeartPulse, Languages, UserRound } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/patient-intake")({
  component: PatientIntake,
});

const languages = [
  { value: "Telugu", label: "తెలుగు", english: "Telugu" },
  { value: "Hindi", label: "हिन्दी", english: "Hindi" },
  { value: "English", label: "English", english: "English" },
  { value: "Gujarati", label: "ગુજરાતી", english: "Gujarati" },
  { value: "Tamil", label: "தமிழ்", english: "Tamil" },
  { value: "Kannada", label: "ಕನ್ನಡ", english: "Kannada" },
  { value: "Malayalam", label: "മലയാളം", english: "Malayalam" },
];

function PatientIntake() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("Telugu");
  const [mobile, setMobile] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isValid =
    fullName.trim().length >= 2 &&
    Number(age) > 0 &&
    Number(age) <= 120 &&
    gender !== "" &&
    language !== "" &&
    mobile.replace(/\D/g, "").length === 10;

  function handleContinue() {
    if (!isValid) {
      setSubmitted(true);
      return;
    }
    // V1: keep this local. Later this will create/fetch the patient
    // through the FastAPI backend and database.
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold leading-tight">AI Patient Assistant</div>
              <div className="text-sm text-muted-foreground">Tertiary Government Hospital</div>
            </div>
          </div>
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium">Patient Intake</div>
            <div className="text-xs text-muted-foreground">Secure registration</div>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 lg:px-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</div>
          <div className="text-sm font-medium">Basic information</div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm text-muted-foreground">2</div>
          <div className="hidden text-sm text-muted-foreground sm:block">Medical history</div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-sm text-muted-foreground">3</div>
          <div className="hidden text-sm text-muted-foreground sm:block">Previous reports</div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl px-4 py-8 lg:px-8 lg:py-12">
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctor Dashboard
        </button>

        <section className="rounded-2xl border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-6 lg:px-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserRound className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Patient Registration</h1>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Let&apos;s start with a few basic details. This information will be used to create the patient&apos;s clinical profile.
            </p>
          </div>

          <form
            className="space-y-6 px-6 py-6 lg:px-8 lg:py-8"
            onSubmit={(event) => {
              event.preventDefault();
              handleContinue();
            }}
          >
            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-medium">
                Full name <span className="text-destructive">*</span>
              </label>
              <input
                id="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Enter patient's full name"
                autoComplete="name"
                className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                  submitted && fullName.trim().length < 2 ? "border-destructive" : "border-input"
                }`}
              />
              {submitted && fullName.trim().length < 2 && (
                <p className="mt-1.5 text-xs text-destructive">Please enter the patient&apos;s full name.</p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="age" className="mb-2 block text-sm font-medium">
                  Age <span className="text-destructive">*</span>
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="e.g. 42"
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    submitted && !(Number(age) > 0 && Number(age) <= 120) ? "border-destructive" : "border-input"
                  }`}
                />
                {submitted && !(Number(age) > 0 && Number(age) <= 120) && (
                  <p className="mt-1.5 text-xs text-destructive">Enter an age between 1 and 120.</p>
                )}
              </div>

              <div>
                <label htmlFor="gender" className="mb-2 block text-sm font-medium">
                  Gender <span className="text-destructive">*</span>
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className={`w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    submitted && gender === "" ? "border-destructive" : "border-input"
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="language" className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Languages className="h-4 w-4 text-primary" />
                Preferred language <span className="text-destructive">*</span>
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                {languages.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label} — {item.english}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-muted-foreground">
                This will determine the language used for patient-facing questions and voice interaction.
              </p>
            </div>

            <div>
              <label htmlFor="mobile" className="mb-2 block text-sm font-medium">
                Mobile number <span className="text-destructive">*</span>
              </label>
              <div className="flex">
                <div className="flex items-center rounded-l-lg border border-r-0 border-input bg-muted px-4 text-sm text-muted-foreground">+91</div>
                <input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={mobile}
                  onChange={(event) => setMobile(event.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile number"
                  autoComplete="tel"
                  className={`min-w-0 flex-1 rounded-r-lg border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                    submitted && mobile.replace(/\D/g, "").length !== 10 ? "border-destructive" : "border-input"
                  }`}
                />
              </div>
              {submitted && mobile.replace(/\D/g, "").length !== 10 && (
                <p className="mt-1.5 text-xs text-destructive">Enter a valid 10-digit mobile number.</p>
              )}
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">Patient data stays protected</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    This prototype keeps registration data in the current browser session. Hospital database, consent and identity integrations will be connected later.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => navigate({ to: "/" })}
                className="rounded-lg border border-input px-5 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          AI Patient Assistant • Prototype / Demo Environment
        </p>
      </main>
    </div>
  );
}

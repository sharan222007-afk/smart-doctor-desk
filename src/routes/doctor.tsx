import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, HeartPulse, LockKeyhole, RefreshCw, Stethoscope } from "lucide-react";
import { useState } from "react";
import { getDoctors, setActiveDoctor } from "@/data/clinovaStore";

export const Route = createFileRoute("/doctor")({ component: DoctorLogin });

function DoctorLogin() {
  const navigate = useNavigate();
  const doctors = getDoctors();

  const [mobile, setMobile] = useState("");
  const [matchedDoctor, setMatchedDoctor] = useState<(typeof doctors)[number] | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  function findDoctor() {
    setError("");
    setOtpMessage("");
    setOtp("");
    setOtpSent(false);

    const normalizedMobile = mobile.replace(/\D/g, "");

    if (normalizedMobile.length !== 10) {
      setMatchedDoctor(null);
      setError("Enter the registered 10-digit mobile number.");
      return;
    }

    const doctor = doctors.find(
      (item) => item.mobile.replace(/\D/g, "") === normalizedMobile,
    );

    if (!doctor) {
      setMatchedDoctor(null);
      setError("No doctor account is registered with this mobile number.");
      return;
    }

    setMatchedDoctor(doctor);
    setOtpSent(true);
    setOtpMessage("OTP sent to the registered mobile number.");
  }

  function verifyOtp() {
    setError("");

    // Prototype OTP only. Replace with hospital-approved OTP service in production.
    if (otp !== "123456") {
      setError("Incorrect OTP. For this prototype, use 123456.");
      return;
    }

    if (!matchedDoctor) {
      setError("Please enter your registered mobile number first.");
      return;
    }

    setActiveDoctor(matchedDoctor.id);
    navigate({ to: "/" });
  }

  function changeNumber() {
    setMatchedDoctor(null);
    setOtpSent(false);
    setOtp("");
    setError("");
    setOtpMessage("");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4 lg:px-8">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <HeartPulse className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold">Clinova</p>
            <p className="text-xs text-muted-foreground">Doctor Portal</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Stethoscope className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-2xl font-semibold">Doctor Sign In</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Enter your registered mobile number to continue.
          </p>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
          {!matchedDoctor ? (
            <>
              <label className="block text-sm font-medium">Registered mobile number</label>
              <input
                value={mobile}
                onChange={(event) => {
                  setMobile(event.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                inputMode="numeric"
                autoComplete="tel"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />

              {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

              <button
                type="button"
                onClick={findDoctor}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Doctor account found</p>
                    <p className="mt-1 text-base font-semibold">{matchedDoctor.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Doctor ID: <span className="font-medium text-foreground">{matchedDoctor.id}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{matchedDoctor.department}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium">Enter OTP</label>
                <input
                  value={otp}
                  onChange={(event) => {
                    setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setError("");
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder="6-digit OTP"
                  className="mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-center text-lg tracking-[0.35em] outline-none focus:ring-2 focus:ring-primary/30"
                />

                {otpMessage && (
                  <p className="mt-2 text-xs text-muted-foreground">{otpMessage}</p>
                )}
                {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

                <button
                  type="button"
                  onClick={verifyOtp}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Verify & Open Dashboard <ArrowRight className="h-4 w-4" />
                </button>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={changeNumber}
                    className="font-medium text-muted-foreground hover:text-foreground"
                  >
                    Change mobile number
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpMessage("A new prototype OTP has been sent.")}
                    className="inline-flex items-center gap-1 font-medium text-primary"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Resend OTP
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="mt-6 flex gap-3 rounded-xl bg-primary/5 p-4">
            <LockKeyhole className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-xs leading-5 text-muted-foreground">
              Prototype OTP flow only. Production will use a hospital-approved
              authentication service, MFA and role-based access.
            </p>
          </div>

          {matchedDoctor && (
            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              Prototype OTP: <span className="font-semibold">123456</span>
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

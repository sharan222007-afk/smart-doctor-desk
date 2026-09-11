# Doctor's Dashboard

Build: AI Patient Assistant — Doctor Dashboard V1

Build a polished, responsive web application for our Smart India Hackathon project called AI Patient Assistant.

This is the Doctor Dashboard of a larger patient-facing clinical-history system.

IMPORTANT BUILD RULES

Build this as a real React/TypeScript application using the project's existing/default stack.

Use Tailwind CSS and reusable components.

Do NOT implement fake API calls or pretend that AI/OCR/ABHA/HIS/ABDM integrations are working.

Use realistic local demo data for now.

Create clean integration points so real services can be connected later.

The dashboard must feel like a serious government-hospital clinical application, not a generic SaaS dashboard.

Prioritize clarity, speed, accessibility and information density.

Do not use excessive animations.

Do not redesign the workflow into something different from the specification below.

The uploaded HTML reference named doctor_dashboard_updates (3).html is the primary visual/reference specification. Recreate its overall information architecture, layout and interactions as a proper React application rather than simply copying the HTML.

1. APPLICATION SHELL

Create a full-screen doctor dashboard.

Header

Left:

Hospital icon/logo

AI Patient Assistant

Subtitle: Tertiary Government Hospital

Center/right:

Doctor Dashboard

Subtitle: Better information. Better care.

Right:

Doctor avatar/icon

Dr. Meera Sharma

Department: General Medicine

Dropdown indicator

Use a clean white header with a subtle bottom border.

2. LEFT OPD QUEUE

Create a fixed-width left sidebar around 300px.

Header:

OPD Waiting Queue (Triage)

Include:

patient search field

search icon

Display demo patients.

Patient 1 — Active

Name:
Rahul Kumar

Details:
42 Yrs • Male • ID: TH-01452

Triage:
Moderate

Complaint:
Fever & Cough (3 days)

Assignment:
Active: Dr. M. Sharma (You)

This patient should initially be selected.

Patient 2

Name:
Suresh Patel

Details:
55 Yrs • Male

Triage:
High Risk

Complaint:
Chest Pain & Breathlessness

Show:

Case Locked: Dr. A. Desai (Returning)

This patient should visually appear locked.

Patient 3

Name:
Anjali Desai

Details:
28 Yrs • Female

Triage:
Routine

Show:

Assigned: Dr. K. Reddy

Queue interaction

Clicking an available patient should select that patient and update the main dashboard.

Locked cases should clearly communicate that the current doctor cannot claim them.

Search should filter the visible queue.

For V1, use local demo state only.

3. MAIN DASHBOARD

The main content area should be scrollable independently of the header/sidebar.

At the top create three modes:

Mode 1

Allopathy (MBBS)

Mode 2

AYUSH Mode

Mode 3

Patient View

Also provide:

Open Patient Voice Transcript

button.

The mode tabs should actually work.

4. PATIENT INFORMATION BAR

Create a prominent patient information card.

For Rahul Kumar show:

Name:
Rahul Kumar

Age:
42

Gender:
Male

Patient ID:
TH-01452

Language:
Telugu

Visit Date:
07 Sep 2026

Use a compact horizontal layout on desktop and responsive layout on smaller screens.

5. AI ANALYSIS CARD

Create a card titled:

AI ANALYSIS

Subtitle:

Information processed / completed

Show:

75%

and:

9 of 12 information sections processed

Use a progress bar.

Show these sections:

Completed:

Personal Information

Current Complaint

Past Medical History

Current Medications

Previous Documents

Symptoms

Incomplete:

Allergy History

Family History

Previous Surgery

Completed items should have check indicators.

Incomplete items should be visually distinct.

IMPORTANT:

This is only demo state.

Do not claim an actual AI analysis has occurred.

6. MISSING / NEEDS ATTENTION

Create a card titled:

MISSING / NEEDS ATTENTION

Subtitle:

Additional information required for complete analysis

Show:

Allergy History

Not provided by patient

Family History

Not provided by patient

Previous Surgery

Not provided by patient

Include:

Collect Information (Staff Assistance)

button.

For V1, clicking the button can open a small modal explaining that staff-assisted collection is a future workflow.

7. AI-GENERATED CLINICAL SUMMARY

Create a card titled:

AI-GENERATED CLINICAL SUMMARY

Add a badge:

AI extracted - physician verified

For the demo patient display:

Chief Complaint

Fever and cough for 3 days

Past Medical History

Diabetes (Type 2)

Current Medication

Metformin 500mg

Allergies

Information unavailable

IMPORTANT:

Clearly communicate that AI-generated information is not authoritative until verified by the physician.

Do not present AI output as medical advice.

8. DOCTOR INSTRUCTIONS / DECISION SUPPORT

Create a card:

DOCTOR INSTRUCTIONS

Subtitle:

Decision support for physician review

Show three demo alerts:

URGENT REVIEW

Fever duration exceeds 72 hours

VERIFY

Confirm dosage of diabetes medication

ABHA SYNC

Longitudinal past records successfully attached

These are demonstration data only.

Do not imply that a real clinical decision-support engine is currently running.

9. PREVIOUS VERIFIED MEDICAL RECORD

Create a large card:

PREVIOUS VERIFIED MEDICAL RECORD (ABHA ID SYNC)

Subtitle:

Automatically fetched from government health database

For V1 this is demo/mock data.

Show:

Diabetes (Type 2)

Physician verified on Jul 12, 2026

Status:
Verified

Metformin 500mg

Long-term maintenance dose

Status:
Verified

Historical records must visually appear immutable/read-only.

10. CURRENT VISIT

Create a card:

CURRENT VISIT

Subtitle:

New information from this consultation

Show:

New Complaint

Fever and cough for 3 days

Badge:
New

Uploaded Documents

Show:

Previous_Lab_Report.pdf

with PDF icon.

Label it:

Uploaded Documents (OCR Scanned)

IMPORTANT:

For V1, this is only a demo document entry.

Do not implement fake OCR.

11. PATIENT TIMELINE

Create a card:

PATIENT TIMELINE (READ-ONLY HISTORICAL RECORDS)

Show:

2 Previous Consultations

Build a horizontal timeline containing:

Current Visit

Sep 07, 2026

Dr. Meera Sharma (You)

Fever & cough

Pending diagnosis

Badge:
Current Visit

Previous Visit

Jul 12, 2026

Dr. A. Desai

Type 2 Diabetes

Metformin prescribed

Badge:
Verified (Read-Only)

Previous Visit

Mar 04, 2026

Dr. C. Reddy

Routine consultation

Badge:
Verified (Read-Only)

Clicking a historical visit should open a modal.

The modal should show:

Verified Past Record (Read-Only)

Date

Verifying physician

Physician verified assessment

A clear lock/read-only indicator.

Include Close button.

Historical records must not be editable.

12. DOCTOR'S FINAL ASSESSMENT

Create a visually distinct card:

DOCTOR'S FINAL ASSESSMENT & PRESCRIPTION

Subtitle:

Review AI data above. Enter final clinical notes to generate the official patient record.

Include editable fields:

Diagnosis / Clinical Notes

Demo value:

Suspected Viral Fever. Patient is stable. Continue diabetes medication.

Prescribed Medicines

Demo:

Tab Paracetamol 650mg (SOS)

Cough Syrup (10ml BD)

Advised Investigations / Lab Tests

Demo:

Complete Blood Count (CBC)

Dengue NS1 Antigen Test

These fields must be editable.

IMPORTANT:

This section represents the doctor's authoritative current-visit assessment, not AI output.

13. CASE ROUTING

Inside the doctor's assessment section create:

CASE ROUTING STATUS & DOCTOR LOCK

Two options:

Awaiting Lab Reports

Awaiting Lab Reports (Case Locked to Dr. Meera)

Description:

Patient will return after tests. Case stays securely locked to Dr. Meera Sharma. Other doctors cannot claim this case.

Case Complete

Case Complete / Discharged

Description:

Finalize consultation. No further tests required. Case closed and removed from active queue.

Use radio controls.

Make the selected state obvious.

14. BOTTOM ACTION BAR

Create a fixed bottom action bar.

Left:

Green status indicator:

System Online

For V1 do not claim actual ABHA/Bhashini synchronization. If mentioning integrations, label them as demo/simulation.

Right buttons:

Edit AI Data

Verify & Save

Send to HIS / ABDM →

Buttons should be functional at the UI level.

For V1:

Edit AI Data can enable/edit demo AI fields or show the editing state.

Verify & Save should show a confirmation state/toast.

Send to HIS / ABDM should show a clear "integration not connected — demo action" message.

Do NOT send real data anywhere.

15. PATIENT VIEW MODE

When Patient View is selected:

The dashboard should switch to a patient-friendly/read-only presentation.

Use Telugu demo content.

Example:

తీవ్రమైన జ్వరం మరియు దగ్గు (3 రోజుల నుండి)

మధుమేహం (షుగర్ వ్యాధి)

మెట్ఫార్మిన్ (షుగర్ బిళ్లలు)

The doctor's final assessment should become read-only.

The case-routing controls should be hidden/disabled.

The primary action can become:

Send PDF to Patient

but it must only display a demo confirmation and must not actually send anything.

16. AYUSH MODE

When AYUSH Mode is selected, adapt the terminology/content while preserving the dashboard structure.

Demo values:

Complaint:
Jeerna Jwara & Kasa (3 Days)

History:
Madhumeha

AYUSH Prakriti / Agni:
Vata-Pitta Shamak & Guduchi Vati

Previous record:
Madhumeha (Verified)

Previous treatment:
Guduchi / Triphala Churna

Primary action:

Upload to NAMASTE Portal →

But this must be a demo action only.

Do not claim a real NAMASTE integration.

17. PATIENT VOICE TRANSCRIPT

Clicking:

Open Patient Voice Transcript

should open a modal or dedicated view.

Show:

Patient's Exact Spoken Words

Telugu demo text:

"నమస్కారం డాక్టర్ గారు. నాకు గత మూడు రోజుల నుంచి బాగా జ్వరంగా ఉంది. మరియు దగ్గు కూడా ఉంది."

Then:

System Translated & Structured

"Hello Doctor. Patient reports acute fever and persistent cough for the past 3 days."

Clearly label this as:

Demo transcript

and:

Future Bhashini integration point

Do not make an actual external API call.

18. VISUAL DESIGN

Follow the reference closely.

Design characteristics:

professional hospital UI

light background

white cards

blue as primary interaction color

green for verified/success

amber for attention

red for urgent/high-risk

subtle borders

modest shadows

rounded cards

dense but readable information layout

Inter-style typography

minimal decorative graphics

Avoid:

gradients everywhere

excessive rounded/pill UI

huge headings

unnecessary illustrations

flashy animations

generic startup dashboard styling

The application should look like software used inside a serious tertiary government hospital.

19. RESPONSIVENESS

Desktop should be the primary target because this is a doctor workstation.

But also make it usable on tablets.

On smaller screens:

sidebar can collapse

cards can stack

horizontal timeline can become vertically scrollable

bottom action buttons can wrap

Do not allow important content to become horizontally inaccessible.

20. COMPONENT ARCHITECTURE

Use reusable components.

Suggested structure:

AppShell

Header

OPDQueue

PatientQueueItem

ModeTabs

PatientInfoCard

AIAnalysisCard

MissingInformationCard

ClinicalSummaryCard

DecisionSupportCard

VerifiedRecordsCard

CurrentVisitCard

PatientTimeline

PastRecordModal

DoctorAssessment

CaseRouting

VoiceTranscriptModal

BottomActionBar

Toast/Notification system

Use typed demo data objects rather than hardcoding everything directly into JSX.

21. DATA MODEL FOR V1

Create TypeScript interfaces for:

Patient

Doctor

Visit

MedicalRecord

AIAnalysis

ClinicalSummary

Document

TimelineEvent

DecisionSupportAlert

CaseRoutingStatus

Do not connect these to a database yet.

Keep the architecture ready for a future Supabase backend.

22. SAFETY / MEDICAL UX

This is a clinical-information support system.

Therefore:

Never present AI output as a diagnosis.

Clearly distinguish AI-extracted information from physician-verified information.

Historical verified records are read-only.

Current doctor assessment is editable.

Use "decision support" rather than "AI diagnosis".

Demo information must be visibly treated as sample/demo data where appropriate.

Never invent real patient data or claim a real external health-record connection.

23. V1 SUCCESS CRITERIA

When finished, I should be able to demonstrate this complete flow:

Doctor opens dashboard
→ sees OPD queue
→ selects Rahul Kumar
→ reviews patient information
→ sees AI processing status
→ sees missing information
→ reviews AI clinical summary
→ reviews decision-support alerts
→ reviews verified historical records
→ opens previous consultation
→ opens voice transcript
→ switches Allopathy → AYUSH → Patient View
→ edits doctor's assessment
→ selects case routing status
→ clicks Verify & Save
→ clicks Send to HIS / ABDM
→ receives a clear demo/integration-not-connected response.

Build this as a polished Doctor Dashboard V1 demo.

Do not implement real AI, OCR, Bhashini, ABHA, ABDM, HIS, or NAMASTE integrations yet.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e17e195d-d3a7-40cf-b7e2-3986a4b6418e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

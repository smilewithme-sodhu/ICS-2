"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategorySelectCard } from "@/components/CategoryCard";
import { Check, FormField } from "@/components/FormField";
import { UploadBox, type UploadState, type UploadValue } from "@/components/UploadBox";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/ui";
import { catBySlug, categories, states } from "@/lib/data";

type Draft = {
  category: string;
  name: string; dob: string; phone: string; email: string; city: string; state: string;
  gName: string; gRel: string; gPhone: string; gConsent: boolean;
  title: string; statement: string;
  terms: boolean; marketing: boolean;
};
const empty: Draft = { category: "", name: "", dob: "", phone: "", email: "", city: "", state: "", gName: "", gRel: "", gPhone: "", gConsent: false, title: "", statement: "", terms: false, marketing: false };

type StepId = "category" | "participant" | "guardian" | "artwork" | "review" | "payment" | "success";
type PayState = "idle" | "processing" | "failed" | "pending";

const DRAFT_KEY = "ics-s2-draft-v1";

function ageFrom(dob: string) {
  if (!dob) return null;
  const d = new Date(dob); if (isNaN(+d)) return null;
  const n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n < new Date(n.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a;
}

export function RegistrationFlow({ initialCategory }: { initialCategory: string }) {
  const [d, setD] = useState<Draft>({ ...empty, category: catBySlug(initialCategory) ? initialCategory : "" });
  const [step, setStep] = useState<StepId>("category");
  const [errors, setErrors] = useState<Partial<Record<keyof Draft | "art", string>>>({});
  const [art, setArt] = useState<UploadValue>(null);
  const [upStatus, setUpStatus] = useState<UploadState>("idle");
  const [pay, setPay] = useState<PayState>("idle");
  const [regId, setRegId] = useState("");
  const [restored, setRestored] = useState(false);
  const [toast, setToast] = useState("");
  const [demoFail, setDemoFail] = useState(false);       // payment demo
  const [demoUpFail, setDemoUpFail] = useState(false);   // upload demo
  const heading = useRef<HTMLHeadingElement>(null);

  const age = ageFrom(d.dob);
  const isMinor = age !== null && age < 18;
  const steps: StepId[] = useMemo(
    () => (isMinor ? ["category", "participant", "guardian", "artwork", "review", "payment"] : ["category", "participant", "artwork", "review", "payment"]),
    [isMinor],
  );
  const cat = catBySlug(d.category);
  const idx = steps.indexOf(step);

  // Restore draft (secure-enough: stays on this device, contains no payment data, no file).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Draft;
        setD((cur) => ({ ...saved, category: catBySlug(initialCategory) ? initialCategory : saved.category || cur.category }));
        if (Object.values(saved).some((v) => Boolean(v))) setRestored(true);
      }
    } catch { /* ignore corrupt draft */ }
  }, [initialCategory]);

  // Autosave on every change.
  useEffect(() => {
    if (step === "success") return;
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(d)); } catch { /* storage full/blocked */ }
  }, [d, step]);

  useEffect(() => { heading.current?.focus(); window.scrollTo({ top: 0 }); }, [step]);
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(""), 2400); return () => clearTimeout(t); } }, [toast]);

  const set = <K extends keyof Draft>(k: K) => (v: Draft[K]) => { setD((p) => ({ ...p, [k]: v })); setErrors((e) => ({ ...e, [k]: undefined })); };

  function validate(s: StepId) {
    const e: typeof errors = {};
    if (s === "category" && !d.category) e.category = "Choose a category to continue.";
    if (s === "participant") {
      if (d.name.trim().length < 2) e.name = "Enter your full name.";
      if (!d.dob) e.dob = "Enter your date of birth.";
      else if (age !== null && (age < 5 || age > 100)) e.dob = "Please check the date of birth.";
      if (!/^[6-9]\d{9}$/.test(d.phone)) e.phone = "Enter a 10-digit Indian mobile number.";
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = "Enter a valid email, e.g. name@example.com.";
      if (!d.city.trim()) e.city = "Enter your city.";
      if (!d.state) e.state = "Choose your state.";
    }
    if (s === "guardian") {
      if (d.gName.trim().length < 2) e.gName = "Enter the guardian's full name.";
      if (!d.gRel) e.gRel = "Select the relationship.";
      if (!/^[6-9]\d{9}$/.test(d.gPhone)) e.gPhone = "Enter a 10-digit mobile number.";
      if (!d.gConsent) e.gConsent = "Guardian consent is required for participants under 18.";
    }
    if (s === "artwork") {
      if (d.title.trim().length < 2) e.title = "Give your artwork a title.";
      if (!art) e.art = "Add your artwork to continue.";
      else if (upStatus === "uploading") e.art = "Please wait for the upload to finish.";
      else if (upStatus !== "done") e.art = "The upload didn't finish. Tap Retry upload.";
    }
    if (s === "review" && !d.terms) e.terms = "Please accept the rules and terms to continue.";
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(() => document.querySelector<HTMLElement>("[aria-invalid='true'], .error-text")?.scrollIntoView({ block: "center", behavior: "smooth" }), 30);
      return false;
    }
    return true;
  }

  const next = () => { if (validate(step)) setStep(steps[idx + 1]); };
  const back = () => { if (idx > 0) setStep(steps[idx - 1]); };

  function startPayment() {
    if (pay === "processing") return;
    setPay("processing");
    // Simulated gateway. Replace with real order creation + webhook-confirmed status.
    setTimeout(() => {
      if (demoFail) { setPay("failed"); setDemoFail(false); return; }
      setRegId(`ICS2-${Math.random().toString(36).slice(2, 8).toUpperCase()}`);
      try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
      setStep("success");
    }, 1600);
  }

  const total = cat?.fee ?? 0;
  const label = (n: number) => `Step ${n} of ${steps.length}`;

  return (
    <div className="container flow">
      {step !== "success" && (
        <div className="stepper" role="group" aria-label="Registration progress">
          <div className="stepper__bar" aria-hidden="true">
            {steps.map((s, i) => <span key={s} data-done={i <= idx} />)}
          </div>
          <div className="stepper__meta"><span>{label(idx + 1)}</span><span className="draft-note">✓ Progress saved on this device</span></div>
        </div>
      )}

      {restored && step === "category" && (
        <div className="notice notice--ok" style={{ maxWidth: "44rem", marginBottom: "var(--s-5)" }}>
          <h2>Welcome back</h2>
          <p className="small">We restored your saved details. <button className="btn btn--text small" style={{ minHeight: "2.5rem" }} onClick={() => { setD(empty); try { localStorage.removeItem(DRAFT_KEY); } catch {} setRestored(false); }}>Start fresh</button></p>
        </div>
      )}

      {/* STEP · CATEGORY */}
      {step === "category" && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>What do you create?</h1>
            <p className="muted">Pick the category that fits your artwork best.</p>
          </div>
          <div className="cat-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {categories.map((c) => <CategorySelectCard key={c.slug} c={c} selected={d.category === c.slug} onSelect={() => set("category")(c.slug)} />)}
          </div>
          {errors.category && <p className="error-text" role="alert">{errors.category}</p>}
          {cat && (
            <div className="notice notice--warn" aria-live="polite">
              <h2>{cat.name}</h2>
              <p className="small">{cat.rule}</p>
              <p className="small"><b>Entry fee: ₹{cat.fee}</b> (placeholder)</p>
            </div>
          )}
        </section>
      )}

      {/* STEP · PARTICIPANT */}
      {step === "participant" && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>About you</h1>
            <p className="muted">Only what we need to run the competition.</p>
          </div>
          <div className="form-grid form-grid--2">
            <div className="span-2"><FormField label="Full name" autoComplete="name" value={d.name} onChange={set("name")} error={errors.name} /></div>
            <FormField label="Date of birth" type="date" autoComplete="bday" hint="Used to check eligibility." value={d.dob} onChange={set("dob")} error={errors.dob} max={new Date().toISOString().slice(0, 10)} />
            <FormField label="Mobile number" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} hint="10 digits. We'll send your registration ID here." value={d.phone} onChange={(v) => set("phone")(v.replace(/\D/g, ""))} error={errors.phone} />
            <div className="span-2"><FormField label="Email" type="email" autoComplete="email" value={d.email} onChange={set("email")} error={errors.email} /></div>
            <FormField label="City" autoComplete="address-level2" value={d.city} onChange={set("city")} error={errors.city} />
            <FormField label="State" select={states} placeholder="Select your state" value={d.state} onChange={set("state")} error={errors.state} />
          </div>
          {isMinor && <div className="notice notice--warn" aria-live="polite"><h2>You&apos;re under 18</h2><p className="small">Next we&apos;ll ask for a parent or guardian&apos;s details and consent.</p></div>}
        </section>
      )}

      {/* STEP · GUARDIAN (conditional) */}
      {step === "guardian" && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>Parent or guardian</h1>
            <p className="muted">Required because the participant is under 18.</p>
          </div>
          <div className="form-grid form-grid--2">
            <div className="span-2"><FormField label="Guardian's full name" autoComplete="off" value={d.gName} onChange={set("gName")} error={errors.gName} /></div>
            <FormField label="Relationship" select={["Mother", "Father", "Legal guardian", "Other"]} placeholder="Select" value={d.gRel} onChange={set("gRel")} error={errors.gRel} />
            <FormField label="Guardian's mobile" type="tel" inputMode="numeric" maxLength={10} value={d.gPhone} onChange={(v) => set("gPhone")(v.replace(/\D/g, ""))} error={errors.gPhone} />
          </div>
          <div>
            <Check checked={d.gConsent} onChange={set("gConsent")}>I am the parent/guardian and I consent to this participation and to the <Link href="/legal#guardian">guardian terms</Link>.</Check>
            {errors.gConsent && <p className="error-text" role="alert">{errors.gConsent}</p>}
          </div>
        </section>
      )}

      {/* STEP · ARTWORK */}
      {step === "artwork" && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>Your artwork</h1>
            <p className="muted">{cat ? cat.rule : "Add a clear, well-lit photo of your work."}</p>
          </div>
          <FormField label="Artwork title" value={d.title} onChange={set("title")} error={errors.title} />
          <UploadBox value={art} onChange={setArt} status={upStatus} onStatus={(s) => { setUpStatus(s); setErrors((e) => ({ ...e, art: undefined })); }} simulateFail={demoUpFail} />
          {errors.art && <p className="error-text" role="alert">{errors.art}</p>}
          <FormField label="About this piece (optional)" hint="One or two lines — materials, idea, story." value={d.statement} onChange={set("statement")} />
          <label className="check small" style={{ cursor: "pointer" }}>
            <input type="checkbox" checked={demoUpFail} onChange={(e) => setDemoUpFail(e.target.checked)} />
            <span className="muted">Demo: simulate a failed upload on next try (your details stay safe)</span>
          </label>
        </section>
      )}

      {/* STEP · REVIEW */}
      {step === "review" && cat && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>Review &amp; confirm</h1>
            <p className="muted">Check everything. Nothing is charged yet.</p>
          </div>
          <div className="receipt">
            <dl>
              <div className="row"><dt>Category</dt><dd>{cat.name}<button className="btn btn--text edit" onClick={() => setStep("category")}>Edit</button></dd></div>
              <div className="row"><dt>Participant</dt><dd>{d.name}{age !== null && `, ${age}`}<button className="btn btn--text edit" onClick={() => setStep("participant")}>Edit</button></dd></div>
              <div className="row"><dt>Contact</dt><dd>{d.phone}<br />{d.email}</dd></div>
              <div className="row"><dt>Location</dt><dd>{d.city}, {d.state}</dd></div>
              {isMinor && <div className="row"><dt>Guardian</dt><dd>{d.gName} ({d.gRel})<button className="btn btn--text edit" onClick={() => setStep("guardian")}>Edit</button></dd></div>}
              <div className="row"><dt>Artwork</dt><dd>{d.title}<br /><span className="small muted">{art?.file.name}</span><button className="btn btn--text edit" onClick={() => setStep("artwork")}>Edit</button></dd></div>
              <div className="row row--total"><dt>Total</dt><dd>₹{total}</dd></div>
            </dl>
          </div>
          <div>
            <Check checked={d.terms} onChange={set("terms")}>I accept the <Link href="/legal#rules">competition rules</Link>, <Link href="/legal#terms">terms</Link>, <Link href="/legal#privacy">privacy policy</Link> and <Link href="/legal#refund">refund policy</Link>.</Check>
            {errors.terms && <p className="error-text" role="alert">{errors.terms}</p>}
            <Check checked={d.marketing} onChange={set("marketing")}>Send me updates about future ICS seasons <span className="muted">(optional)</span>.</Check>
          </div>
        </section>
      )}

      {/* STEP · PAYMENT */}
      {step === "payment" && cat && (
        <section className="flow__panel" aria-labelledby="h">
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>Payment</h1>
            <p className="muted">Entry fee for Indian Creative Star Season 02 — {cat.name}.</p>
          </div>
          <div className="price-box"><span>Total to pay</span><strong>₹{total}</strong></div>
          <p className="small muted">Paid to: <b>[Organiser legal name — add before launch]</b>. Secure checkout; we never store card details. See the <Link href="/legal#refund">refund policy</Link>.</p>

          {pay === "failed" && (
            <div className="notice notice--danger" role="alert">
              <h2>Payment didn&apos;t go through</h2>
              <p className="small">You haven&apos;t been charged for a failed attempt. All your details and your artwork are saved — just try again.</p>
            </div>
          )}
          {pay === "pending" && (
            <div className="notice notice--warn" role="status">
              <h2>Payment pending</h2>
              <p className="small">Your bank hasn&apos;t confirmed yet. Please don&apos;t pay again — we won&apos;t create a duplicate registration. Check status in a minute.</p>
              <div className="btn-row"><Button variant="secondary" onClick={() => setPay("idle")}>Check status</Button></div>
            </div>
          )}

          <Button block onClick={startPayment} disabled={pay === "processing" || pay === "pending"}>
            {pay === "processing" ? "Processing…" : pay === "failed" ? `Retry payment · ₹${total}` : `Pay ₹${total}`}
          </Button>

          <div className="sim">
            <p className="small"><b>Demo controls</b> — prototype only (no real payment)</p>
            <div className="btn-row">
              <Button variant="secondary" onClick={() => setDemoFail(true)}>Fail next attempt</Button>
              <Button variant="secondary" onClick={() => setPay("pending")}>Show pending state</Button>
            </div>
            {demoFail && <p className="xs muted">Next “Pay” will fail so you can see the retry state.</p>}
          </div>
        </section>
      )}

      {/* STEP · SUCCESS */}
      {step === "success" && (
        <section className="flow__panel" aria-labelledby="h" style={{ justifyItems: "start" }}>
          <svg className="success-mark" viewBox="0 0 72 72" fill="none" aria-hidden="true">
            <circle cx="36" cy="36" r="30" stroke="#1f6b4f" strokeWidth="4" />
            <path d="m23 37 9 9 17-19" stroke="#1f6b4f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <h1 id="h" className="flow__title" tabIndex={-1} ref={heading}>Registration confirmed.</h1>
            <p className="muted">Welcome to Season 02, {d.name.split(" ")[0]}. Here&apos;s everything in one place.</p>
          </div>
          <div className="stack">
            <p className="xs muted" style={{ textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700 }}>Registration ID</p>
            <span className="reg-id">{regId}
              <button onClick={() => { navigator.clipboard?.writeText(regId); setToast("Copied"); }}>Copy</button>
            </span>
          </div>
          <div className="receipt" style={{ width: "100%" }}>
            <dl>
              <div className="row"><dt>Submission</dt><dd><StatusBadge kind="submitted" /></dd></div>
              <div className="row"><dt>Category</dt><dd>{cat?.name}</dd></div>
              <div className="row"><dt>Artwork</dt><dd>{d.title}</dd></div>
              <div className="row row--total"><dt>Paid</dt><dd>₹{total}</dd></div>
            </dl>
          </div>
          <div className="stack">
            <h2 className="h3 display">What happens next</h2>
            <ol className="steps-list">
              <li><span>Your receipt and ID are saved in your dashboard.</span></li>
              <li><span>Your artwork goes into review. We&apos;ll update your status there.</span></li>
              <li><span>Watch Announcements for results and certificates.</span></li>
            </ol>
          </div>
          <div className="btn-row">
            <Button href="/dashboard">Go to my dashboard</Button>
            <Button href="/dashboard#support" variant="secondary">Need help?</Button>
          </div>
        </section>
      )}

      {step !== "success" && (
        <div className="flow__nav">
          {idx > 0 && <Button variant="secondary" onClick={back}>Back</Button>}
          {step !== "payment" && <Button onClick={next}>{step === "review" ? "Continue to payment" : "Continue"}</Button>}
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

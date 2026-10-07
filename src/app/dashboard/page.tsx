import type { Metadata } from "next";
import Link from "next/link";
import { ArtPlate } from "@/components/ArtPlate";
import { Button } from "@/components/Button";
import { StatusBadge, type BadgeKind } from "@/components/ui";
import { categories } from "@/lib/data";

export const metadata: Metadata = { title: "My dashboard", robots: { index: false } };

type S = "review" | "action" | "pending" | "shortlisted";
const demo: Record<S, { badge: BadgeKind; status: string; stage: number; action: null | { title: string; body: string; cta: string; href: string } }> = {
  review: { badge: "review", status: "Under review", stage: 2, action: null },
  action: {
    badge: "action", status: "Submission needs a correction", stage: 1,
    action: { title: "Re-upload a clearer photo of your artwork", body: "The judges couldn't see the edges of your piece. Upload a new photo before the correction deadline.", cta: "Fix my submission", href: "/register" },
  },
  pending: {
    badge: "pending", status: "Payment pending", stage: 0,
    action: { title: "Complete your payment of ₹499", body: "Your details and artwork are saved. Pay to confirm your place in Season 02.", cta: "Pay now", href: "/register" },
  },
  shortlisted: { badge: "shortlisted", status: "Shortlisted", stage: 3, action: null },
};
const stages = ["Registered", "Submitted", "Under review", "Shortlisted", "Results"];

const nav = [["Overview", "overview"], ["Submission", "submission"], ["Payment", "payment"], ["Documents", "documents"], ["Announcements", "announcements"], ["Support", "support"]];

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const sp = await searchParams;
  const key = (sp.state && sp.state in demo ? sp.state : "review") as S;
  const s = demo[key];
  const cat = categories[0];

  return (
    <div className="container dash">
      <div>
        <p className="eyebrow">Season 02 · Participant</p>
        <h1 className="display h2" style={{ marginTop: "var(--s-3)" }}>Hello, Aanya</h1>
      </div>

      <div className="dash-layout">
        <nav className="dash-nav" aria-label="Dashboard">
          {nav.map(([l, id], i) => <a key={id} href={`#${id}`} aria-current={i === 0 ? "page" : undefined}>{l}</a>)}
        </nav>

        <div className="stack-lg" id="overview">
          {/* Top: season status */}
          <div className="card">
            <h2>Season 2 status</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-3)", alignItems: "center", justifyContent: "space-between" }}>
              <StatusBadge kind={s.badge}>{s.status}</StatusBadge>
              <span className="small muted" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                Registration ID <b className="reg-id" style={{ fontSize: "var(--t-sm)", padding: ".25rem .6rem" }}>ICS2-K7M4QX</b>
              </span>
            </div>
            <ol className="timeline" aria-label="Progress">
              {stages.map((t, i) => <li key={t} data-state={i < s.stage ? "done" : i === s.stage ? "current" : "todo"}>{t}</li>)}
            </ol>
          </div>

          {/* Golden rule: always one obvious next action or an explicit "nothing required" */}
          {s.action ? (
            <section className="next-action" aria-labelledby="na">
              <h2 id="na">Next action</h2>
              <p className="big">{s.action.title}</p>
              <p className="small" style={{ color: "#cfc7bb" }}>{s.action.body}</p>
              <div><Button href={s.action.href}>{s.action.cta}</Button></div>
            </section>
          ) : (
            <section className="next-action next-action--none" aria-labelledby="na">
              <h2 id="na">Next action</h2>
              <p className="big">Nothing required right now.</p>
              <p className="small" style={{ color: "#cfc7bb" }}>We&apos;ll notify you by SMS and email when something changes.</p>
            </section>
          )}

          {/* Middle: current submission */}
          <div className="card" id="submission">
            <h2>Your submission</h2>
            <div className="submission">
              <div className="submission__thumb"><ArtPlate art={cat.art} sizes="96px" label="Your artwork thumbnail (stand-in)" /></div>
              <div className="stack" style={{ display: "grid", gap: "var(--s-1)" }}>
                <p className="display" style={{ fontSize: "var(--t-xl)", lineHeight: 1.1 }}>Untitled Study I</p>
                <p className="small muted">{cat.name}</p>
                <p className="xs muted">Submitted 8 Oct 2026</p>
              </div>
            </div>
          </div>

          <div className="dash-grid dash-grid--2">
            {/* Bottom: payment, documents, announcements, support */}
            <div className="card" id="payment">
              <h2>Payment</h2>
              <p className="small">₹499 · {key === "pending" ? <StatusBadge kind="pending" /> : <StatusBadge kind="submitted">Paid</StatusBadge>}</p>
              <Button variant="secondary" href="#documents">View receipt</Button>
            </div>
            <div className="card" id="documents">
              <h2>Documents</h2>
              <ul className="doc-list">
                <li>Payment receipt <a href="#documents" className="btn btn--text small">Download</a></li>
                <li>Competition rules <Link href="/legal#rules" className="btn btn--text small">Read</Link></li>
                <li>Certificate <span className="xs muted">Available after results</span></li>
              </ul>
            </div>
          </div>

          <div className="dash-grid dash-grid--2">
            <div className="card" id="announcements">
              <h2>Announcements</h2>
              <ul className="ann-list">
                <li><b>Season 02 is now open</b><time dateTime="2026-10-08">8 Oct 2026</time></li>
                <li><b>Judging panel to be announced</b><time dateTime="2026-10-20">Coming soon</time></li>
              </ul>
            </div>
            <div className="card" id="support">
              <h2>Support</h2>
              <p className="small">Questions about your entry? We usually reply within one working day.</p>
              <div className="btn-row">
                <Button variant="secondary" href="/#faq">Read FAQs</Button>
                <Button variant="text" href="mailto:hello@example.com">Contact organiser</Button>
              </div>
            </div>
          </div>

          <div className="sim" aria-label="Prototype controls">
            <p className="small"><b>Prototype:</b> preview dashboard states</p>
            <div className="btn-row">
              {(Object.keys(demo) as S[]).map((k) => (
                <Link key={k} href={`/dashboard?state=${k}`} className={`btn ${k === key ? "btn--primary" : "btn--secondary"}`}>{k}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

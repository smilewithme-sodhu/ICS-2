import type { ReactNode } from "react";

export type BadgeKind = "submitted" | "pending" | "review" | "shortlisted" | "winner" | "action";

const labels: Record<BadgeKind, string> = {
  submitted: "Submitted",
  pending: "Payment pending",
  review: "Under review",
  shortlisted: "Shortlisted",
  winner: "Winner",
  action: "Action required",
};

export function StatusBadge({ kind, children }: { kind: BadgeKind; children?: ReactNode }) {
  return <span className={`badge badge--${kind}`}>{children ?? labels[kind]}</span>;
}

export function Stat({ value, label }: { value: string | null; label: string }) {
  return (
    <div className={`stat ${value ? "" : "stat--pending"}`}>
      <div className="stat__num">{value ?? "—"}</div>
      <div className="stat__label">{label}{value ? "" : " · to be verified"}</div>
    </div>
  );
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="accordion">
      {items.map((i) => (
        <details key={i.q}>
          <summary>{i.q}</summary>
          <p className="answer">{i.a}</p>
        </details>
      ))}
    </div>
  );
}

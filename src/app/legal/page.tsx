import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rules & legal", description: "Competition rules, terms, privacy, refund and guardian policies." };

const sections = [
  ["rules", "Competition rules"],
  ["terms", "Terms & conditions"],
  ["privacy", "Privacy policy"],
  ["refund", "Refund / cancellation policy"],
  ["guardian", "Guardian & consent terms"],
  ["ip", "Artwork use & intellectual property"],
];

export default function Legal() {
  return (
    <div className="container section stack-lg" style={{ maxWidth: "46rem" }}>
      <h1 className="display h1">Rules &amp; legal</h1>
      <p className="lead">Placeholder structure — replace with the confirmed Season 2 policies before launch.</p>
      {sections.map(([id, t]) => (
        <section key={id} id={id} className="stack">
          <h2 className="display h3">{t}</h2>
          <p className="muted">Policy text to be supplied by the organiser.</p>
        </section>
      ))}
    </div>
  );
}

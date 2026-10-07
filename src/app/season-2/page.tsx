import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Accordion } from "@/components/ui";
import { categories, faqs } from "@/lib/data";

export const metadata: Metadata = { title: "Season 2", description: "Dates, eligibility, categories, fees and judging for Indian Creative Star Season 02." };

export default function Season2() {
  return (
    <>
      <section className="section section--dark on-dark">
        <div className="container stack-lg">
          <p className="eyebrow">Season 02</p>
          <h1 className="display h1">Everything about Season 02.</h1>
          <p className="lead">Eligibility, categories, fees and judging — all in one place. Final details are confirmed before launch.</p>
          <Button href="/register">Register now</Button>
        </div>
      </section>
      <section className="section">
        <div className="container stack-lg">
          <h2 className="display h2">Categories &amp; fees</h2>
          <ul className="doc-list">
            {categories.map((c) => <li key={c.slug}><span><b>{c.name}</b></span><span>₹{c.fee}</span></li>)}
          </ul>
        </div>
      </section>
      <section className="section section--paper">
        <div className="container stack-lg">
          <h2 className="display h2">FAQ</h2>
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}

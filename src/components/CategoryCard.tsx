import Link from "next/link";
import type { Category } from "@/lib/data";
import { ArtPlate } from "./ArtPlate";

/**
 * Editorial CategoryCard inspired by contemporary Indian gallery catalogs.
 * Incorporates subtle bilingual typography (Devanagari) and precise metadata framing.
 */
export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link href={`/register?category=${c.slug}`} className="cat-card">
      <div className="cat-card__img">
        <ArtPlate art={c.art} label={`${c.name} sample artwork`} />
        <div className="cat-card__top-tags">
          <span className="cat-card__code">[{c.code}]</span>
          {c.hindi && <span className="cat-card__hindi">{c.hindi}</span>}
        </div>
      </div>
      <div className="cat-card__body">
        <h3 className="cat-card__name">{c.name}</h3>
        <p className="cat-card__desc">{c.blurb}</p>
        <div className="cat-card__footer">
          <span className="cat-card__fee">₹{c.fee} · ENTRY</span>
          <span className="cat-card__go">Select →</span>
        </div>
      </div>
    </Link>
  );
}

/** Selectable variant used in registration flow. */
export function CategorySelectCard({
  c,
  selected,
  onSelect,
}: {
  c: Category;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="cat-card cat-card--select"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <div className="cat-card__img">
        <ArtPlate art={c.art} sizes="(max-width: 768px) 45vw, 250px" />
        <div className="cat-card__top-tags">
          <span className="cat-card__code">[{c.code}]</span>
          {c.hindi && <span className="cat-card__hindi">{c.hindi}</span>}
        </div>
      </div>
      <div className="cat-card__body">
        <span className="cat-card__name">{c.name}</span>
        <span className="cat-card__fee">₹{c.fee}</span>
      </div>
    </button>
  );
}

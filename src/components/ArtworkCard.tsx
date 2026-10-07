import type { Art } from "@/lib/data";
import { ArtPlate } from "./ArtPlate";

/** Image-first card; aspect ratio preserved to prevent layout shift. */
export function ArtworkCard({ title, artist, category, ratio, art }: { title: string; artist: string; category: string; ratio: string; art: Art }) {
  return (
    <figure className="artwork">
      <div className="artwork__img" style={{ aspectRatio: ratio }}>
        <ArtPlate art={art} label={`${title} by ${artist} (stand-in artwork)`} />
      </div>
      <figcaption>
        <b>{title}</b>
        <span>{artist} · {category}</span>
      </figcaption>
    </figure>
  );
}

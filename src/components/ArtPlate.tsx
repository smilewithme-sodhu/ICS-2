import Image from "next/image";
import type { Art } from "@/lib/data";

/**
 * High-fidelity ArtPlate component for ICS exhibition galleries.
 * Uses Next.js image optimization with fallback eager loading for instant exhibition viewing.
 */
export function ArtPlate({
  art,
  label,
  priority = false,
  sizes = "(min-width: 1100px) 450px, (min-width: 768px) 50vw, 100vw",
}: {
  art: Art;
  label?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="art">
      <Image
        src={art.src}
        alt={label ?? "Indian Creative Star Exhibition Work"}
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        style={{
          objectFit: "cover",
          objectPosition: art.pos,
          transform: `scale(${art.zoom})`,
          transformOrigin: art.pos,
        }}
      />
    </div>
  );
}

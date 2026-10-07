import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "text";

/** Primary / Secondary / Text CTA. Renders a link when `href` is given. */
export function Button({
  href, variant = "primary", block, children, className = "", ...rest
}: { href?: string; variant?: Variant; block?: boolean; children: ReactNode; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `btn btn--${variant} ${block ? "btn--block" : ""} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}

import Link from "next/link";
import { Button } from "./Button";

const links = [
  ["/season-2", "Season 2"],
  ["/#categories", "Categories"],
  ["/#how-it-works", "How it works"],
  ["/#season-1", "Season 1"],
  ["/#gallery", "Gallery"],
  ["/#about", "About"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__bar">
        <Link href="/" className="wordmark" aria-label="Indian Creative Star, home">
          ICS <b>SEASON 02</b>
        </Link>
        <nav className="nav-desktop" aria-label="Primary">
          {links.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}
        </nav>
        <div className="header-actions">
          <Link href="/dashboard" className="btn btn--text small">Sign in</Link>
          <Button href="/register">Register now</Button>
          {/* No-JS mobile menu */}
          <details className="menu">
            <summary aria-label="Menu">Menu</summary>
            <nav className="nav-mobile" aria-label="Mobile">
              {links.map(([h, l]) => <Link key={h} href={h}>{l}</Link>)}
              <Link href="/dashboard">Participant sign in</Link>
              <Link href="/legal">Rules &amp; legal</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

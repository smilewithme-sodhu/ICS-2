import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer on-dark">
      <div className="container">
        <div className="footer-cols">
          <div className="brand stack">
            <p className="display" style={{ fontSize: "1.5rem", color: "#f5f0e8" }}>Indian Creative Star</p>
            <p style={{ maxWidth: "26rem" }}>A national stage for India&apos;s creators. Bring your work. Tell your story. Be seen.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/season-2">Season 2</Link></li>
              <li><Link href="/#categories">Categories</Link></li>
              <li><Link href="/#gallery">Gallery</Link></li>
              <li><Link href="/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4>Trust</h4>
            <ul>
              <li><Link href="/legal#rules">Competition rules</Link></li>
              <li><Link href="/legal#terms">Terms &amp; conditions</Link></li>
              <li><Link href="/legal#privacy">Privacy policy</Link></li>
              <li><Link href="/legal#refund">Refund / cancellation</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@example.com">Email (placeholder)</a></li>
              <li><a href="#">WhatsApp (placeholder)</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-legal">© 2026 Indian Creative Star. Organiser name, address and registration details to be added before launch.</p>
      </div>
    </footer>
  );
}

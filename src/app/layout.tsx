import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// Two families only, limited weights, display swap.
const ui = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--f-ui", display: "swap" });
const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Indian Creative Star · Season 02", template: "%s · Indian Creative Star" },
  description: "Your art deserves a stage. Season 02 of Indian Creative Star is now open — register, submit your artwork and be seen.",
  openGraph: { title: "Indian Creative Star · Season 02", description: "Your art deserves a stage.", type: "website", locale: "en_IN" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#171412" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${ui.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

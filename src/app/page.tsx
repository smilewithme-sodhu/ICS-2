import { Button } from "@/components/Button";
import { ArtPlate } from "@/components/ArtPlate";
import { CategoryCard } from "@/components/CategoryCard";
import { Accordion } from "@/components/ui";
import {
  art,
  categories,
  exhibitionWorks,
  juliaMorganBadges,
  masterDiscoverArtists,
  faqs,
} from "@/lib/data";

const benefits = [
  {
    tag: "01 / HONOUR",
    title: "National Exhibition & Curated Stage",
    desc: "Selected finalist artworks are exhibited at premier partner art spaces in New Delhi and Mumbai, immortalized in the official ICS Season 02 print catalogue.",
  },
  {
    tag: "02 / GRANTS",
    title: "Direct Artistic Endowments",
    desc: "Unrestricted creator development grants totaling ₹5,00,000 distributed across discipline winners and emerging young talents under 21.",
  },
  {
    tag: "03 / PROOF",
    title: "Verifiable Cryptographic Credentials",
    desc: "Every validated participant and shortlisted artist receives an immutable digital credential and verified Certificate of Excellence.",
  },
  {
    tag: "04 / COMMUNITY",
    title: "A Pan-Indian Creator Archive",
    desc: "Join a first-party index of 5,000+ contemporary artists, sculptors, and designers connecting directly with curators and institutional buyers.",
  },
];

export default function Home() {
  return (
    <div className="has-bottom-cta">
      {/* =========================================================================
          HERO SECTION: Monumental Architectural Monogram (NGMA) + Asymmetric Trio (Julia Morgan)
          ========================================================================= */}
      <section className="hero2 on-dark" aria-labelledby="hero-title">
        {/* Living Ambient Museum Light (Fluid Glow Mesh) */}
        <div className="hero-glow-stage" aria-hidden="true">
          <div className="glow-orb glow-orb--vermilion" />
          <div className="glow-orb glow-orb--gold" />
          <div className="glow-orb glow-orb--forest" />
          <div className="glow-sheen" />
        </div>

        <div className="container hero-content-relative">
          {/* Top Curatorial Bar */}
          <div className="micro-row" aria-hidden="true">
            <span className="micro-tag">INDIAN CREATIVE STAR · SEASON 02</span>
            <span className="micro-tag pulse-wrap">
              <span className="pulse-dot" /> REGISTRATION WINDOW OPEN
            </span>
            <span className="micro-tag">PAN-INDIA JURY · ALL 28 STATES</span>
          </div>

          {/* Monumental Headline */}
          <div className="hero2__header">
            <h1 id="hero-title" className="hero2__title">
              <span className="sr-only">Indian Creative Star, Season 02.</span>
              <div className="hero2__monogram">
                <span className="hero2__mark">ICS</span>
                <span className="hero2__devanagari">इ क स</span>
              </div>
              <div className="hero2__season-row">
                <span className="hero2__season">Season 02</span>
                <span className="hero2__subtag">A NATIONAL CREATIVE AWARD</span>
              </div>
            </h1>
          </div>

          {/* Sliced Gallery & CTA Composition */}
          <div className="hero2__lower">
            <div className="hero2__copy">
              <p className="hero2__lead">
                India&apos;s most authentic creators, brought to <em>one sacred stage.</em>
              </p>
              <p className="hero2__desc">
                A digital exhibition and peer-judged national competition for painters, photographers, sculptors, and digital designers. Real work, zero decorative noise.
              </p>
              <div className="btn-row hero-btn-row">
                <Button href="/register" className="btn--hero">Register your artwork →</Button>
                <Button href="/season-2" variant="secondary">Exhibition Rules</Button>
              </div>
            </div>

            {/* Asymmetric Framed Art Trio (Julia Morgan) */}
            <div className="trio">
              <div className="trio__a">
                <ArtPlate
                  art={art.hero}
                  priority
                  sizes="(min-width: 900px) 260px, 50vw"
                  label="Portrait in Paper collage by Kabir Sen"
                />
                <span className="art-badge">FINE ART · 01</span>
              </div>
              <div className="trio__b">
                <ArtPlate
                  art={art.painting}
                  priority
                  sizes="(min-width: 900px) 200px, 40vw"
                  label="Monsoon Over the Valley by Aanya Sharma"
                />
                <span className="art-badge">OIL ON LINEN</span>
              </div>
              <div className="trio__c">
                <ArtPlate
                  art={art.mixed}
                  priority
                  sizes="(min-width: 900px) 200px, 40vw"
                  label="Gold Leaf & Earth Study by Meera Nambiar"
                />
                <span className="art-badge">24K GOLD LEAF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [01]: Julia Morgan Minimal Milestone Badges
          ========================================================================= */}
      <section className="section section--paper proof-strip" aria-label="Season 02 In Numbers">
        <div className="container">
          <div className="stamp-grid">
            {juliaMorganBadges.map((b) => (
              <div key={b.num} className="stamp-card">
                <div className="stamp-card__top">
                  <span className="stamp-card__num">{b.num}</span>
                  <span className="stamp-card__unit">{b.unit}</span>
                </div>
                <p className="stamp-card__desc">{b.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [02]: The Editorial Statement (NGMA Manifesto)
          ========================================================================= */}
      <section className="section" id="about">
        <div className="container">
          <div className="manifesto-card">
            <div className="manifesto-meta">
              <p className="idx"><span>[01]</span> CURATORIAL MANIFESTO</p>
              <span className="stamp-tag">CONTEMPORARY INDIA</span>
            </div>
            <h2 className="statement">
              India is full of creators who <em>deserve to be seen</em> — not judged by an algorithm.
            </h2>
            <div className="manifesto-cols">
              <p className="lead">
                Every district, town, and studio across this subcontinent produces exceptional visual intellect. Yet conventional competitions reduce art to popularity contests, Instagram votes, or clunky administrative forms.
              </p>
              <p className="lead">
                Indian Creative Star Season 02 is built on museum-grade curation, absolute double-blind evaluation, and generous digital presentation. Bring your deepest work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [03]: Saturated Color Field — Season 02 Key Facts (Julia Morgan)
          ========================================================================= */}
      <section className="section section--field on-dark" id="season-2">
        <div className="container">
          <div className="field-header">
            <p className="idx"><span>[02]</span> COMPETITION STRUCTURE</p>
            <h2 className="field-title">Everything you need to know, cleanly documented.</h2>
          </div>

          <dl className="facts-grid">
            <div className="fact-block">
              <dt>01 / CURATORIAL THEME</dt>
              <dd>
                <strong>Unfiltered India (नग्न सत्य)</strong>
                <span className="fact-sub">Living light, unvarnished human truth, raw material culture.</span>
              </dd>
            </div>
            <div className="fact-block">
              <dt>02 / ELIGIBILITY</dt>
              <dd>
                <strong>All Indian Citizens &amp; Residents</strong>
                <span className="fact-sub">Any age group. Under-18 participants require parent/guardian consent.</span>
              </dd>
            </div>
            <div className="fact-block">
              <dt>03 / DISCIPLINES</dt>
              <dd>
                <strong>6 Official Categories</strong>
                <span className="fact-sub">Painting, Photography, Digital Art, Craft/Textile, Sketch, Mixed Media.</span>
              </dd>
            </div>
            <div className="fact-block">
              <dt>04 / ENTRY FEE</dt>
              <dd>
                <strong>₹499 per submission</strong>
                <span className="fact-sub">Covers high-res archiving, blind jury scoring, and verified credential.</span>
              </dd>
            </div>
            <div className="fact-block">
              <dt>05 / JURY METHOD</dt>
              <dd>
                <strong>100% Double-Blind Protocol</strong>
                <span className="fact-sub">Biographies, names, and follower counts remain hidden to all judges.</span>
              </dd>
            </div>
            <div className="fact-block">
              <dt>06 / ENDOWMENT</dt>
              <dd>
                <strong>₹5,00,000 Prize Pool</strong>
                <span className="fact-sub">Grand Prize ₹1,50,000 + 6 Category Laureates + 10 Young Talent Grants.</span>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* =========================================================================
          SECTION [04]: Categories — Clean Framed Indian Disciplines
          ========================================================================= */}
      <section className="section" id="categories">
        <div className="container stack-lg">
          <div className="section-head-split">
            <div>
              <p className="idx"><span>[03]</span> OFFICIAL DISCIPLINES</p>
              <h2 className="display h2">What do you create?</h2>
            </div>
            <p className="section-sub-copy">
              Choose your primary discipline. You may enter multiple works or different disciplines under the same account.
            </p>
          </div>

          <div className="cat-grid">
            {categories.map((c) => (
              <CategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [05]: The NGMA Dark Wall Curatorial Exhibition
          ========================================================================= */}
      <section className="section section--wall on-dark" id="gallery">
        <div className="container">
          <div className="wall-head">
            <div>
              <p className="idx"><span>[04]</span> RECENT LAUREATES</p>
              <h2 className="wall-title">The work comes first.</h2>
            </div>
            <p className="wall-note">
              Curatorial notes and featured works from the Indian Creative Star Archive.
            </p>
          </div>

          <div className="exh">
            {exhibitionWorks.map((work, idx) => (
              <figure
                key={work.title}
                className={`exh__item ${idx % 2 === 1 ? "exh__item--r" : ""}`}
              >
                <div className="exh__img" style={{ aspectRatio: work.ratio }}>
                  <ArtPlate
                    art={work.art}
                    sizes="(min-width: 900px) 460px, 90vw"
                    label={`${work.title} by ${work.artist}`}
                  />
                  <div className="exh__frame-badge">{work.cat}</div>
                </div>

                <figcaption className="exh__cap">
                  <div className="exh__number">CATALOGUE NO. 0{idx + 1}</div>
                  <h3 className="exh__work-title">{work.title}</h3>
                  <div className="exh__artist-meta">
                    <span className="exh__artist-name">{work.artist}</span>
                    <span className="exh__artist-loc">{work.location} · {work.year}</span>
                  </div>
                  <p className="exh__medium-line">{work.medium}</p>
                  <p className="exh__note-body">{work.curatorialNote}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* NGMA Master Catalog Discover Roster */}
          <div className="discover">
            <span className="discover__h">Historical Lineage</span>
            <span className="discover__sub">Honouring India&apos;s pioneering modernists:</span>
            <ul>
              {masterDiscoverArtists.map((artist) => (
                <li key={artist}>{artist}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [06]: Why Participate (Museum-Grade Benefits)
          ========================================================================= */}
      <section className="section section--paper" id="how-it-works">
        <div className="container stack-lg">
          <div className="section-head-split">
            <div>
              <p className="idx"><span>[05]</span> ARTIST ADVANCEMENT</p>
              <h2 className="display h2">Bring your work. Tell your story.</h2>
            </div>
            <Button href="/register">Start registration →</Button>
          </div>

          <div className="benefit-cards-grid">
            {benefits.map((b) => (
              <div key={b.title} className="benefit-tile">
                <span className="benefit-tag">{b.tag}</span>
                <h3 className="benefit-h">{b.title}</h3>
                <p className="benefit-p">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* 4-Step Registration Map */}
          <div className="flow-preview-card">
            <h3 className="flow-preview-h">The Seamless 4-Step Journey</h3>
            <ol className="steps-list" aria-label="How participation works">
              <li>
                <span>
                  <b>01 / Select Discipline:</b> Choose your category and review specifications.
                </span>
              </li>
              <li>
                <span>
                  <b>02 / Enter Details:</b> Only operationally essential creator information.
                </span>
              </li>
              <li>
                <span>
                  <b>03 / Upload Artwork:</b> Native mobile camera or high-res gallery picker with instant failsafe validation.
                </span>
              </li>
              <li>
                <span>
                  <b>04 / Review &amp; Confirm:</b> Transparent itemized summary with instant ID generation.
                </span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION [07]: FAQ Section
          ========================================================================= */}
      <section className="section">
        <div className="container">
          <div className="stack" style={{ maxWidth: "44rem", marginBottom: "var(--s-6)" }}>
            <p className="idx"><span>[06]</span> TRANSPARENCY &amp; RULES</p>
            <h2 className="display h2">Frequently asked questions.</h2>
            <p className="lead">
              Clear rules remove friction. Everything you need to know about submissions, verification, and judging.
            </p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* =========================================================================
          SECTION [08]: Final Call To Action (NGMA Prestige Tone)
          ========================================================================= */}
      <section className="section section--dark on-dark final-banner">
        <div className="container final-cta">
          <p className="idx"><span>[07]</span> SEASON 02 SUBMISSIONS</p>
          <h2 className="display final-cta__title">
            Your art deserves a <em>national stage.</em>
          </h2>
          <p className="lead" style={{ textAlign: "center", color: "#cfc7bb" }}>
            Do not let your work sit quietly on your phone or in your studio. Enter Season 02 and be witnessed across India.
          </p>
          <div className="btn-row">
            <Button href="/register" className="btn--hero">Register Now (₹499)</Button>
            <Button href="/dashboard" variant="secondary">Check Existing Entry</Button>
          </div>
        </div>
      </section>

      {/* Mobile-only Persistent Bottom Floating Action */}
      <div className="bottom-cta">
        <Button href="/register" block>
          Register for Season 02 (₹499)
        </Button>
      </div>
    </div>
  );
}

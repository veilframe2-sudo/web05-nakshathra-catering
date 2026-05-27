// Reusable UI components + brand mark
// loaded after react/babel; exposes pieces on window

const { useState, useEffect, useRef } = React;

/* ───── Star mark for logo / accents ───── */
function StarMark({ size = 36, color = "currentColor" }) {
  // 8-point star (nakshatra) — geometric, original
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
      <g fill={color}>
        <polygon points="50,4 56,40 92,40 62,58 74,94 50,72 26,94 38,58 8,40 44,40" opacity="0.9" />
        <circle cx="50" cy="50" r="6" fill="#C9A227" />
      </g>
    </svg>
  );
}

/* ───── banana-leaf vein silhouette ───── */
function LeafMotif({ className = "", size = 200 }) {
  return (
    <svg viewBox="0 0 200 400" width={size} height={size * 2} className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M100 10 C 60 80, 50 200, 100 390 C 150 200, 140 80, 100 10 Z" />
        <line x1="100" y1="20" x2="100" y2="380" />
        <path d="M100 60 L 60 90" /><path d="M100 60 L 140 90" />
        <path d="M100 100 L 50 140" /><path d="M100 100 L 150 140" />
        <path d="M100 150 L 45 200" /><path d="M100 150 L 155 200" />
        <path d="M100 200 L 50 250" /><path d="M100 200 L 150 250" />
        <path d="M100 250 L 60 295" /><path d="M100 250 L 140 295" />
        <path d="M100 300 L 70 335" /><path d="M100 300 L 130 335" />
      </g>
    </svg>
  );
}

/* ───── Star strip (testimonial stars) ───── */
function Stars({ n = 5 }) {
  return (
    <span className="stars" aria-label={`${n} of 5 stars`}>
      {"★".repeat(n)}{"☆".repeat(5 - n)}
    </span>
  );
}

/* ───── Image with banana-leaf fallback ───── */
function SafeImg({ src, alt, ...rest }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div className="placeholder" style={{ width: "100%", height: "100%" }}>
        <span>{alt || "image"}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setErrored(true)} loading="lazy" {...rest} />;
}

/* ───── Section head helper ───── */
function SectionHead({ eyebrow, title, lead, children }) {
  return (
    <header className="section-head">
      <div>
        {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      </div>
      <div>
        {lead && <p className="section-lead">{lead}</p>}
        {children}
      </div>
    </header>
  );
}

/* ───── Nav ───── */
function Nav() {
  const links = [
    { id: "weddings", label: "Weddings" },
    { id: "menu",     label: "Menu" },
    { id: "services", label: "Services" },
    { id: "gallery",  label: "Gallery" },
    { id: "story",    label: "Story" },
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          <span className="nav-logo-mark"><StarMark size={36} color="#6B1A1A" /></span>
          <span>
            Nakshatra
            <small>Catering & Event · Kochi</small>
          </span>
        </a>
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={`#${l.id}`}>{l.label}</a>
          ))}
        </div>
        <div className="nav-cta">
          <a href="tel:+919747078787" className="phone">+91 97470 78787</a>
          <a href="#quote" className="btn btn-primary" style={{ padding: "10px 18px", fontSize: 13 }}>Get a quote →</a>
        </div>
      </div>
    </nav>
  );
}

/* ───── Hero ───── */
function Hero() {
  return (
    <section className="hero" id="top">
      <LeafMotif className="hero-motif hero-motif--tl" size={180} />
      <LeafMotif className="hero-motif hero-motif--br" size={220} />
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">Est. 2002 · Vyttila, Ernakulam</div>
            <h1 className="hero-title">
              Two decades of feeding Kochi's <em>biggest days.</em>
              <span className="ml">കല്യാണ സദ്യയും ബിരിയാണിയും</span>
            </h1>
            <p className="hero-sub">
              Nakshatra Catering & Event has plated more than twenty years of weddings, receptions and house-warmings from a single kitchen behind Ponnurunni Temple. Sadya on banana leaf, biryani in big copper pots, and one phone number for the whole event.
            </p>
            <div className="hero-ctas">
              <a href="#quote" className="btn btn-primary">Plan your event →</a>
              <a href="#menu" className="btn btn-ghost">See the menu</a>
            </div>
          </div>
          <div className="hero-art">
            <SafeImg src="images/sadya-overhead.png" alt="Sadya served on banana leaf" />
            <div className="hero-art-tag">
              <div>
                <span className="stars">★★★★★</span>
                <div className="num">4.3</div>
                <small>1,581 Google reviews</small>
              </div>
            </div>
            <div className="hero-art-since">
              <span className="lbl">Since</span>
              <span className="yr">2002</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Trust strip ───── */
function TrustStrip() {
  const items = [
    { n: "23 yrs",     l: "Of Kochi weddings" },
    { n: "2,500",      l: "Max guest capacity" },
    { n: "1,581",      l: "Google reviews · 4.3★" },
    { n: "5 in 1",     l: "Catering · décor · photo · video · car" },
  ];
  return (
    <section className="trust">
      <div className="container trust-row">
        {items.map((it, i) => (
          <div className="trust-item" key={i}>
            <div className="num">{it.n}</div>
            <div className="lbl">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───── Footer ───── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="nav-logo" style={{ color: "var(--c-cream)", marginBottom: 18 }}>
              <span className="nav-logo-mark"><StarMark size={36} color="#C9A227" /></span>
              <span style={{ fontSize: 24 }} className="serif">Nakshatra</span>
            </div>
            <p style={{ fontSize: 14, opacity: 0.7, maxWidth: 320, margin: 0, lineHeight: 1.6 }}>
              Family-run catering & event house in Vyttila, Ernakulam. Weddings, receptions, sadya and biryani for 250–2,500 guests since 2002.
            </p>
          </div>
          <div>
            <h6>Visit</h6>
            <ul>
              <li>Krishnapuram Road</li>
              <li>Behind Ponnurunni Temple</li>
              <li>Vyttila, Ernakulam 682019</li>
              <li>Kerala, India</li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li><a href="tel:+919747078787">+91 97470 78787</a></li>
              <li><a href="mailto:nakshtrace@gmail.com">nakshtrace@gmail.com</a></li>
              <li><a href="https://www.instagram.com/nakshatracatering/" target="_blank" rel="noopener">@nakshatracatering</a></li>
              <li>Open daily · 8am – 10pm</li>
            </ul>
          </div>
          <div>
            <h6>The Site</h6>
            <ul>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#story">Our story</a></li>
              <li><a href="#quote">Get a quote</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-credit">
          <span>© 2002–{new Date().getFullYear()} Nakshatra Catering & Event</span>
          <span>Plated in Kochi · കൊച്ചി</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { StarMark, LeafMotif, Stars, SafeImg, SectionHead, Nav, Hero, TrustStrip, Footer });

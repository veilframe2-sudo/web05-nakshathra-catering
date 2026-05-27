// Mid-page sections: Biryani, Sadya, Specialties, Menu

const { useState: useStateA } = React;
const D = window.NAKSHATRA_DATA;

/* ───── Biryani signature ───── */
function BiryaniSection() {
  return (
    <section className="section section--paper" id="biryani">
      <div className="container biryani">
        <div className="biryani-art">
          <SafeImg src="images/biryani-mutton.png" alt="Mutton biryani on banana leaf" />
          <div className="sticker">
            <div>
              <small>The Signature</small>
              ബിരിയാണി
            </div>
          </div>
        </div>
        <div>
          <div className="section-eyebrow">Our calling card</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            People come for the <em>biryani.</em>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.85, maxWidth: 480, margin: 0 }}>
            Twenty-three years on, our biryani is still the reason most clients call us back. Khyma rice cooked dum-style in sealed pots, with the meat handled separately so the grain stays whole. We do it for two-hundred and for two-thousand, and the taste doesn't change.
          </p>
          <ul className="biryani-list">
            {D.biryaniVariants.map((v, i) => (
              <li key={i}>
                <span>{v.en}</span>
                <span className="ml">{v.ml}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 32 }}>
            <a href="#quote" className="btn btn-primary">Book the biryani →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Sadya section ───── */
function SadyaSection() {
  return (
    <section className="section section--cream" id="weddings">
      <div className="container sadya">
        <div>
          <div className="section-eyebrow">Kalyana Sadya · കല്യാണ സദ്യ</div>
          <h2 className="section-title">
            The wedding feast, <em>the way it should be.</em>
          </h2>
          <div className="sadya-count">
            <div className="n">26</div>
            <div className="lbl">Items per banana leaf<br/>Served in the proper order</div>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, maxWidth: 520, margin: 0 }}>
            Choru first. Then the pickles up top, parippu and ghee down the centre, payasam at the end. We follow the way our elders served — banana leaf cut from the right plant, tip facing left, every dish placed where it belongs.
          </p>
          <div className="sadya-items">
            {D.sadyaItems.map((s, i) => <div key={i}>· {s}</div>)}
          </div>
        </div>
        <div className="sadya-grid">
          <div><SafeImg src="images/sadya-overhead.png" alt="Sadya overhead" /></div>
          <div><SafeImg src="images/sadya-plated.png" alt="Sadya plated" /></div>
          <div><SafeImg src="images/sadya-sambar.png" alt="Sambar rice" /></div>
          <div><SafeImg src="images/thoran.png" alt="Thoran" /></div>
          <div><SafeImg src="images/payasam-2.png" alt="Payasam" /></div>
        </div>
      </div>
    </section>
  );
}

/* ───── Specialties grid ───── */
function SpecialtiesSection() {
  return (
    <section className="section section--paper">
      <div className="container">
        <SectionHead
          eyebrow="What we cook"
          title="Four kitchens running, <em>one team plating.</em>"
          lead="Every event runs four counters at minimum — sadya, biryani, multi-cuisine, sweets — built around your guest mix and time of day."
        />
        <div className="spec-grid">
          {D.specialties.map((s, i) => (
            <div className="spec-card" key={i}>
              <div className="img"><SafeImg src={s.img} alt={s.title} /></div>
              <div className="body">
                <h4>{s.title}</h4>
                <div className="ml-name">{s.ml}</div>
                <p>{s.desc}</p>
                <span className="arrow">Explore →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Menu with tabs ───── */
function MenuSection() {
  const [active, setActive] = useStateA("biryani");
  const menus = D.menus;
  const cur = menus[active];

  return (
    <section className="section section--cream" id="menu">
      <div className="container">
        <SectionHead
          eyebrow="The full menu · എല്ലാം"
          title="From <em>kalyana sadya</em> to chilli chicken."
          lead="A representative menu. Final dishes are built with you based on the event, region of family, and dietary mix."
        />

        <div className="menu-tabs">
          {Object.entries(menus).map(([key, m]) => (
            <button
              key={key}
              className={`menu-tab ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {m.label}
              <span className="badge">{m.items.length}</span>
            </button>
          ))}
        </div>

        <div style={{ marginBottom: 24 }}>
          <span className="ml" style={{ fontSize: 28, color: "var(--c-maroon)" }}>{cur.ml}</span>
        </div>

        <div className="menu-list">
          {cur.items.map((it, i) => (
            <div className="menu-row" key={i}>
              <div>
                <div className="name">{it.en}</div>
                <div className="ml">{it.ml}</div>
                {it.desc && <div className="desc">{it.desc}</div>}
              </div>
              {it.tag && (
                <span className={
                  "tag " +
                  (it.tag === "Signature" ? "tag--gold" :
                   it.tag === "Bestseller" ? "tag--green" : "")
                }>{it.tag}</span>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, padding: "24px 28px", background: "var(--c-paper)", borderRadius: "var(--r-md)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 14, opacity: 0.75 }}>
            Want the full printable PDF menu? We'll mail it with quote.
          </div>
          <a href="#quote" className="btn btn-gold" style={{ padding: "10px 18px", fontSize: 13 }}>Request menu PDF →</a>
        </div>
      </div>
    </section>
  );
}

/* ───── Services (5 cards on leaf-green) ───── */
function ServicesSection() {
  return (
    <section className="section section--leaf" id="services">
      <div className="container">
        <SectionHead
          eyebrow="One number for the whole event"
          title="<em>Catering</em> · décor · photo · video · car."
          lead="We bring the wedding together end to end so you aren't coordinating five vendors at midnight."
        />
        <div className="services">
          {D.services.map((s, i) => (
            <div className="service" key={i}>
              <div className="icon">{s.glyph}</div>
              <div>
                <h5>{s.title}</h5>
                <div className="ml-name">{s.ml}</div>
              </div>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48, textAlign: "center", color: "var(--c-cream)" }}>
          <p style={{ fontSize: 15, opacity: 0.85, maxWidth: 560, margin: "0 auto 24px" }}>
            Already booked a venue and photographer? Catering alone is fine — most clients add one or two services on top.
          </p>
          <a href="#quote" className="btn btn-on-dark">Tell us what you need →</a>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { BiryaniSection, SadyaSection, SpecialtiesSection, MenuSection, ServicesSection });

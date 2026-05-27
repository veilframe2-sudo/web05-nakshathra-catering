// Late-page sections: Gallery, Testimonials, Story, Quote form

const { useState: useStateB, useEffect: useEffectB } = React;
const DD = window.NAKSHATRA_DATA;

/* ───── Gallery with filter + lightbox ───── */
function GallerySection() {
  const [cat, setCat] = useStateB("all");
  const [box, setBox] = useStateB(null);

  const cats = [
    { id: "all",     label: "All",        ml: "എല്ലാം" },
    { id: "biryani", label: "Biryani",    ml: "ബിരിയാണി" },
    { id: "sadya",   label: "Sadya",      ml: "സദ്യ" },
    { id: "seafood", label: "Seafood",    ml: "മത്സ്യം" },
    { id: "meat",    label: "Chicken & Mutton", ml: "ഇറച്ചി" },
    { id: "snacks",  label: "Starters",   ml: "സ്റ്റാർട്ടർ" },
    { id: "sweets",  label: "Sweets",     ml: "മധുരം" },
  ];

  const items = cat === "all"
    ? DD.galleryImages
    : DD.galleryImages.filter(i => i.cat === cat);

  useEffectB(() => {
    if (!box) return;
    const onKey = e => { if (e.key === "Escape") setBox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [box]);

  return (
    <section className="section section--paper" id="gallery">
      <div className="container">
        <SectionHead
          eyebrow="From our kitchen · From your events"
          title="Real plates, <em>real events.</em>"
          lead="No stock photography. Every image below is from a Nakshatra event in Ernakulam or a banana leaf served from our kitchen this year."
        />

        <div className="gallery-filter">
          {cats.map(c => (
            <button
              key={c.id}
              className={`gallery-chip ${cat === c.id ? "active" : ""}`}
              onClick={() => setCat(c.id)}
            >
              {c.label} <span style={{ opacity: 0.6, marginLeft: 6 }} className="ml">{c.ml}</span>
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {items.map((g, i) => (
            <div
              key={g.src + i}
              className={`gallery-tile ${g.cls || ""}`}
              onClick={() => setBox(g)}
              style={{ aspectRatio: g.cls === "tall" ? "1 / 2" : "1 / 1" }}
            >
              <SafeImg src={g.src} alt={g.cap} />
              <div className="cap">
                <div>{g.cap}</div>
                <span className="ml">{g.ml}</span>
              </div>
            </div>
          ))}
        </div>

        {box && (
          <div className="lightbox" onClick={() => setBox(null)}>
            <button className="lightbox-close" onClick={() => setBox(null)} aria-label="Close">×</button>
            <img src={box.src} alt={box.cap} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ───── Testimonials ───── */
function TestimonialsSection() {
  return (
    <section className="section section--cream">
      <div className="container">
        <SectionHead
          eyebrow="What families say"
          title="1,581 Google reviews. <em>4.3 average.</em>"
          lead={null}
        >
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 56, lineHeight: 1, color: "var(--c-maroon)" }}>4.3</div>
              <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.6, marginTop: 6 }}>1,581 Google reviews</div>
            </div>
            <Stars n={4} />
          </div>
        </SectionHead>

        <div className="testi-grid">
          {DD.testimonials.map((t, i) => (
            <article className="testi" key={i}>
              <Stars n={t.stars} />
              <blockquote>"{t.quote}"</blockquote>
              <div className="who">
                <div className="avatar">{t.name[0]}</div>
                <div>
                  <div style={{ fontWeight: 500 }}>{t.name}</div>
                  <small>{t.meta}</small>
                </div>
                <div style={{ marginLeft: "auto" }} className="source">{t.source}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Story + Timeline ───── */
function StorySection() {
  return (
    <section className="section section--paper" id="story">
      <div className="container">
        <SectionHead
          eyebrow="Our story · ഞങ്ങളുടെ കഥ"
          title="Family-run since <em>2002.</em>"
        />
        <div className="story">
          <div className="story-prose">
            <p>
              Nakshatra opened in 2002 in a kitchen behind Ponnurunni Temple. The first wedding was a 240-plate sadya for a relative's friend. The second was a 600-plate one a fortnight later — by the time we finished cleaning, three more bookings had come in.
            </p>
            <p>
              Twenty-three years on, we're still the same family running the same kitchen. The pots are bigger and there's a generator in the back now, but the rice is still hand-checked, the payasam is still stirred over wood fire on the morning of the event, and one of us is at every wedding.
            </p>
            <p>
              We've never advertised. The 1,581 Google reviews came from one neighbour telling another, one aunt telling a niece, one wedding leading to the next. That's the only way this works.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
              <a href="#quote" className="btn btn-primary">Meet the family →</a>
              <a href="#gallery" className="btn btn-ghost">See recent events</a>
            </div>
          </div>
          <ul className="timeline">
            {DD.timeline.map((t, i) => (
              <li key={i}>
                <div className="yr">{t.yr}</div>
                <h6>{t.h}</h6>
                <p>{t.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───── Quote / Contact form — multi-step ───── */
function QuoteSection() {
  const [step, setStep] = useStateB(0);
  const [data, setData] = useStateB({
    eventType: "",
    date: "",
    guests: "",
    cuisine: [],
    services: [],
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const upd = (k, v) => setData(d => ({ ...d, [k]: v }));
  const togg = (k, v) => setData(d => ({
    ...d,
    [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v],
  }));

  const canNext = () => {
    if (step === 0) return data.eventType !== "";
    if (step === 1) return data.date !== "" && data.guests !== "";
    if (step === 2) return data.cuisine.length > 0;
    if (step === 3) return data.name && data.phone;
    return true;
  };

  const next = () => canNext() && setStep(s => Math.min(s + 1, 4));
  const back = () => setStep(s => Math.max(s - 1, 0));

  const steps = ["Event", "Date & guests", "Menu mix", "Contact", "Done"];

  return (
    <section className="section section--deep" id="quote">
      <div className="container quote">
        <div className="quote-info">
          <div className="section-eyebrow" style={{ color: "var(--c-gold)" }}>Get a quote</div>
          <h2 className="section-title" style={{ color: "var(--c-cream)" }}>
            Tell us about the <em>day</em>.
          </h2>
          <p style={{ fontSize: 17, opacity: 0.85, marginTop: 24, maxWidth: 420, lineHeight: 1.7 }}>
            We'll come back with a per-plate quote, a tasting invite, and a draft menu within 24 hours — usually the same evening if you call.
          </p>

          <a href="tel:+919747078787" style={{ display: "block" }}>
            <span className="num-big">+91 97470 78787</span>
            <span className="label">Call us · 8am – 10pm daily</span>
          </a>

          <address className="addr">
            <strong>Visit the kitchen</strong><br/>
            Krishnapuram Road,<br/>
            Behind Ponnurunni Temple,<br/>
            Vyttila, Ernakulam 682019
          </address>
        </div>

        <div className="quote-form">
          {/* Step bar */}
          <div className="quote-stepbar">
            <span className="quote-stepnum">{String(Math.min(step+1, 4)).padStart(2,"0")} / 04</span>
            {[0,1,2,3].map(i => (
              <div key={i} className={`quote-step ${step === i ? "active" : step > i ? "done" : ""}`} />
            ))}
            <span style={{ opacity: 0.6 }}>{steps[step]}</span>
          </div>

          {/* Step 0 — event type */}
          {step === 0 && (
            <div>
              <h3 className="quote-h">What are we cooking for?</h3>
              <div className="chip-row">
                {DD.eventTypes.map(e => (
                  <button
                    key={e.id}
                    className={`chip-select ${data.eventType === e.id ? "selected" : ""}`}
                    onClick={() => upd("eventType", e.id)}
                    type="button"
                  >
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 18, lineHeight: 1.1 }}>{e.title}</div>
                    <div className="ml" style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{e.ml}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1 — date + guests */}
          {step === 1 && (
            <div>
              <h3 className="quote-h">When and how many?</h3>
              <div className="field">
                <label>Event date</label>
                <input
                  className="input"
                  type="date"
                  value={data.date}
                  onChange={e => upd("date", e.target.value)}
                />
              </div>
              <div className="field">
                <label>Approximate guest count</label>
                <div className="guest-pills">
                  {DD.guestSizes.map(g => (
                    <button
                      key={g}
                      type="button"
                      className={`chip-select ${data.guests === g ? "selected" : ""}`}
                      onClick={() => upd("guests", g)}
                    >{g}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — menu mix */}
          {step === 2 && (
            <div>
              <h3 className="quote-h">What should we bring?</h3>
              <div className="field">
                <label>Menu — select all that apply</label>
                <div className="chip-row">
                  {["Sadya", "Biryani", "South Indian", "North Indian", "Chinese", "Continental", "BBQ", "Sweets & Payasam"].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`chip-select ${data.cuisine.includes(c) ? "selected" : ""}`}
                      onClick={() => togg("cuisine", c)}
                    >{c}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Add-on services</label>
                <div className="chip-row">
                  {["Decoration", "Photography", "Videography", "Car decoration", "Material supply"].map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`chip-select ${data.services.includes(c) ? "selected" : ""}`}
                      onClick={() => togg("services", c)}
                    >{c}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — contact */}
          {step === 3 && (
            <div>
              <h3 className="quote-h">How do we reach you?</h3>
              <div className="field">
                <label>Your name</label>
                <input className="input" value={data.name} onChange={e => upd("name", e.target.value)} placeholder="Anitha Menon" />
              </div>
              <div className="field">
                <label>Phone (WhatsApp preferred)</label>
                <input className="input" type="tel" value={data.phone} onChange={e => upd("phone", e.target.value)} placeholder="+91 98XXX XXXXX" />
              </div>
              <div className="field">
                <label>Email (optional)</label>
                <input className="input" type="email" value={data.email} onChange={e => upd("email", e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label>Anything we should know?</label>
                <textarea className="input" value={data.notes} onChange={e => upd("notes", e.target.value)} placeholder="Dietary, regional preferences, family customs…" />
              </div>
            </div>
          )}

          {/* Step 4 — success */}
          {step === 4 && (
            <div className="quote-success">
              <div className="tick">✓</div>
              <h3 className="quote-h" style={{ textAlign: "center" }}>Got it, {data.name?.split(" ")[0] || "thanks"}.</h3>
              <p style={{ opacity: 0.75, maxWidth: 360, margin: "0 auto 24px", fontSize: 15 }}>
                We'll WhatsApp a draft menu and per-plate quote to <strong>{data.phone || "your number"}</strong> within 24 hours. For something urgent, call <a href="tel:+919747078787" style={{ color: "var(--c-maroon)", textDecoration: "underline" }}>+91 97470 78787</a>.
              </p>
              <div style={{ display: "inline-flex", gap: 12 }}>
                <button className="btn btn-ghost" onClick={() => { setStep(0); setData({ eventType:"", date:"", guests:"", cuisine:[], services:[], name:"", phone:"", email:"", notes:"" }); }}>Start over</button>
                <a href="#menu" className="btn btn-primary">Browse menu →</a>
              </div>
            </div>
          )}

          {/* Actions */}
          {step < 4 && (
            <div className="quote-actions">
              <button className="quote-back" onClick={back} disabled={step === 0} style={{ opacity: step === 0 ? 0 : 0.6 }}>← Back</button>
              {step < 3 ? (
                <button className="btn btn-primary" onClick={next} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.4 }}>
                  Next →
                </button>
              ) : (
                <button className="btn btn-gold" onClick={next} disabled={!canNext()} style={{ opacity: canNext() ? 1 : 0.4 }}>
                  Send request →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { GallerySection, TestimonialsSection, StorySection, QuoteSection });

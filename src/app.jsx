// App composition — production build of the design bundle.
// Design-tool tweaks panel removed; defaults applied as static body data attributes.

const TWEAK_DEFAULTS = {
  palette: "maroon",
  motif: "on",
};

function App() {
  React.useEffect(() => {
    document.body.dataset.palette = TWEAK_DEFAULTS.palette;
    document.body.dataset.motif = TWEAK_DEFAULTS.motif;
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <TrustStrip />
      <BiryaniSection />
      <SadyaSection />
      <SpecialtiesSection />
      <MenuSection />
      <ServicesSection />
      <GallerySection />
      <TestimonialsSection />
      <StorySection />
      <QuoteSection />
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

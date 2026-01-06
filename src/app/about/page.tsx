import AboutHero from "./components/AboutHero";
import HappinessThroughColors from "./components/HappinessThroughColors";
import ColorGrid from "./components/ColorGrid";


export default function About() {
  return (
    <>
      <h1 className="sr-only">About TEDxITB 9.0</h1>

      <AboutHero />

      
      <section className="relative w-full overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
        <HappinessThroughColors />
        <ColorGrid />
      </section>
    </>
  );
}

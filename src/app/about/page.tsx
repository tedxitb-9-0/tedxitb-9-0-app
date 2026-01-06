import AboutHero from "./components/AboutHero";
import HappinessThroughColors from "./components/HappinessThroughColors";
import ColorGrid from "./components/ColorGrid";


export default function About() {
  return (
    <>
      <AboutHero />
      
      <section className="relative w-full overflow-hidden bg-[url('/pattern-bg.svg')] bg-repeat py-12 md:py-16 lg:py-24">
        <HappinessThroughColors />
        <ColorGrid />
      </section>
    </>
  );
}

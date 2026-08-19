import { Hero } from "@/components/Hero";
import { ScrollVideoSequence } from "@/components/ScrollVideoSequence";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Products } from "@/components/Products";
import { Brands } from "@/components/Brands";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FooterCTA } from "@/components/FooterCTA";

export function Home() {
  return (
    <main className="bg-transparent">
      <Hero />
      <About />
      <Work />
      <Products />
      <Brands />
      <TestimonialsSection />
      <FooterCTA />
    </main>
  );
}

export default Home;

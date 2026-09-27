import Footer from "@/components/Footer";
import Automations from "@/components/sections/Automations";
import Book from "@/components/sections/Book";
import Faq from "@/components/sections/Faq";
import Hero from "@/components/sections/Hero";
import Included from "@/components/sections/Included";
import Industries from "@/components/sections/Industries";
import Integrations from "@/components/sections/Integrations";
import PainPoints from "@/components/sections/PainPoints";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Industries />
        <PainPoints />
        <Automations />
        <Process />
        <Integrations />
        <Included />
        <WhyUs />
        <Testimonials />
        <Pricing />
        <Faq />
        <Book />
      </main>
      <Footer />
    </>
  );
}

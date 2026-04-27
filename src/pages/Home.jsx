import ContactSection from "../components/contact/ContactSection.jsx";
// import CtaBand from "../components/cta/CtaBand.jsx";
import FooterDark from "../components/footer/FooterDark.jsx";
import Hero from "../components/hero/Hero.jsx";
// import NewsSection from '../components/news/NewsSection.jsx'
import NumbersBand from "../components/numbers/NumbersBand.jsx";
import SectorsStrip from "../components/sectors/SectorsStrip.jsx";
import ServicesSection from "../components/services/ServicesSection.jsx";
import ValuesSection from "../components/values/ValuesSection.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SectorsStrip />
      <ValuesSection />
      <NumbersBand />
      {/* <NewsSection /> */}
      <ContactSection />
      {/* <CtaBand /> */}
      <FooterDark />
    </>
  );
}

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Navbar/Hero";
import TrustedBy from "../../components/TrustedBy/TrustedBy";
import Features from "../../components/Features/Features";
import Templates from "../Templates/Templates";

import Pricing from "../../components/Pricing/Pricing";
import CTA from "../../components/CTA/CTA";
import Footer from "../../components/Footer/Footer";

import "../../App.css";
function Landing() {
  return (
    <div className="landing-page">
      <Navbar />

      <main>
        <Hero />
        <TrustedBy />
        <Features />
        <Templates />
        <Pricing/>
        <CTA/>
         </main>

         <Footer/>
    </div>
  );
}

export default Landing;
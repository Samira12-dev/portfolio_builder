import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import "./App.css";

function Landing() {
  return (
    <div className="landing-page">

      <Navbar />

      <main>
        <Hero />
      </main>

    </div>
  );
}

export default Landing;
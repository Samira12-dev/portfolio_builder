import { Link } from "react-router-dom";
import "./App.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-container">

        {/* Left side */}
        <div className="hero-content">

          <div className="hero-badge">
            ✨ AI-powered portfolio builder
          </div>

          <h1>
            Build Your Professional
            <span> Portfolio with AI</span>
          </h1>

          <p>
            Create a stunning professional portfolio in minutes.
            No coding, no design skills required. Let AI do the work for you.
          </p>

          <div className="hero-actions">

            <Link to="/register" className="btn-primary hero-button">
              Get Started Free
            </Link>

            <a href="#templates" className="hero-secondary-button">
              Watch Demo
            </a>

          </div>

          <div className="hero-note">
            ✓ Free to get started
            <span>•</span>
            ✓ No credit card required
          </div>

        </div>

        {/* Right side */}
        <div className="hero-preview">

          <div className="preview-window">

            <div className="preview-header">
              <div className="preview-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="preview-url">
                portfolioai.com
              </div>
            </div>

            <div className="preview-content">

              <div className="preview-profile">

                <div className="preview-avatar">
                  SK
                </div>

                <div>
                  <h3>Samira Khwan</h3>
                  <p>Full Stack Developer</p>
                </div>

              </div>

              <div className="preview-line large"></div>
              <div className="preview-line"></div>
              <div className="preview-line short"></div>

              <div className="preview-cards">

                <div className="preview-card"></div>
                <div className="preview-card"></div>
                <div className="preview-card"></div>

              </div>

            </div>

          </div>

          <div className="hero-floating-card">
            <strong>✨ AI Generated</strong>
            <span>Professional content ready</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
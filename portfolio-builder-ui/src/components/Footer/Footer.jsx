import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import "../../App.css";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-icon">P</span>
              <span>PortfolioAI</span>
            </div>

            <p>
              Build your professional portfolio with
              the power of AI.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="GitHub">
                <FiGithub />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FiLinkedin />
              </a>

              <a href="#" aria-label="Twitter">
                <FiTwitter />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#blog">Blog</a>
            <a href="#contact">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © 2026 PortfolioAI. All rights reserved.
          </p>

          <p>
            Built with ❤️ and AI
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
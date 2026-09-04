import { Link } from "react-router-dom";
import "../../App.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">P</span>
          <span>PortfolioAI</span>
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#templates">Templates</a>
          <a href="#pricing">Pricing</a>
          <a href="#blog">Blog</a>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <Link to="/login" className="login-link">
            Login
          </Link>

          <Link to="/register" className="btn-primary navbar-button">
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
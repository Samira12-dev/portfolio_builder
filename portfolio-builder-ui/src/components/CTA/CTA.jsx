import { Link } from "react-router-dom";
import "../../App.css";


function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">

        <div className="cta-content">
          <span className="cta-badge">
            ✨ Start building today
          </span>

          <h2>
            Your professional portfolio
            <span> is just a few clicks away.</span>
          </h2>

          <p>
            Create your portfolio with AI and share your
            professional story with the world.
          </p>

          <Link to="/register" className="btn-primary cta-button">
            Create My Portfolio
          </Link>
        </div>

      </div>
    </section>
  );
}

export default CTA;
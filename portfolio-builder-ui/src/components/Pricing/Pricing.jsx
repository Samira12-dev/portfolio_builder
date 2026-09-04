import { FiCheck } from "react-icons/fi";
import "../../App.css";


function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "0",
      description: "Perfect for getting started.",
      features: [
        "1 Portfolio",
        "Basic Templates",
        "Custom Profile",
        "Public Portfolio",
      ],
      popular: false,
    },
    {
      name: "Pro",
      price: "9",
      description: "For professionals who want more.",
      features: [
        "Unlimited Portfolios",
        "All Templates",
        "AI Content Assistant",
        "Custom Domain",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "19",
      description: "For serious personal branding.",
      features: [
        "Everything in Pro",
        "Advanced AI Tools",
        "Analytics",
        "Premium Templates",
        "Personal Branding Tools",
      ],
      popular: false,
    },
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-container">

        <div className="section-heading">
          <span className="section-badge">PRICING</span>

          <h2>
            Simple plans,
            <span> powerful features</span>
          </h2>

          <p>
            Choose the plan that fits your needs and start
            building your professional presence.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              className={`pricing-card ${
                plan.popular ? "popular" : ""
              }`}
              key={index}
            >
              {plan.popular && (
                <div className="popular-badge">
                  Most Popular
                </div>
              )}

              <h3>{plan.name}</h3>

              <p className="pricing-description">
                {plan.description}
              </p>

              <div className="price">
                <span>$</span>
                {plan.price}
                <small>/month</small>
              </div>

              <button
                className={
                  plan.popular
                    ? "btn-primary pricing-button"
                    : "pricing-button outline"
                }
              >
                Get Started
              </button>

              <div className="pricing-features">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    className="pricing-feature"
                    key={featureIndex}
                  >
                    <FiCheck />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Pricing;
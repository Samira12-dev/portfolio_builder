import "../../App.css";

function Templates() {
  const templates = [
    {
      name: "Modern",
      category: "Developer",
      initials: "SK",
      description: "Clean and modern portfolio for developers.",
    },
    {
      name: "Creative",
      category: "Designer",
      initials: "AM",
      description: "Creative layout made to showcase your work.",
    },
    {
      name: "Professional",
      category: "Professional",
      initials: "JD",
      description: "Elegant portfolio for professionals and freelancers.",
    },
  ];

  return (
    <section className="templates-section" id="templates">
      <div className="templates-container">

        <div className="section-heading">
          <span className="section-badge">TEMPLATES</span>

          <h2>
            Choose your
            <span> perfect style</span>
          </h2>

          <p>
            Start with a professionally designed template and
            customize it to match your personal brand.
          </p>
        </div>

        <div className="templates-grid">
          {templates.map((template, index) => (
            <div className="template-card" key={index}>

              <div className="template-preview">

                <div className="template-browser">
                  <div className="template-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="template-body">

                  <div className="template-profile">
                    <div className="template-avatar">
                      {template.initials}
                    </div>

                    <div className="template-profile-info">
                      <div className="template-name-line"></div>
                      <div className="template-job-line"></div>
                    </div>
                  </div>

                  <div className="template-main-line"></div>
                  <div className="template-small-line"></div>

                  <div className="template-projects">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                </div>
              </div>

              <div className="template-info">
                <div>
                  <h3>{template.name}</h3>
                  <span>{template.category}</span>
                </div>

                <button className="template-button">
                  Preview
                </button>
              </div>

              <p className="template-description">
                {template.description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Templates;
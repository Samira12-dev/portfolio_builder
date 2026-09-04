import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCheck,
  FiEye,
  FiLayout,
} from "react-icons/fi";
import "../../App.css";

function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("portfolioTemplate") || "modern"
  );

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and professional design for developers.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple layout focused on your content.",
    },
    {
      id: "creative",
      name: "Creative",
      description: "A modern style for creative professionals.",
    },
  ];

  const handleSelect = (id) => {
    setSelectedTemplate(id);
    localStorage.setItem("portfolioTemplate", id);
  };

  return (
    <div className="templates-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Choose a Template</h1>
          <p>Select the design for your portfolio.</p>
        </div>

        <Link
          to="/dashboard/preview"
          className="btn-primary"
        >
          <FiEye />
          Preview Portfolio
        </Link>
      </div>

      {/* Templates */}
      <div className="templates-grid">

        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-card ${
              selectedTemplate === template.id
                ? "selected"
                : ""
            }`}
          >

            {/* Template Preview */}
            <div
              className={`template-preview ${template.id}`}
            >
              <div className="preview-header"></div>

              <div className="preview-content">

                <div className="preview-avatar"></div>

                <div className="preview-line large"></div>

                <div className="preview-line"></div>

                <div className="preview-cards">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            </div>

            {/* Template Info */}
            <div className="template-info">

              <div>
                <h3>{template.name}</h3>

                <p>
                  {template.description}
                </p>
              </div>

              {selectedTemplate === template.id && (
                <div className="selected-icon">
                  <FiCheck />
                </div>
              )}

            </div>

            {/* Select Button */}
            <button
              className={
                selectedTemplate === template.id
                  ? "template-button selected-button"
                  : "template-button"
              }
              onClick={() =>
                handleSelect(template.id)
              }
            >
              {selectedTemplate === template.id
                ? "Selected"
                : "Use this template"}
            </button>

          </div>
        ))}

      </div>

      {/* Tip */}
      <div className="template-tip">

        <FiLayout />

        <div>
          <strong>
            You can change your template anytime.
          </strong>

          <p>
            Your portfolio content will stay the same
            when you switch designs.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Templates;
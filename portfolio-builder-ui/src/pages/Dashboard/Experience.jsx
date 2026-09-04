import { useEffect, useState } from "react";
import { FiPlus, FiX, FiBriefcase } from "react-icons/fi";

import "../../App.css";


function Experience() {
const [experiences, setExperiences] = useState(() => {
  const savedExperiences = localStorage.getItem(
    "portfolioExperiences"
  );

  return savedExperiences
    ? JSON.parse(savedExperiences)
    : [];
});

useEffect(() => {
  localStorage.setItem(
    "portfolioExperiences",
    JSON.stringify(experiences)
  );
}, [experiences]);

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        ...formData,
      },
    ]);

    setFormData({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    setShowForm(false);
  };

  const removeExperience = (id) => {
    setExperiences(
      experiences.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="experience-page">

      <div className="page-header">
        <div>
          <h1>Experience</h1>
          <p>
            Add your professional experience.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Experience
        </button>
      </div>

      {showForm && (
        <div className="experience-form-card">

          <div className="experience-form-header">
            <h2>Add Experience</h2>

            <button
              onClick={() => setShowForm(false)}
            >
              <FiX />
            </button>
          </div>

          <form
            className="experience-form"
            onSubmit={handleSubmit}
          >

            <div className="experience-field">
              <label>Position</label>

              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                required
              />
            </div>

            <div className="experience-field">
              <label>Company</label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                required
              />
            </div>

            <div className="experience-field">
              <label>Start Date</label>

              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="experience-field">
              <label>End Date</label>

              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="experience-field full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your responsibilities..."
                rows="4"
              />
            </div>

            <div className="experience-actions">

              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-primary"
              >
                Save Experience
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="experience-list">

        {experiences.length === 0 && !showForm ? (
          <div className="experience-empty">

            <div className="experience-empty-icon">
              <FiBriefcase />
            </div>

            <h2>No experience added</h2>

            <p>
              Add your professional experience to make
              your portfolio more complete.
            </p>

            <button
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              <FiPlus />
              Add Experience
            </button>

          </div>
        ) : (
          experiences.map((experience) => (
            <div
              className="experience-card"
              key={experience.id}
            >
              <div className="experience-icon">
                <FiBriefcase />
              </div>

              <div className="experience-content">

                <div className="experience-top">
                  <div>
                    <h3>{experience.position}</h3>
                    <span>{experience.company}</span>
                  </div>

                  <button
                    onClick={() =>
                      removeExperience(experience.id)
                    }
                  >
                    <FiX />
                  </button>
                </div>

                <p className="experience-date">
                  {experience.startDate || "Start"} —{" "}
                  {experience.endDate || "Present"}
                </p>

                <p className="experience-description">
                  {experience.description}
                </p>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Experience;
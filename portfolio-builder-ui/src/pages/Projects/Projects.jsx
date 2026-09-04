import { useEffect, useState } from "react";
import {
  FiPlus,
  FiGithub,
  FiExternalLink,
  FiEdit3,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import "../../App.css";

function Projects() {
  const [showForm, setShowForm] = useState(false);

  const [projects, setProjects] = useState(() => {
  const savedProjects = localStorage.getItem("portfolioProjects");
  return savedProjects ? JSON.parse(savedProjects) : [];
});
useEffect(() => {
  localStorage.setItem("portfolioProjects", JSON.stringify(projects));
}, [projects]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now(),
      ...formData,
    };

    setProjects([...projects, newProject]);

    setFormData({
      title: "",
      description: "",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    setProjects(
      projects.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="projects-page">

      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>
            Showcase your best work and projects.
          </p>
        </div>

        <button
          className="btn-primary add-project-button"
          onClick={() => setShowForm(true)}
        >
          <FiPlus />
          Add Project
        </button>
      </div>

      {/* Add Project Form */}

      {showForm && (
        <div className="project-form-card">

          <div className="project-form-header">
            <div>
              <h2>Add Project</h2>
              <p>
                Add a project to your portfolio.
              </p>
            </div>

            <button
              className="close-form-button"
              onClick={() => setShowForm(false)}
            >
              <FiX />
            </button>
          </div>

          <form
            className="project-form"
            onSubmit={handleSubmit}
          >

            <div className="project-field">
              <label>Project Name</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. PortfolioAI"
                required
              />
            </div>

            <div className="project-field">
              <label>Technologies</label>

              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                placeholder="React, Spring Boot, MySQL"
              />
            </div>

            <div className="project-field full-width">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows="4"
                required
              />
            </div>

            <div className="project-field">
              <label>GitHub URL</label>

              <input
                type="text"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
              />
            </div>

            <div className="project-field">
              <label>Live Demo URL</label>

              <input
                type="text"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

            <div className="project-form-actions">

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
                <FiPlus />
                Add Project
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Projects */}

      {projects.length === 0 && !showForm ? (
        <div className="projects-empty">

          <div className="projects-empty-icon">
            <FiPlus />
          </div>

          <h2>No projects yet</h2>

          <p>
            Add your first project to start building
            your professional portfolio.
          </p>

          <button
            className="btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FiPlus />
            Add Your First Project
          </button>

        </div>
      ) : (
        <div className="projects-grid">

          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
            >

              <div className="project-card-top">

                <div className="project-card-icon">
                  <FiGithub />
                </div>

                <div className="project-card-actions">
                  <button>
                    <FiEdit3 />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(project.id)
                    }
                  >
                    <FiTrash2 />
                  </button>
                </div>

              </div>

              <h3>{project.title}</h3>

              <p>
                {project.description}
              </p>

              <span className="project-tech">
                {project.technologies || "Technology"}
              </span>

              <div className="project-links">

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiGithub />
                    GitHub
                  </a>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FiExternalLink />
                    Live Demo
                  </a>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Projects;
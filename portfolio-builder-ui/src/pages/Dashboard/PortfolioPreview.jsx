import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiLinkedin,
  FiCheckCircle,
} from "react-icons/fi";
import "../../App.css";

function PortfolioPreview() {
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [template, setTemplate] = useState("modern");
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    setProfile(
      JSON.parse(localStorage.getItem("portfolioProfile")) || {}
    );

    setProjects(
      JSON.parse(localStorage.getItem("portfolioProjects")) || []
    );

    setSkills(
      JSON.parse(localStorage.getItem("portfolioSkills")) || []
    );

    setExperiences(
      JSON.parse(localStorage.getItem("portfolioExperiences")) || []
    );

    setEducation(
      JSON.parse(localStorage.getItem("portfolioEducation")) || []
    );

    setTemplate(
      localStorage.getItem("portfolioTemplate") || "modern"
    );

    setIsPublished(
      localStorage.getItem("portfolioPublished") === "true"
    );
  }, []);

  const handlePublish = () => {
    localStorage.setItem("portfolioPublished", "true");
    setIsPublished(true);
  };

  const fullName = profile.fullName || "Your Name";

  const jobTitle =
    profile.jobTitle || "Full Stack Developer";

  const bio =
    profile.bio ||
    "I am a passionate developer building modern and useful digital experiences.";

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`portfolio-preview ${template}`}>

      {/* Toolbar */}
      <div className="preview-toolbar">

        <Link to="/dashboard">
          <FiArrowLeft />
          Dashboard
        </Link>

        <div className="preview-toolbar-actions">

          <Link to="/dashboard/templates">
            Change Template
          </Link>

          <a
            href="/portfolio/samira"
            target="_blank"
            rel="noreferrer"
          >
            <FiExternalLink />
            Open Portfolio
          </a>

          <button
            className="publish-button"
            onClick={handlePublish}
          >
            <FiCheckCircle />

            {isPublished
              ? "Published"
              : "Publish Portfolio"}
          </button>

        </div>

      </div>

      {/* Portfolio */}
      <div className="portfolio-page">

        {/* Hero */}
        <section className="portfolio-hero">

          <div className="portfolio-avatar">
            {initials}
          </div>

          <p className="portfolio-role">
            {jobTitle}
          </p>

          <h1>{fullName}</h1>

          <p className="portfolio-bio">
            {bio}
          </p>

          <div className="portfolio-socials">

            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <FiGithub />
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FiLinkedin />
              </a>
            )}

          </div>

        </section>

        {/* About */}
        {bio && (
          <section className="portfolio-section">

            <h2>About Me</h2>

            <p>{bio}</p>

          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="portfolio-section">

            <h2>Skills</h2>

            <div className="portfolio-skills">

              {skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}

            </div>

          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="portfolio-section">

            <h2>Experience</h2>

            <div className="portfolio-experience">

              {experiences.map((experience) => (
                <div
                  className="portfolio-experience-item"
                  key={experience.id}
                >

                  <h3>
                    {experience.position}
                  </h3>

                  <strong>
                    {experience.company}
                  </strong>

                  <span>
                    {experience.startDate} —{" "}
                    {experience.endDate || "Present"}
                  </span>

                  <p>
                    {experience.description}
                  </p>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="portfolio-section">

            <h2>Education</h2>

            <div className="portfolio-education">

              {education.map((item) => (
                <div
                  className="portfolio-education-item"
                  key={item.id}
                >

                  <h3>
                    {item.degree}
                  </h3>

                  <strong>
                    {item.school}
                  </strong>

                  {item.field && (
                    <p>{item.field}</p>
                  )}

                  <span>
                    {item.startDate} —{" "}
                    {item.endDate || "Present"}
                  </span>

                </div>
              ))}

            </div>

          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="portfolio-section">

            <h2>Projects</h2>

            <div className="portfolio-projects">

              {projects.map((project) => (
                <article
                  className="portfolio-project-card"
                  key={project.id}
                >

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="project-tech">

                      {project.technologies
                        .split(",")
                        .map((tech, index) => (
                          <span key={index}>
                            {tech.trim()}
                          </span>
                        ))}

                    </div>
                  )}

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

                </article>
              ))}

            </div>

          </section>
        )}

      </div>

    </div>
  );
}

export default PortfolioPreview;
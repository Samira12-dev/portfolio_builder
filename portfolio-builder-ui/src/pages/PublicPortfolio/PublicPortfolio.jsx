import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiExternalLink,
  FiLock,
} from "react-icons/fi";
import "../../App.css";

function PublicPortfolio() {
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

  // Portfolio not published
  if (!isPublished) {
    return (
      <div className="public-portfolio-unpublished">
        <div className="unpublished-card">

          <div className="unpublished-icon">
            <FiLock />
          </div>

          <h1>Portfolio Not Published</h1>

          <p>
            This portfolio is currently private.
            The owner needs to publish it before it becomes
            publicly available.
          </p>

          <Link
            to="/dashboard"
            className="btn-primary"
          >
            Go to Dashboard
          </Link>

        </div>
      </div>
    );
  }

  const fullName = profile.fullName || "Your Name";

  const jobTitle =
    profile.jobTitle || "Full Stack Developer";

  const bio =
    profile.bio ||
    "Welcome to my professional portfolio.";

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={`public-portfolio ${template}`}>

      {/* Hero */}
      <section className="public-hero">

        <div className="public-avatar">
          {initials}
        </div>

        <p className="public-role">
          {jobTitle}
        </p>

        <h1>{fullName}</h1>

        <p className="public-bio">
          {bio}
        </p>

        <div className="public-socials">

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

          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink />
            </a>
          )}

        </div>

      </section>

      <main className="public-content">

        {/* About */}
        {bio && (
          <section className="public-section">
            <h2>About Me</h2>
            <p>{bio}</p>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="public-section">

            <h2>Skills</h2>

            <div className="public-skills">

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
          <section className="public-section">

            <h2>Experience</h2>

            <div className="public-experience">

              {experiences.map((experience) => (
                <article
                  key={experience.id}
                  className="public-experience-card"
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

                </article>
              ))}

            </div>

          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="public-section">

            <h2>Education</h2>

            <div className="public-education">

              {education.map((item) => (
                <article
                  key={item.id}
                  className="public-education-card"
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

                </article>
              ))}

            </div>

          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="public-section">

            <h2>Projects</h2>

            <div className="public-projects">

              {projects.map((project) => (
                <article
                  key={project.id}
                  className="public-project-card"
                >

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  {project.technologies && (
                    <div className="public-tech">

                      {project.technologies
                        .split(",")
                        .map((tech, index) => (
                          <span key={index}>
                            {tech.trim()}
                          </span>
                        ))}

                    </div>
                  )}

                  <div className="public-project-links">

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

      </main>

      <footer className="public-footer">
        <p>Built with PortfolioAI</p>
      </footer>

    </div>
  );
}

export default PublicPortfolio;
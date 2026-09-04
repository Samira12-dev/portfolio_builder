import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiEye,
  FiEdit3,
  FiPlus,
  FiCheckCircle,
  FiUser,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";
import "../../App.css";
function DashboardHome() {
  const [profile, setProfile] = useState({});
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
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

    setIsPublished(
      localStorage.getItem("portfolioPublished") === "true"
    );
  }, []);

  const profileFields = [
    profile.fullName,
    profile.email,
    profile.location,
    profile.jobTitle,
    profile.bio,
    profile.github,
    profile.linkedin,
    profile.website,
  ];

  const completedFields = profileFields.filter(
    (field) => field && String(field).trim() !== ""
  ).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const portfolioName = profile.fullName || "Your Portfolio";

  return (
    <div className="dashboard-home">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>
            Welcome back, {portfolioName.split(" ")[0]} 👋
          </h1>

          <p>
            Let's continue building your professional portfolio.
          </p>
        </div>

        <Link
          to="/dashboard/profile"
          className="btn-primary dashboard-create-button"
        >
          <FiEdit3 />
          Edit Profile
        </Link>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <div className="stat-icon">
            <FiBriefcase />
          </div>

          <div>
            <span>Projects</span>
            <strong>{projects.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiAward />
          </div>

          <div>
            <span>Skills</span>
            <strong>{skills.length}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiEdit3 />
          </div>

          <div>
            <span>Profile Completion</span>
            <strong>{profileCompletion}%</strong>
          </div>
        </div>

      </div>

      {/* Main Cards */}
      <div className="dashboard-content-grid">

        {/* Profile Completion */}
        <div className="dashboard-card">

          <div className="dashboard-card-header">
            <div>
              <h2>Profile Completion</h2>
              <p>
                Complete your profile to make your portfolio stronger.
              </p>
            </div>

            <FiUser />
          </div>

          <div className="completion-bar">
            <div
              className="completion-progress"
              style={{
                width: `${profileCompletion}%`,
              }}
            ></div>
          </div>

          <div className="completion-info">
            <span>{profileCompletion}% completed</span>

            <Link to="/dashboard/profile">
              Complete profile
            </Link>
          </div>

        </div>

        {/* Portfolio Status */}
        <div className="dashboard-card">

          <div className="dashboard-card-header">
            <div>
              <h2>Portfolio Status</h2>
              <p>
                Manage your portfolio visibility.
              </p>
            </div>

            <FiCheckCircle />
          </div>

          <div
            className={`portfolio-status ${
              isPublished ? "published" : "draft"
            }`}
          >
            <span></span>

            {isPublished ? "Published" : "Draft"}
          </div>

          {isPublished ? (
            <Link
              to="/portfolio/samira"
              className="dashboard-view-link"
            >
              <FiEye />
              View Portfolio
            </Link>
          ) : (
            <Link
              to="/dashboard/preview"
              className="dashboard-view-link"
            >
              <FiEye />
              Preview Portfolio
            </Link>
          )}

        </div>

      </div>

      {/* Quick Actions */}
      <div className="dashboard-card quick-actions-card">

        <div className="dashboard-card-header">
          <div>
            <h2>Quick Actions</h2>

            <p>
              Quickly add or update your portfolio content.
            </p>
          </div>

          <FiPlus />
        </div>

        <div className="quick-actions">

          <Link
            to="/dashboard/profile"
            className="quick-action"
          >
            <div className="quick-action-icon">
              <FiUser />
            </div>

            <div>
              <strong>Edit Profile</strong>
              <span>Update your personal information</span>
            </div>
          </Link>

          <Link
            to="/dashboard/projects"
            className="quick-action"
          >
            <div className="quick-action-icon">
              <FiBriefcase />
            </div>

            <div>
              <strong>Add Project</strong>
              <span>Showcase your best projects</span>
            </div>
          </Link>

          <Link
            to="/dashboard/skills"
            className="quick-action"
          >
            <div className="quick-action-icon">
              <FiAward />
            </div>

            <div>
              <strong>Add Skill</strong>
              <span>Highlight your technical skills</span>
            </div>
          </Link>

          <Link
            to="/dashboard/experience"
            className="quick-action"
          >
            <div className="quick-action-icon">
              <FiEdit3 />
            </div>

            <div>
              <strong>Add Experience</strong>
              <span>Add your professional experience</span>
            </div>
          </Link>

          <Link
            to="/dashboard/education"
            className="quick-action"
          >
            <div className="quick-action-icon">
              <FiBookOpen />
            </div>

            <div>
              <strong>Add Education</strong>
              <span>Add your academic background</span>
            </div>
          </Link>

        </div>

      </div>

      {/* Portfolio Overview */}
      <div className="dashboard-card dashboard-overview">

        <div className="dashboard-card-header">

          <div>
            <h2>Portfolio Overview</h2>

            <p>
              Keep adding content to make your portfolio complete.
            </p>
          </div>

          <Link
            to="/dashboard/profile"
            className="dashboard-small-button"
          >
            <FiPlus />
            Add Content
          </Link>

        </div>

        <div className="overview-items">

          <div className="overview-item">
            <FiUser />

            <div>
              <strong>Profile</strong>

              <span>
                {profileCompletion === 100
                  ? "Complete"
                  : "Needs information"}
              </span>
            </div>
          </div>

          <div className="overview-item">
            <FiBriefcase />

            <div>
              <strong>Projects</strong>

              <span>
                {projects.length} project
                {projects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="overview-item">
            <FiAward />

            <div>
              <strong>Skills</strong>

              <span>
                {skills.length} skill
                {skills.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="overview-item">
            <FiEdit3 />

            <div>
              <strong>Experience</strong>

              <span>
                {experiences.length} position
                {experiences.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="overview-item">
            <FiBookOpen />

            <div>
              <strong>Education</strong>

              <span>
                {education.length} record
                {education.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardHome;
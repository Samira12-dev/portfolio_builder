import {
  FiUser,
  FiMail,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiGlobe,
  FiSave,
} from "react-icons/fi";

import "../../App.css";


function Profile() {
  return (
    <div className="profile-page">

      <div className="page-header">
        <div>
          <h1>Profile</h1>
          <p>
            Add your personal information to build your portfolio.
          </p>
        </div>

        <button className="btn-primary save-button">
          <FiSave />
          Save Changes
        </button>
      </div>

      <div className="profile-card">

        <div className="profile-card-header">
          <div className="profile-avatar">
            SK
          </div>

          <div>
            <h2>Personal Information</h2>
            <p>
              Tell visitors who you are.
            </p>
          </div>
        </div>

        <div className="profile-form">

          <div className="profile-field">
            <label>Full Name</label>

            <div className="profile-input">
              <FiUser />
              <input
                type="text"
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="profile-field">
            <label>Email</label>

            <div className="profile-input">
              <FiMail />
              <input
                type="email"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="profile-field">
            <label>Location</label>

            <div className="profile-input">
              <FiMapPin />
              <input
                type="text"
                placeholder="Morocco"
              />
            </div>
          </div>

          <div className="profile-field">
            <label>Job Title</label>

            <div className="profile-input">
              <input
                type="text"
                placeholder="Full Stack Developer"
              />
            </div>
          </div>

          <div className="profile-field full-width">
            <label>Bio</label>

            <textarea
              rows="5"
              placeholder="Write a short description about yourself..."
            ></textarea>
          </div>

          <div className="profile-field">
            <label>GitHub</label>

            <div className="profile-input">
              <FiGithub />
              <input
                type="text"
                placeholder="github.com/username"
              />
            </div>
          </div>

          <div className="profile-field">
            <label>LinkedIn</label>

            <div className="profile-input">
              <FiLinkedin />
              <input
                type="text"
                placeholder="linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="profile-field full-width">
            <label>Website</label>

            <div className="profile-input">
              <FiGlobe />
              <input
                type="text"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;
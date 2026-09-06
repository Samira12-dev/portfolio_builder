import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiBookOpen } from "react-icons/fi";
import "../../App.css"; 

function Education() {
  const [education, setEducation] = useState([]);

  const [formData, setFormData] = useState({
    degree: "",
    school: "",
    field: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const savedEducation =
      JSON.parse(localStorage.getItem("portfolioEducation")) || [];

    setEducation(savedEducation);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.degree || !formData.school) {
      return;
    }

    const newEducation = {
      id: Date.now(),
      ...formData,
    };

    const updatedEducation = [...education, newEducation];

    setEducation(updatedEducation);

    localStorage.setItem(
      "portfolioEducation",
      JSON.stringify(updatedEducation)
    );

    setFormData({
      degree: "",
      school: "",
      field: "",
      startDate: "",
      endDate: "",
    });
  };

  const handleDelete = (id) => {
    const updatedEducation = education.filter(
      (item) => item.id !== id
    );

    setEducation(updatedEducation);

    localStorage.setItem(
      "portfolioEducation",
      JSON.stringify(updatedEducation)
    );
  };

  return (
    <div className="education-page">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Education</h1>
          <p>
            Add your academic background and qualifications.
          </p>
        </div>
      </div>

      {/* Add Education Form */}
      <div className="education-card">

        <div className="education-card-header">
          <div className="education-title">
            <div className="education-icon">
              <FiBookOpen />
            </div>

            <div>
              <h2>Add Education</h2>
              <p>
                Add your degrees, universities, or academic
                qualifications.
              </p>
            </div>
          </div>
        </div>

        <form
          className="education-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">
              <label>Degree</label>

              <input
                type="text"
                name="degree"
                placeholder="e.g. Bachelor's Degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>School / University</label>

              <input
                type="text"
                name="school"
                placeholder="e.g. University Hassan II"
                value={formData.school}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Field of Study</label>

            <input
              type="text"
              name="field"
              placeholder="e.g. Computer Science"
              value={formData.field}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Start Date</label>

              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>

              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

          </div>

          <button
            type="submit"
            className="btn-primary education-add-button"
          >
            <FiPlus />
            Add Education
          </button>

        </form>
      </div>

      {/* Education List */}
      <div className="education-list">

        {education.length === 0 ? (
          <div className="education-empty">
            <FiBookOpen />

            <h3>No education added yet</h3>

            <p>
              Add your academic background using the form above.
            </p>
          </div>
        ) : (
          education.map((item) => (
            <div
              className="education-item"
              key={item.id}
            >

              <div className="education-item-icon">
                <FiBookOpen />
              </div>

              <div className="education-item-content">

                <h3>{item.degree}</h3>

                <strong>{item.school}</strong>

                {item.field && (
                  <p>{item.field}</p>
                )}

                <span>
                  {item.startDate || "—"}{" "}
                  —{" "}
                  {item.endDate || "Present"}
                </span>

              </div>

              <button
                type="button"
                className="education-delete-button"
                onClick={() => handleDelete(item.id)}
              >
                <FiTrash2 />
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Education;
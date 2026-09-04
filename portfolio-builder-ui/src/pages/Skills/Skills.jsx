import { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

import "../../App.css";

function Skills() {
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("portfolioSkills");

    return savedSkills
      ? JSON.parse(savedSkills)
      : ["Java", "Spring Boot", "React", "JavaScript", "MySQL"];
  });
  useEffect(() => {
    localStorage.setItem(
      "portfolioSkills",
      JSON.stringify(skills)
    );
  }, [skills]);
  
  const [newSkill, setNewSkill] = useState("");

  const addSkill = (e) => {
    e.preventDefault();

    if (!newSkill.trim()) return;

    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div className="skills-page">

      <div className="page-header">
        <div>
          <h1>Skills</h1>
          <p>
            Add the technologies and skills you know.
          </p>
        </div>
      </div>

      <div className="skills-card">

        <div className="skills-card-header">
          <div>
            <h2>Your Skills</h2>
            <p>
              These skills will appear on your portfolio.
            </p>
          </div>
        </div>

        <form
          className="skill-add-form"
          onSubmit={addSkill}
        >
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="e.g. Docker"
          />

          <button className="btn-primary">
            <FiPlus />
            Add
          </button>
        </form>

        <div className="skills-list">

          {skills.map((skill) => (
            <div
              className="skill-tag"
              key={skill}
            >
              <span>{skill}</span>

              <button
                onClick={() => removeSkill(skill)}
              >
                <FiX />
              </button>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Skills;
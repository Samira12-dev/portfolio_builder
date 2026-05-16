-- Add role to users
ALTER TABLE users ADD COLUMN role VARCHAR(20) NOT NULL DEFAULT 'FREE';

-- Add premium flag and description to template
ALTER TABLE template ADD COLUMN is_premium BOOLEAN DEFAULT FALSE;
ALTER TABLE template ADD COLUMN description VARCHAR(300);

-- Add generatedHtml to portfolio
ALTER TABLE portfolio ADD COLUMN generated_html LONGTEXT;

-- New table: resume
CREATE TABLE resume (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    profile_id BIGINT UNIQUE,
    chosen_version_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_resume_profile FOREIGN KEY (profile_id) REFERENCES profile(id)
);

-- New table: resume_version
CREATE TABLE resume_version (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    model_name VARCHAR(50),
    generated_html LONGTEXT,
    generated_json LONGTEXT,
    is_chosen BOOLEAN DEFAULT FALSE,
    resume_id BIGINT,
    CONSTRAINT fk_rv_resume FOREIGN KEY (resume_id) REFERENCES resume(id)
);
CREATE TABLE users (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       username VARCHAR(100) NOT NULL UNIQUE,
                       email VARCHAR(150) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         full_name VARCHAR(150) NOT NULL,
                         title VARCHAR(150),
                         bio VARCHAR(500),
                         photo VARCHAR(255),
                         github VARCHAR(255),
                         linkedin VARCHAR(255),
                         website VARCHAR(255),
                         user_id BIGINT UNIQUE,
                         CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE skill (
                       id BIGINT AUTO_INCREMENT PRIMARY KEY,
                       name VARCHAR(100) NOT NULL,
                       level INT,
                       profile_id BIGINT,
                       CONSTRAINT fk_skill_profile FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE project (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         title VARCHAR(150) NOT NULL,
                         description TEXT,
                         image VARCHAR(255),
                         github_url VARCHAR(255),
                         live_demo_url VARCHAR(255),
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         profile_id BIGINT,
                         CONSTRAINT fk_project_profile FOREIGN KEY (profile_id) REFERENCES profile(id)
);

CREATE TABLE template (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          preview_image VARCHAR(255),
                          theme VARCHAR(100)
);

CREATE TABLE portfolio (
                           id BIGINT AUTO_INCREMENT PRIMARY KEY,
                           slug VARCHAR(150) UNIQUE,
                           is_published BOOLEAN DEFAULT FALSE,
                           published_at TIMESTAMP,
                           profile_id BIGINT UNIQUE,
                           template_id BIGINT,
                           CONSTRAINT fk_portfolio_profile FOREIGN KEY (profile_id) REFERENCES profile(id),
                           CONSTRAINT fk_portfolio_template FOREIGN KEY (template_id) REFERENCES template(id)
);
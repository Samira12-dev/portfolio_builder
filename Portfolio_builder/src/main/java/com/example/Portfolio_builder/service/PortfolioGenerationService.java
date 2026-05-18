package com.example.Portfolio_builder.service;

import com.example.Portfolio_builder.entity.Portfolio;
import com.example.Portfolio_builder.entity.Profile;
import com.example.Portfolio_builder.entity.Project;
import com.example.Portfolio_builder.entity.Skill;
import com.example.Portfolio_builder.repo.*;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.hibernate.sql.Template;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PortfolioGenerationService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final PortfolioRepository portfolioRepository;
    private final TemplateRepository templateRepository;

    @Value("${anthropic.api.key}")
    private String anthropicKey;

    public Portfolio generate(Long profileId, Long templateId) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        List<Project> projects = projectRepository.findByProfileId(profileId);
        List<Skill> skills = skillRepository.findByProfileId(profileId);
        Template template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        String prompt = buildPortfolioPrompt(profile, projects, skills, template);
        String html = callClaude(prompt);

        String slug = profile.getUser().getUsername().toLowerCase()
                      + "-" + System.currentTimeMillis() % 10000;

        Portfolio portfolio = portfolioRepository.findByProfileId(profileId)
                .orElse(new Portfolio());
        portfolio.setProfile(profile);
        portfolio.setTemplate(template);
        portfolio.setSlug(slug);
        portfolio.setGeneratedHtml(html);
        portfolio.setPublished(false);

        return portfolioRepository.save(portfolio);
    }

    private String buildPortfolioPrompt(Profile p, List<Project> projects,
                                         List<Skill> skills, Template template) {
        StringBuilder sb = new StringBuilder();
        sb.append("Generate a complete, beautiful, single-file HTML portfolio website.\n");
        sb.append("Style: ").append(template.getTheme()).append(" theme.\n\n");
        sb.append("PERSON:\n");
        sb.append("Name: ").append(p.getFullName()).append("\n");
        sb.append("Title: ").append(p.getTitle()).append("\n");
        sb.append("Bio: ").append(p.getBio()).append("\n");
        if (p.getGithub() != null) sb.append("GitHub: ").append(p.getGithub()).append("\n");
        if (p.getLinkedin() != null) sb.append("LinkedIn: ").append(p.getLinkedin()).append("\n");

        sb.append("\nSKILLS:\n");
        skills.forEach(s -> sb.append("- ").append(s.getName())
                .append(" (level ").append(s.getLevel()).append("/100)\n"));

        sb.append("\nPROJECTS:\n");
        projects.forEach(pr -> {
            sb.append("- ").append(pr.getTitle()).append(": ").append(pr.getDescription());
            if (pr.getGithubUrl() != null) sb.append(" | GitHub: ").append(pr.getGithubUrl());
            if (pr.getLiveDemoUrl() != null) sb.append(" | Demo: ").append(pr.getLiveDemoUrl());
            sb.append("\n");
        });

        sb.append("\nINSTRUCTIONS:\n");
        sb.append("- Return ONLY raw HTML, no markdown, no explanation.\n");
        sb.append("- Include CSS in a <style> tag in the <head>.\n");
        sb.append("- Use Tailwind CDN for styling.\n");
        sb.append("- Make it fully responsive.\n");
        sb.append("- Include sections: Hero, About, Skills, Projects, Contact.\n");
        sb.append("- Make the bio description compelling and professional.\n");

        return sb.toString();
    }

    private String callClaude(String prompt) {
        // HTTP call to Anthropic API
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", anthropicKey);
        headers.set("anthropic-version", "2023-06-01");
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
            "model", "claude-sonnet-4-20250514",
            "max_tokens", 4096,
            "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = rest.postForEntity(
            "https://api.anthropic.com/v1/messages", request, Map.class);

        List<Map<String, Object>> content = (List<Map<String, Object>>)
            response.getBody().get("content");
        return (String) content.get(0).get("text");
    }
}
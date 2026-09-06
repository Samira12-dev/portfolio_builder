package com.example.Portfolio_builder.service;

import com.example.Portfolio_builder.dto.ResumeVersionDTO;
import com.example.Portfolio_builder.entity.*;
import com.example.Portfolio_builder.repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResumeGenerationService {

    private final ProfileRepository profileRepository;
    private final ProjectRepository projectRepository;
    private final SkillRepository skillRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeVersionRepository resumeVersionRepository;

    @Value("${anthropic.api.key}")
    private String anthropicKey;

    @Value("${openai.api.key:}")
    private String openAiKey;

    @Value("${gemini.api.key:}")
    private String geminiKey;

    public Resume generateMultiModel(Long profileId) throws Exception {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        List<Project> projects = projectRepository.findByProfileId(profileId);
        List<Skill> skills = skillRepository.findByProfileId(profileId);

        String prompt = buildResumePrompt(profile, projects, skills);

        CompletableFuture<String> claudeFuture =
                CompletableFuture.supplyAsync(() -> callClaude(prompt));
        CompletableFuture<String> gptFuture =
                CompletableFuture.supplyAsync(() -> callGPT4o(prompt));
        CompletableFuture<String> geminiFuture =
                CompletableFuture.supplyAsync(() -> callGemini(prompt));

        CompletableFuture.allOf(claudeFuture, gptFuture, geminiFuture).get();

        Resume resume = resumeRepository.findByProfileId(profileId)
                .orElse(new Resume());
        resume.setProfile(profile);
        resume = resumeRepository.save(resume);

        saveVersion(resume, "claude", claudeFuture.get());
        saveVersion(resume, "gpt-4o", gptFuture.get());
        saveVersion(resume, "gemini", geminiFuture.get());

        return resume;
    }

    public List<ResumeVersionDTO> getVersions(Long resumeId) {
        return resumeVersionRepository.findByResumeId(resumeId).stream()
                .map(v -> new ResumeVersionDTO(
                        v.getId(), v.getModelName(), v.getGeneratedHtml(), v.isChosen()))
                .collect(Collectors.toList());
    }

    public void chooseVersion(Long resumeId, Long versionId) {
        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        resumeVersionRepository.findByResumeId(resumeId)
                .forEach(v -> { v.setChosen(false); resumeVersionRepository.save(v); });
        ResumeVersion chosen = resumeVersionRepository.findById(versionId)
                .orElseThrow(() -> new RuntimeException("Version not found"));
        chosen.setChosen(true);
        resume.setChosenVersion(chosen);
        resumeVersionRepository.save(chosen);
        resumeRepository.save(resume);
    }

    private void saveVersion(Resume resume, String model, String html) {
        ResumeVersion v = new ResumeVersion();
        v.setResume(resume);
        v.setModelName(model);
        v.setGeneratedHtml(html);
        resumeVersionRepository.save(v);
    }

    private String buildResumePrompt(Profile p, List<Project> projects, List<Skill> skills) {
        StringBuilder sb = new StringBuilder();
        sb.append("Generate a clean, ATS-friendly, single-file HTML resume.\n");
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

        sb.append("\nReturn ONLY raw HTML, no markdown, no explanation.");
        return sb.toString();
    }

    private String callClaude(String prompt) {
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

    private String callGPT4o(String prompt) {
        if (openAiKey == null || openAiKey.isBlank()) return "<!-- GPT-4o key not configured -->";
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> body = Map.of(
                "model", "gpt-4o",
                "max_tokens", 4096,
                "messages", List.of(Map.of("role", "user", "content", prompt))
        );

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = rest.postForEntity(
                "https://api.openai.com/v1/chat/completions", request, Map.class);

        List<Map<String, Object>> choices = (List<Map<String, Object>>)
                response.getBody().get("choices");
        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
        return (String) message.get("content");
    }

    private String callGemini(String prompt) {
        if (geminiKey == null || geminiKey.isBlank()) return "<!-- Gemini key not configured -->";
        RestTemplate rest = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, Object> part = Map.of("text", prompt);
        Map<String, Object> content = Map.of("parts", List.of(part));
        Map<String, Object> body = Map.of("contents", List.of(content));

        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + geminiKey;
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<Map> response = rest.postForEntity(url, request, Map.class);

        List<Map<String, Object>> candidates = (List<Map<String, Object>>)
                response.getBody().get("candidates");
        Map<String, Object> candidate = candidates.get(0);
        Map<String, Object> cnt = (Map<String, Object>) candidate.get("content");
        List<Map<String, Object>> parts = (List<Map<String, Object>>) cnt.get("parts");
        return (String) parts.get(0).get("text");
    }
}
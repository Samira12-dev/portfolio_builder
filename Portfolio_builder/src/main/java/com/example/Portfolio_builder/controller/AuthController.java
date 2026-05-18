package com.example.Portfolio_builder.controller;

import com.example.Portfolio_builder.dto.LoginDTO;
import com.example.Portfolio_builder.dto.ProfileRequestDTO;
import com.example.Portfolio_builder.dto.ProfileResponseDTO;
import com.example.Portfolio_builder.dto.RegisterUserDTO;
import com.example.Portfolio_builder.entity.Portfolio;
import com.example.Portfolio_builder.repo.PortfolioRepository;
import com.example.Portfolio_builder.service.AuthService;
import com.example.Portfolio_builder.service.PortfolioGenerationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Map;

// AuthController.java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterUserDTO dto) {
        String token = authService.register(dto);
        return ResponseEntity.ok(Map.of("token", token));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginDTO dto) {
        String token = authService.login(dto);
        return ResponseEntity.ok(Map.of("token", token));
    }
}

// ProfileController.java
@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDTO> getMyProfile(Principal principal) {
        return ResponseEntity.ok(profileService.getByUsername(principal.getName()));
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @Valid @RequestBody ProfileRequestDTO dto, Principal principal) {
        return ResponseEntity.ok(profileService.update(principal.getName(), dto));
    }
}

// PortfolioController.java
@RestController
@RequestMapping("/api/portfolio")
@RequiredArgsConstructor
public class PortfolioController {

    private final PortfolioGenerationService generationService;
    private final PortfolioRepository portfolioRepository;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, String>> generate(
            @RequestBody Map<String, Long> body, Principal principal) {
        // body: { "templateId": 1 }
        Long profileId = getProfileId(principal);
        Portfolio p = generationService.generate(profileId, body.get("templateId"));
        return ResponseEntity.ok(Map.of(
            "slug", p.getSlug(),
            "portfolioId", String.valueOf(p.getId())
        ));
    }

    @PostMapping("/{id}/publish")
    public ResponseEntity<Void> publish(@PathVariable Long id) {
        Portfolio p = portfolioRepository.findById(id).orElseThrow();
        p.setPublished(true);
        p.setPublishedAt(LocalDateTime.now());
        portfolioRepository.save(p);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/preview/{slug}")
    public ResponseEntity<String> preview(@PathVariable String slug) {
        Portfolio p = portfolioRepository.findBySlug(slug).orElseThrow();
        return ResponseEntity.ok()
            .contentType(MediaType.TEXT_HTML)
            .body(p.getGeneratedHtml());
    }
}

// ResumeController.java
@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeGenerationService resumeService;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, Long>> generate(Principal principal) throws Exception {
        Long profileId = getProfileId(principal);
        Resume resume = resumeService.generateMultiModel(profileId);
        return ResponseEntity.ok(Map.of("resumeId", resume.getId()));
    }

    @GetMapping("/{resumeId}/versions")
    public ResponseEntity<List<ResumeVersionDTO>> getVersions(@PathVariable Long resumeId) {
        // returns 3 versions for side-by-side comparison
        return ResponseEntity.ok(resumeService.getVersions(resumeId));
    }

    @PostMapping("/{resumeId}/choose/{versionId}")
    public ResponseEntity<Void> chooseVersion(
            @PathVariable Long resumeId, @PathVariable Long versionId) {
        resumeService.chooseVersion(resumeId, versionId);
        return ResponseEntity.ok().build();
    }
}
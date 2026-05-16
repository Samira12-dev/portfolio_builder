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

    // For Pro users: generate 3 versions in parallel
    public Resume generateMultiModel(Long profileId) throws Exception {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        List<Project> projects = projectRepository.findByProfileId(profileId);
        List<Skill> skills = skillRepository.findByProfileId(profileId);

        String prompt = buildResumePrompt(profile, projects, skills);

        // Call Claude, GPT-4o, Gemini in parallel using CompletableFuture
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

        // Save 3 versions
        saveVersion(resume, "claude", claudeFuture.get());
        saveVersion(resume, "gpt-4o", gptFuture.get());
        saveVersion(resume, "gemini", geminiFuture.get());

        return resume;
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
        // Build a clear, structured prompt
        // Returns HTML resume — similar to portfolio prompt but resume format
        return "Generate a clean, ATS-friendly, single-file HTML resume...\n"
               + "Name: " + p.getFullName() + "\n"
               // ... add all fields
               + "Return ONLY raw HTML.";
    }

    private String callClaude(String prompt) { /* same as PortfolioGenerationService */ return ""; }
    private String callGPT4o(String prompt) {
        // Call OpenAI API — similar pattern, different URL + key
        return "";
    }
    private String callGemini(String prompt) {
        // Call Google Gemini API
        return "";
    }
}
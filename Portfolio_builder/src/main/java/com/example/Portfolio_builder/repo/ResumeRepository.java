@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByProfileId(Long profileId);
}
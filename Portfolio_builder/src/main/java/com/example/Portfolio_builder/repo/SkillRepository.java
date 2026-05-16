@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByProfileId(Long profileId);
}
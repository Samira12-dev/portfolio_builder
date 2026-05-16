@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findBySlug(String slug);
    Optional<Portfolio> findByProfileId(Long profileId);
}
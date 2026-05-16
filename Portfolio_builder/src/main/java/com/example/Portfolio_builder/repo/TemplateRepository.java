@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByIsPremiumFalse();       // free templates
    List<Template> findByIsPremiumTrue();         // premium templates
}
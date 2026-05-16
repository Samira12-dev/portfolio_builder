@Entity
@Data
public class Portfolio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String slug;            // yourname.portai.com slug

    private boolean isPublished = false;

    private LocalDateTime publishedAt;

    @Column(columnDefinition = "LONGTEXT")
    private String generatedHtml;   // full HTML from AI

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;
}
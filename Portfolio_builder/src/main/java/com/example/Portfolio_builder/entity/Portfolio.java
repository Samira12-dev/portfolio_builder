package com.example.Portfolio_builder.entity;

import com.example.Portfolio_builder.entity.Profile;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.sql.Template;

import java.time.LocalDateTime;

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
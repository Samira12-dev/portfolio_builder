package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
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
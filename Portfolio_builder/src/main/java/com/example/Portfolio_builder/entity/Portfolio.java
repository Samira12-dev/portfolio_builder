package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String slug;

    private boolean isPublished;

    private LocalDateTime publishedAt;

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "template_id")
    private Template template;
}

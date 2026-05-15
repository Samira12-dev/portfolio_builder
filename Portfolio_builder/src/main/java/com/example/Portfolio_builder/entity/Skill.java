package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Skill name is required")
    private String name;

    @Min(1)
    @Max(100)
    private int level;

    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
}

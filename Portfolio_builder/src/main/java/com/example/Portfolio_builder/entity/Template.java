package com.example.Portfolio_builder.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String previewImage;

    private String theme;           // e.g. "minimal", "creative", "developer"

    private boolean isPremium = false;  // FREE vs paid template

    private String description;     // short description shown in picker UI
}
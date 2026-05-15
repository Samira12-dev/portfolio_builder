package com.example.Portfolio_builder.dto;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;


public class ProjectRequestDTO {
    @NotBlank
    private String title;

    private String description;

    private String image;

    private String githubUrl;

    private String liveDemoUrl;
}

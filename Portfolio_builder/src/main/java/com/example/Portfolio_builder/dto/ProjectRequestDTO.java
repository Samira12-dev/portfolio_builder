package com.example.Portfolio_builder.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProjectRequestDTO {
    @NotBlank
    private String title;

    private String description;

    private String image;

    private String githubUrl;

    private String liveDemoUrl;
}

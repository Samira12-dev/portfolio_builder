package com.example.Portfolio_builder.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProjectResponseDTO {
    private String title;
    private String description;
    private String githubUrl;
    private String liveDemoUrl;
}

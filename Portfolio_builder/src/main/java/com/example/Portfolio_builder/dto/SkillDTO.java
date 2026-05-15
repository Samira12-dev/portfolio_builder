package com.example.Portfolio_builder.dto;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


public class SkillDTO {
    @NotBlank
    private String name;

    @Min(1)
    @Max(100)
    private int level;
}

package com.example.Portfolio_builder.dto;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;


public class ProfileRequestDTO {
    @NotBlank
    private String fullName;

    private String title;

    @Size(max = 500)
    private String bio;

    private String photo;

    private String github;

    private String linkedin;

    private String website;
}

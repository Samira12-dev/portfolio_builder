package com.example.Portfolio_builder.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ProfileResponseDTO {
    private String fullName;
    private String title;
    private String bio;

    private String github;
    private String linkedin;
    private String website;
}

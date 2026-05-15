package com.example.Portfolio_builder.dto;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;


public class LoginDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

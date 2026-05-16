package com.example.Portfolio_builder.dto;

import jakarta.validation.constraints.NotBlank;

@Data
@Ar
public class LoginDTO {

    @NotBlank
    private String username;

    @NotBlank
    private String password;
}

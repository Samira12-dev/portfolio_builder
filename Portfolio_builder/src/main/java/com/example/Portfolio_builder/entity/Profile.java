package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Profile {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        private String fullName;

        private String title;

        @Size(max = 500, message = "Bio too long")
        private String bio;

        private String photo;

        private String github;

        private String linkedin;

        private String website;

        @OneToOne
        @JoinColumn(name = "user_id")
        private User user;

}
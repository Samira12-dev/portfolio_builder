package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    @ManyToOne
    @JoinColumn(name = "chosen_version_id")
    private ResumeVersion chosenVersion;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL)
    private List<ResumeVersion> versions;
}
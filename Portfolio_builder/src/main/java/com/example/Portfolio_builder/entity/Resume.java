package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;

    // Which version did the user choose?
    @ManyToOne
    @JoinColumn(name = "chosen_version_id")
    private ResumeVersion chosenVersion;

    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL)
    private List<ResumeVersion> versions;
}
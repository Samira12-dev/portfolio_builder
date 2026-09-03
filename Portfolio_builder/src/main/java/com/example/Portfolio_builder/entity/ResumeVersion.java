package com.example.Portfolio_builder.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String modelName;       // "claude", "gpt-4o", "gemini"

    @Column(columnDefinition = "LONGTEXT")
    private String generatedHtml;   // HTML resume from this model

    @Column(columnDefinition = "LONGTEXT")
    private String generatedJson;   // structured JSON for PDF export

    private boolean isChosen = false;

    @ManyToOne
    @JoinColumn(name = "resume_id")
    private Resume resume;
}
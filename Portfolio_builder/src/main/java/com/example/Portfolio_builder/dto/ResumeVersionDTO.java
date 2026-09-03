package com.example.Portfolio_builder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeVersionDTO {
    private Long id;
    private String modelName;
    private String generatedHtml;
    private boolean isChosen;
}

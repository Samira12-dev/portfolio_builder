package com.example.Portfolio_builder.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PortfolioDTO {
    private String slug;

    private boolean isPublished;

    private String templateName;
}
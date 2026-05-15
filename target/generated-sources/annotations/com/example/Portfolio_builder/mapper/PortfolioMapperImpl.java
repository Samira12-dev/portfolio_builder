package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.PortfolioDTO;
import com.example.Portfolio_builder.entity.Portfolio;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-15T12:22:37+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Amazon.com Inc.)"
)
@Component
public class PortfolioMapperImpl implements PortfolioMapper {

    @Override
    public Portfolio toEntity(PortfolioDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Portfolio portfolio = new Portfolio();

        return portfolio;
    }

    @Override
    public PortfolioDTO toDto(Portfolio portfolio) {
        if ( portfolio == null ) {
            return null;
        }

        PortfolioDTO portfolioDTO = new PortfolioDTO();

        return portfolioDTO;
    }
}

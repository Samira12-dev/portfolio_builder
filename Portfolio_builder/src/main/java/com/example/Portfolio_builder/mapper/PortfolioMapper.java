package com.example.Portfolio_builder.mapper;


import com.example.Portfolio_builder.dto.PortfolioDTO;
import com.example.Portfolio_builder.entity.Portfolio;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
    public interface PortfolioMapper {

        Portfolio toEntity(PortfolioDTO dto);

        PortfolioDTO toDto(Portfolio portfolio);
    }

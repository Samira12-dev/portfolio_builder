package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.ProfileRequestDTO;
import com.example.Portfolio_builder.dto.ProfileResponseDTO;
import com.example.Portfolio_builder.entity.Profile;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
    public interface PortfolioMapper {

    Profile toEntity(ProfileRequestDTO dto);

    ProfileResponseDTO toDto(Profile profile);    }

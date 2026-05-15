package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.ProfileRequestDTO;
import com.example.Portfolio_builder.dto.ProfileResponseDTO;
import com.example.Portfolio_builder.entity.Profile;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-15T12:22:37+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Amazon.com Inc.)"
)
@Component
public class ProfileMapperImpl implements ProfileMapper {

    @Override
    public Profile toEntity(ProfileRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Profile profile = new Profile();

        return profile;
    }

    @Override
    public ProfileResponseDTO toDto(Profile profile) {
        if ( profile == null ) {
            return null;
        }

        ProfileResponseDTO profileResponseDTO = new ProfileResponseDTO();

        return profileResponseDTO;
    }
}

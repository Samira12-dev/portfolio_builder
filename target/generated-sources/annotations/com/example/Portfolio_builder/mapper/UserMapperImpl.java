package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.RegisterUserDTO;
import com.example.Portfolio_builder.entity.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-15T12:22:38+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Amazon.com Inc.)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(RegisterUserDTO dto) {
        if ( dto == null ) {
            return null;
        }

        User user = new User();

        return user;
    }

    @Override
    public RegisterUserDTO toDto(User user) {
        if ( user == null ) {
            return null;
        }

        RegisterUserDTO registerUserDTO = new RegisterUserDTO();

        return registerUserDTO;
    }
}

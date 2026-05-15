package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.RegisterUserDTO;
import com.example.Portfolio_builder.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface userMapper {
        User toEntity(RegisterUserDTO dto);

        RegisterUserDTO toDto(User user);

}

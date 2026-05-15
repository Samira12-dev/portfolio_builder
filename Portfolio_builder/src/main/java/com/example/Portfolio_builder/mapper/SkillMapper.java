package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.SkillDTO;
import com.example.Portfolio_builder.entity.Skill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
    public interface SkillMapper {

        Skill toEntity(SkillDTO dto);

        SkillDTO toDto(Skill skill);
    }


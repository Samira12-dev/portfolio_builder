package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.SkillDTO;
import com.example.Portfolio_builder.entity.Skill;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-15T12:22:37+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Amazon.com Inc.)"
)
@Component
public class SkillMapperImpl implements SkillMapper {

    @Override
    public Skill toEntity(SkillDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Skill skill = new Skill();

        return skill;
    }

    @Override
    public SkillDTO toDto(Skill skill) {
        if ( skill == null ) {
            return null;
        }

        SkillDTO skillDTO = new SkillDTO();

        return skillDTO;
    }
}

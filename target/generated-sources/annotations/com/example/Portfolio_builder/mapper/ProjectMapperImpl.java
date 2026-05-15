package com.example.Portfolio_builder.mapper;

import com.example.Portfolio_builder.dto.ProjectRequestDTO;
import com.example.Portfolio_builder.dto.ProjectResponseDTO;
import com.example.Portfolio_builder.entity.Project;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-05-15T12:22:37+0100",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Amazon.com Inc.)"
)
@Component
public class ProjectMapperImpl implements ProjectMapper {

    @Override
    public Project toEntity(ProjectRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Project project = new Project();

        return project;
    }

    @Override
    public ProjectResponseDTO toDto(Project project) {
        if ( project == null ) {
            return null;
        }

        ProjectResponseDTO projectResponseDTO = new ProjectResponseDTO();

        return projectResponseDTO;
    }
}

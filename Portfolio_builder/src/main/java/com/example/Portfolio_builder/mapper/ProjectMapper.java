package com.example.Portfolio_builder.mapper;


import com.example.Portfolio_builder.dto.ProjectRequestDTO;
import com.example.Portfolio_builder.dto.ProjectResponseDTO;
import com.example.Portfolio_builder.entity.Project;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
    public interface ProjectMapper {

    Project toEntity(ProjectRequestDTO dto);

    ProjectResponseDTO toDto(Project project);
}


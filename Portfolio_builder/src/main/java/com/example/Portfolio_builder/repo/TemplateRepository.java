package com.example.Portfolio_builder.repo;

import org.hibernate.sql.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    List<Template> findByIsPremiumFalse();       // free templates
    List<Template> findByIsPremiumTrue();         // premium templates
}
package com.example.Portfolio_builder.repo;

import com.example.Portfolio_builder.entity.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    Optional<Portfolio> findBySlug(String slug);
    Optional<Portfolio> findByProfileId(Long profileId);
}
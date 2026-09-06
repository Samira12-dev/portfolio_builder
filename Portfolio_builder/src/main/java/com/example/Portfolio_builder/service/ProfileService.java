package com.example.Portfolio_builder.service;

import com.example.Portfolio_builder.dto.ProfileRequestDTO;
import com.example.Portfolio_builder.dto.ProfileResponseDTO;
import com.example.Portfolio_builder.entity.Profile;
import com.example.Portfolio_builder.entity.User;
import com.example.Portfolio_builder.mapper.ProfileMapper;
import com.example.Portfolio_builder.repo.ProfileRepository;
import com.example.Portfolio_builder.repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ProfileMapper profileMapper;

    public ProfileResponseDTO getByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return profileMapper.toDto(profile);
    }

    public ProfileResponseDTO update(String username, ProfileRequestDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Profile profile = profileRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Profile p = new Profile();
                    p.setUser(user);
                    return p;
                });
        profile.setFullName(dto.getFullName());
        profile.setTitle(dto.getTitle());
        profile.setBio(dto.getBio());
        profile.setPhoto(dto.getPhoto());
        profile.setGithub(dto.getGithub());
        profile.setLinkedin(dto.getLinkedin());
        profile.setWebsite(dto.getWebsite());
        return profileMapper.toDto(profileRepository.save(profile));
    }

    public Long getProfileIdByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Profile not found"))
                .getId();
    }
}
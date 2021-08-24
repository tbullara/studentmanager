package com.trackit.studentmanager.services;

import com.trackit.studentmanager.data.models.Profile;
import com.trackit.studentmanager.data.repos.ProfileRepository;
import com.trackit.studentmanager.exceptions.BadRequestException;
import com.trackit.studentmanager.exceptions.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProfileService {
    private final ProfileRepository profileRepository;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public void addProfile(Profile student) {
        Boolean emailExists = profileRepository.doesEmailExist(student.getEmail());
        if (emailExists) {
            throw new BadRequestException("Email " + student.getEmail() + " already taken");
        }

        profileRepository.save(student);
    }

    public void deleteStudent(Long profileId) {
        if (!profileRepository.existsById(profileId)) {
            throw new StudentNotFoundException("user with id: " + profileId + " does not exist.");
        }

        profileRepository.deleteById(profileId);
    }
}

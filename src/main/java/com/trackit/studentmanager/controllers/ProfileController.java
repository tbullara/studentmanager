package com.trackit.studentmanager.controllers;

import com.trackit.studentmanager.data.models.Profile;
import com.trackit.studentmanager.services.ProfileService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("students")
// same as setting up a default constructor
@AllArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping
    public List<Profile> getAllStudents() {
        return profileService.getAllProfiles();
    }

    @PostMapping
    public void addStudent(@Valid @RequestBody Profile profile) {
        profileService.addProfile(profile);
    }

    @DeleteMapping(path = "{profileId}")
    public void deleteStudent(@PathVariable("studentId") Long profileId) {
        profileService.deleteStudent(profileId);
    }
}

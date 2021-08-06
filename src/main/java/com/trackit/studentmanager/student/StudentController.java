package com.trackit.studentmanager.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "Mr.", "Cumstain", "mrcumstan@gmail.com", Student.Gender.OTHER),
                new Student(UUID.randomUUID(), "Dr.", "Friend", "df@gmail.com", Student.Gender.MALE)
        );
    }
}

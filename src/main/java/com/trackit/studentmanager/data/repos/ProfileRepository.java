package com.trackit.studentmanager.data.repos;

import com.trackit.studentmanager.data.models.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @Query(
            "select case when count(s) > 0 then true else false end from Profile p where p.email = ?1"
    )
    Boolean doesEmailExist(String email);
}

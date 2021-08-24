package com.trackit.studentmanager.data.models;

import lombok.*;

import javax.persistence.*;

@ToString
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Profile userProfile;
}

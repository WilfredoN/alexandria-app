package com.example.alexandria.repository;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.List;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User extends BaseEntity {
    private String uid;
    private String full_name;
    private String login;
    private String password;
    private String user_group;
    private String role;

    @ManyToMany
    @JoinTable(name = "teacher_subjects",
            joinColumns = @JoinColumn(name = "teacher_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id"))
    private List<Subject> subjects; // связь с предметом
}

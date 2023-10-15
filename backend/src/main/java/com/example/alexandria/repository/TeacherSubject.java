package com.example.alexandria.repository;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@Entity
@Table(name = "teacher_subjects")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class TeacherSubject {
    @Id
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher; // связь с преподавателем

    @Id
    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject; // связь с предметом

    // Геттеры и сеттеры
}

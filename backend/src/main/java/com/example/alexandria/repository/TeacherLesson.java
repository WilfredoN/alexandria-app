package com.example.alexandria.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "teacher_lesson")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherLesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
}

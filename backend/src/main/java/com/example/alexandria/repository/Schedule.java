package com.example.alexandria.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "schedule")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String day_of_week;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lessonId;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group groupId;
    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private Teacher teacherId;
}

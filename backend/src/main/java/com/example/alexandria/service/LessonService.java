package com.example.alexandria.service;

import com.example.alexandria.repository.Lesson;
import com.example.alexandria.repository.LessonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LessonService {
    LessonRepository lessonRepository;

    public Lesson findLesson(Long id) {
        return lessonRepository.findLessonById(id);
    }
    public List<Lesson> findLessons() {
        return lessonRepository.findAll();
    }
    public Lesson create(Lesson lesson) {
        return lessonRepository.save(Lesson.builder()
                .lesson_name(lesson.getLesson_name())
                .build());
    }

    public Lesson update(Lesson lesson) {
        return lessonRepository.save(Lesson.builder()
                .id(lesson.getId())
                .lesson_name(lesson.getLesson_name())
                .build());
    }

    public void delete(Long id) {
        lessonRepository.deleteById(id);
    }
}

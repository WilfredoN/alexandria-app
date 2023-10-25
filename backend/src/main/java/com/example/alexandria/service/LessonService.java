package com.example.alexandria.service;

import com.example.alexandria.repository.Lesson;
import com.example.alexandria.repository.LessonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LessonService {
    LessonRepository lessonRepository;

    public Lesson findLesson(Long id) {
        return lessonRepository.findLessonById(id);
    }

    public Lesson create(Lesson lesson) {
        return lessonRepository.save(Lesson.builder()
                .name(lesson.getName())
                .build());
    }

    public Lesson update(Lesson lesson) {
        return lessonRepository.save(Lesson.builder()
                .id(lesson.getId())
                .name(lesson.getName())
                .build());
    }

    public void delete(Long id) {
        lessonRepository.deleteById(id);
    }
}

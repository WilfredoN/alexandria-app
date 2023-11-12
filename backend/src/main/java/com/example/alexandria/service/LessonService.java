package com.example.alexandria.service;

import com.example.alexandria.repository.Lesson;
import com.example.alexandria.repository.LessonRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LessonService {
    LessonRepository lessonRepository;

    public LessonDTO findLesson(Long id) {
        return lessonRepository.findLessonById(id)
                .map(this::mapLesson)
                .orElseThrow();
    }

    private LessonDTO mapLesson(Lesson lesson) {
        return LessonDTO.builder()
                .id(lesson.getId())
                .lesson_name(lesson.getLesson_name())
                .build();
    }

    public List<LessonDTO> findLessons() {
        return lessonRepository.findAll().stream()
                .map(this::mapLesson)
                .collect(Collectors.toList());
    }
    public LessonDTO create(LessonDTO lesson) {
        var savedLesson = lessonRepository.save(Lesson.builder()
                .lesson_name(lesson.lesson_name())
                .build());
        return mapLesson(savedLesson);
    }

    public LessonDTO update(LessonDTO lesson) {
        return lessonRepository.findLessonById(lesson.id())
                .map(foundLesson -> {
                    foundLesson.setLesson_name(lesson.lesson_name());
                    return mapLesson(lessonRepository.save(foundLesson));
                })
                .orElseThrow();
    }

    public void delete(Long id) {
        lessonRepository.deleteById(id);
    }
}

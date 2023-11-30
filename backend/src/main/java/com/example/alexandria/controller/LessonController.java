package com.example.alexandria.controller;

import com.example.alexandria.service.dto.LessonDTO;
import com.example.alexandria.service.LessonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;

    @GetMapping
    public List<LessonDTO> getLessons() {
        return lessonService.findLessons();
    }

    @GetMapping("/{id}")
    public LessonDTO getLesson(@PathVariable long id) {
        return lessonService.findLesson(id);
    }

    @PostMapping("/create")
    public LessonDTO createLesson(@RequestBody LessonDTO lesson) {
        return lessonService.create(lesson);
    }

    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable long id) {
        lessonService.delete(id);
    }

    @PutMapping("/update")
    public LessonDTO updateLesson(@RequestBody LessonDTO lesson) {
        return lessonService.update(lesson);
    }
}

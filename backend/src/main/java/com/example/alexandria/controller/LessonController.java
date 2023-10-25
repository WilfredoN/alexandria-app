package com.example.alexandria.controller;

import com.example.alexandria.repository.Lesson;
import com.example.alexandria.service.LessonService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/lesson")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class LessonController {
    private final LessonService lessonService;
    @GetMapping("/{id}")
    public Lesson getLesson(@PathVariable long id) {
        return lessonService.findLesson(id);
    }
    @PostMapping("/create")
    public Lesson createLesson(@RequestBody Lesson lesson) {
        return lessonService.create(lesson);
    }
    @DeleteMapping("/{id}")
    public void deleteLesson(@PathVariable long id) {
        lessonService.delete(id);
    }
    @PutMapping("/update")
    public Lesson updateLesson(@RequestBody Lesson lesson) {
        return lessonService.update(lesson);
    }
}

package com.example.alexandria.controller;


import com.example.alexandria.service.TeacherService;
import com.example.alexandria.service.TeacherDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping("/{id}")
    public TeacherDTO findTeacher(@PathVariable String id) {
        return teacherService.findTeacher(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTeacher(@PathVariable String id) {
        teacherService.deleteTeacher(id);
    }

    @PutMapping("/{id}")
    public TeacherDTO updateTeacher(@PathVariable String id, @RequestBody TeacherDTO teacherDTO) {
        return teacherService.updateTeacher(id, teacherDTO);
    }

    @GetMapping
    public List<TeacherDTO> getTeacher(
            @RequestParam(required = false) String full_name,
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String password
    ) {
        log.info("getUsers: full_name={}, login={}, password={}, "
                , full_name, login, password);
        return teacherService.findTeachers();
    }

    @PostMapping("/login")
    public TeacherDTO logIn(@RequestBody TeacherDTO teacherDTO) {
        return teacherService.logIn(teacherDTO);
    }

    @PostMapping("/create")
    public TeacherDTO createTeacher(@RequestBody TeacherDTO teacherDTO) {
        return teacherService.create(teacherDTO);
    }

}

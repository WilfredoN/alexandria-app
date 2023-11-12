package com.example.alexandria.controller;


import com.example.alexandria.service.TeacherDTO;
import com.example.alexandria.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherService teacherService;

    @GetMapping
    public List<TeacherDTO> getTeacher() {
        return teacherService.findTeachers();
    }

    /* @GetMapping("/{login}")
     public TeacherDTO findTeacherByLogin(@PathVariable String login) {
         return teacherService.findTeacherByLogin(login);
     }*/
    @GetMapping("/{id}")
    public TeacherDTO findTeacherById(@PathVariable long id) {
        return teacherService.findTeacher(id);
    }

    @PostMapping("/login")
    public TeacherDTO logIn(@RequestBody TeacherDTO teacherDTO) {
        return teacherService.logIn(teacherDTO);
    }

    @PostMapping("/create")
    public ResponseEntity<String> createTeacher(@RequestBody TeacherDTO teacherDTO) {
        try {
            teacherService.create(teacherDTO);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{login}")
    public ResponseEntity<String> updateTeacher(@PathVariable String login, @RequestBody TeacherDTO teacherDTO) {
        try {
            teacherService.update(login, teacherDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{login}")
    public void deleteTeacher(@PathVariable String login) {
        teacherService.delete(login);
    }
}



package com.example.alexandria.controller;

import com.example.alexandria.service.StudentDTO;
import com.example.alexandria.service.StudentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @GetMapping("/{id}")
    public StudentDTO findStudent(@PathVariable String id) {
        return studentService.findStudent(id);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable String id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/{id}")
    public StudentDTO updateStudent(@PathVariable String id, @RequestBody StudentDTO studentDTO) {
        return studentService.updateStudent(id, studentDTO);
    }

    @GetMapping
    public List<StudentDTO> getStudents(
            @RequestParam(required = false) String full_name,
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String group_name
    ) {
        log.info("getStudents: full_name={}, login={}, password={}, group_name={}, "
                , full_name, login, password, group_name);
        return studentService.findStudents();
    }

    @PostMapping("/login")
    public StudentDTO logIn(@RequestBody StudentDTO studentDTO) {
        return studentService.logIn(studentDTO);
    }

    @PostMapping("/create")
    public StudentDTO createStudent(@RequestBody StudentDTO studentDTO) {
        return studentService.create(studentDTO);
    }
}

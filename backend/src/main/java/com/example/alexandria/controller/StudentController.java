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

   /* @GetMapping("/{id}")
    public StudentDTO findStudent(@PathVariable long id) {
        return studentService.findStudent(id);
    }*/
    @GetMapping("/{login}")
    public StudentDTO findStudentByLogin(@PathVariable String login) {
        return studentService.findStudentByLogin(login);
    }

    @DeleteMapping("/{login}")
    public void deleteStudent(@PathVariable String login) {
        studentService.deleteStudent(login);
    }

    @PutMapping("/{login}")
    public StudentDTO updateStudent(@PathVariable String login, @RequestBody StudentDTO studentDTO) {
        return studentService.updateStudent(login, studentDTO);
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

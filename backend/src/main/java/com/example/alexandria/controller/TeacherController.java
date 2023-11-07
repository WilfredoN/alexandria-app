package com.example.alexandria.controller;


import com.example.alexandria.repository.Teacher;
import com.example.alexandria.service.TeacherDTO;
import com.example.alexandria.service.TeacherService;
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

   /* @GetMapping("/{id}")
    public TeacherDTO findTeacher(@PathVariable long id) {
        return teacherService.findTeacher(id);
    }*/

    @GetMapping("/{login}")
    public TeacherDTO findTeacherByLogin(@PathVariable String login) {
        return teacherService.findTeacherByLogin(login);
    }
    @DeleteMapping("/{login}")
    public void deleteTeacher(@PathVariable String login) {
        teacherService.deleteTeacher(login);
    }

    @PutMapping("/{login}")
    public TeacherDTO updateTeacher(@PathVariable String login, @RequestBody TeacherDTO teacherDTO) {
        return teacherService.updateTeacher(login, teacherDTO);
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
    @GetMapping("/group/{group_name}")
    public List<Teacher> getTeachersForGroup(@PathVariable String group_name) {
        return teacherService.getTeachersByGroupName(group_name);
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

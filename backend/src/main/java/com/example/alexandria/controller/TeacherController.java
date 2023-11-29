package com.example.alexandria.controller;


import com.example.alexandria.repository.Teacher;
import com.example.alexandria.service.GroupDTO;
import com.example.alexandria.service.TeacherDTO;
import com.example.alexandria.service.TeacherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

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
    public TeacherDTO createTeacher(@RequestBody TeacherDTO teacherDTO) {
            return teacherService.create(teacherDTO);
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

    @GetMapping("/{teacherId}/groups")
    public List<GroupDTO> getTeacherGroups(@PathVariable long teacherId) {
        Optional<Teacher> optionalTeacher = teacherService.getTeacherWithGroups(teacherId);
        List<GroupDTO> groupDTOs = new ArrayList<>();
        if (optionalTeacher.isPresent()) {
            Teacher teacher = optionalTeacher.get();
            groupDTOs = teacher.getGroups().stream()
                    .map(group -> {
                        GroupDTO dto = new GroupDTO();
                        dto.setId(group.getId());
                        dto.setName(group.getName());
                        return dto;
                    })
                    .collect(toList());
        }
        return groupDTOs;
    }
    @GetMapping("/groups/{groupName}")
    public List<TeacherDTO> getTeacherByGroup(@PathVariable String groupName) {
        return teacherService.findTeacherByGroup(groupName);
    }

    @DeleteMapping("/{login}")
    public void deleteTeacher(@PathVariable String login) {
        teacherService.delete(login);
    }
}



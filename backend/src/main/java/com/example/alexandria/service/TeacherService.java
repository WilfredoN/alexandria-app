package com.example.alexandria.service;

import com.example.alexandria.repository.Teacher;
import com.example.alexandria.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherDTO mapTeacher(Teacher teacher) {
        return TeacherDTO.builder()
                .id(UUID.randomUUID().toString())
                .full_name(teacher.getFull_name())
                .login(teacher.getLogin())
                .password(teacher.getPassword())
                .build();
    }

    public TeacherDTO logIn(TeacherDTO teacher) {
        var foundTeacher = teacherRepository.findByLogin(teacher.login());
        if (foundTeacher.isPresent() && foundTeacher.get().getPassword().equals(teacher.password())) {
            return mapTeacher(foundTeacher.get());
        } else {
            throw new RuntimeException("Invalid login or password");
        }
    }
    public List<Teacher> getTeachersByGroupName(String name) {
        return teacherRepository.findTeachersByGroups_Name(name);
    }
    public TeacherDTO findTeacher(String id) {
        return teacherRepository.findByUid(id)
                .map(this::mapTeacher)
                .orElseThrow();
    }

    public List<TeacherDTO> findTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::mapTeacher)
                .collect(toList());
    }

    public void deleteTeacher(String uid) {
        var teacher = teacherRepository.findByUid(uid).orElseThrow();
        teacherRepository.delete(teacher);
    }

    public TeacherDTO updateTeacher(String uid, TeacherDTO teacher) {
        var teacherToUpdate = teacherRepository.findByUid(uid).orElseThrow();
        teacherToUpdate.setFull_name(teacher.full_name());
        teacherToUpdate.setLogin(teacher.login());
        teacherToUpdate.setPassword(teacher.password());
        return mapTeacher(teacherRepository.save(teacherToUpdate));
    }

    public TeacherDTO create(TeacherDTO teacher) {
        var savedTeacher = teacherRepository.save(Teacher.builder()
                .uid(UUID.randomUUID().toString())
                .full_name(teacher.full_name())
                .login(teacher.login())
                .password(teacher.password())
                .build());
        return mapTeacher(savedTeacher);
    }
}

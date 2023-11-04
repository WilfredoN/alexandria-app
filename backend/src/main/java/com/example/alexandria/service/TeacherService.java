package com.example.alexandria.service;

import com.example.alexandria.repository.Teacher;
import com.example.alexandria.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class TeacherService {
    private final TeacherRepository teacherRepository;

    public TeacherDTO mapTeacher(Teacher teacher) {
        return TeacherDTO.builder()
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
    public TeacherDTO findTeacher(long id) {
        return teacherRepository.findById(id)
                .map(this::mapTeacher)
                .orElseThrow();
    }
    public TeacherDTO findTeacherByLogin(String login) {
        return teacherRepository.findByLogin(login)
                .map(this::mapTeacher)
                .orElseThrow();
    }
    public List<TeacherDTO> findTeachers() {
        return teacherRepository.findAll().stream()
                .map(this::mapTeacher)
                .collect(toList());
    }

    public void deleteTeacher(long id) {
        var teacher = teacherRepository.findById(id).orElseThrow();
        teacherRepository.delete(teacher);
    }

    public TeacherDTO updateTeacher(String login, TeacherDTO teacher) {
        var teacherToUpdate = teacherRepository.findByLogin(login).orElseThrow();
//        teacherToUpdate.setFull_name(teacher.full_name());
//        teacherToUpdate.setLogin(teacher.login());
        teacherToUpdate.setPassword(teacher.password());
        return mapTeacher(teacherRepository.save(teacherToUpdate));
    }

    public TeacherDTO create(TeacherDTO teacher) {
        var savedTeacher = teacherRepository.save(Teacher.builder()
                .full_name(teacher.full_name())
                .login(teacher.login())
                .password(teacher.password())
                .build());
        return mapTeacher(savedTeacher);
    }
}

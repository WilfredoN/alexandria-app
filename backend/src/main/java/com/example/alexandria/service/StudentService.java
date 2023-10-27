package com.example.alexandria.service;

import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.Student;
import com.example.alexandria.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;
    private final GroupService groupService;

    private StudentDTO mapStudent(Student student) {
        return StudentDTO.builder()
                .id(UUID.randomUUID().toString())
                .full_name(student.getFull_name())
                .login(student.getLogin())
                .password(student.getPassword())
                .group_name(student.getGroup_name())
                .build();
    }

    public StudentDTO logIn(StudentDTO user) {
        var foundStudent = studentRepository.findByLogin(user.login());
        if (foundStudent.isPresent() && foundStudent.get().getPassword().equals(user.password())) {
            return mapStudent(foundStudent.get());
        } else {
            throw new RuntimeException("Invalid login or password");
        }
    }

    public StudentDTO findStudent(String id) {
        return studentRepository.findByUid(id)
                .map(this::mapStudent)
                .orElseThrow();
    }

    public List<StudentDTO> findStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapStudent)
                .collect(Collectors.toList());
    }

    public void deleteStudent(String uid) {
        var user = studentRepository.findByUid(uid).orElseThrow();
        studentRepository.delete(user);
    }

    public StudentDTO updateStudent(String uid, StudentDTO user) {
        var userToUpdate = studentRepository.findByUid(uid).orElseThrow();
        userToUpdate.setFull_name(user.full_name());
        userToUpdate.setLogin(user.login());
        userToUpdate.setPassword(user.password());
        return mapStudent(studentRepository.save(userToUpdate));
    }

    public StudentDTO create(StudentDTO user) {
        Group group = groupService.findGroup(user.group_name());
        if (group == null) {
            groupService.create(Group.builder()
                    .name(user.group_name())
                    .build());
        }
        var savedStudent = studentRepository.save(Student.builder()
                .uid(UUID.randomUUID().toString())
                .full_name(user.full_name())
                .login(user.login())
                .password(user.password())
                .group_name(user.group_name())
                .build());
        return mapStudent(savedStudent);
    }
}

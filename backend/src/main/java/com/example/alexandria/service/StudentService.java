package com.example.alexandria.service;

import com.example.alexandria.repository.Student;
import com.example.alexandria.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public StudentDTO mapStudent(Student student) {
        return StudentDTO.builder()
                .full_name(student.getFull_name())
                .login(student.getLogin())
                .group_name(student.getGroup_name())
                .build();
    }

    public StudentDTO logIn(StudentDTO student) {
        var foundStudent = studentRepository.findByLogin(student.login());
        if (foundStudent.isPresent() && foundStudent.get().checkPassword(student.password())) {
            return mapStudent(foundStudent.get());
        } else {
            throw new HttpClientErrorException(HttpStatus.NOT_FOUND, "Invalid login or password");
        }
    }

    public StudentDTO findStudent(long id) {
        return studentRepository.findById(id)
                .map(this::mapStudent)
                .orElseThrow();
    }

    public StudentDTO findStudentByLogin(String login) {
        return studentRepository.findByLogin(login)
                .map(this::mapStudent)
                .orElseThrow(() -> new HttpClientErrorException(HttpStatusCode.valueOf(404), "Student not found"));
    }

    public List<StudentDTO> findStudents() {
        return studentRepository.findAll().stream()
                .map(this::mapStudent)
                .collect(Collectors.toList());
    }

    public void deleteStudent(String login) {
        var student = studentRepository.findByLogin(login).orElseThrow();
        studentRepository.delete(student);
    }

    public StudentDTO updateStudent(String login, StudentDTO student) {
        var studentToUpdate = studentRepository.findByLogin(login).orElseThrow();
        studentToUpdate.setPassword(student.password()); // Убедитесь, что здесь вызывается setPassword
        return mapStudent(studentRepository.save(studentToUpdate));
    }

    public StudentDTO create(StudentDTO student) {
        String hashedPassword = BCrypt.hashpw(student.password(), BCrypt.gensalt());
        var savedStudent = studentRepository.save(Student.builder()
                .full_name(student.full_name())
                .login(student.login())
                .password(hashedPassword)
                .group_name(student.group_name())
                .build());
        return mapStudent(savedStudent);
    }

}

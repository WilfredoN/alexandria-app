package com.example.alexandria.repository;

import com.example.alexandria.service.TeacherDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    Optional<Teacher> findByUid(String id);
    Optional<Teacher> findByLogin(String login);
    List<Teacher> findTeachersByGroups_Name(String name);
}

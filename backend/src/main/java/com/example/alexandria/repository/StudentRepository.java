package com.example.alexandria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUid(String id);
    Optional<Student> findByLogin(String login);
    //Optional<User> findByRole(String role);
}

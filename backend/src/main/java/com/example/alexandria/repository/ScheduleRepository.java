package com.example.alexandria.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    Optional<Schedule> findScheduleById(Long id);

    List<Schedule> findScheduleByGroupId_Name(String groupName);

    @Query("SELECT l FROM Lesson l WHERE l.id = :lessonId")
    Lesson getLessonById(@Param("lessonId") Long lessonId);

    @Query("SELECT g FROM Group g WHERE g.id = :groupId")
    Group getGroupById(@Param("groupId") Long groupId);

    @Query("SELECT t FROM Teacher t WHERE t.id = :teacherId")
    Teacher getTeacherById(@Param("teacherId") Long teacherId);
}

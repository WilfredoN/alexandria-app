package com.example.alexandria.service;

import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.Schedule;
import com.example.alexandria.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public Schedule findSchedule(Long id) {
        return scheduleRepository.findScheduleById(id)
                .map(this::mapSchedule)
                .orElseThrow();
    }
    public List<Schedule> findSchedules() {
        return scheduleRepository.findAll();
    }
    public List<Schedule> findScheduleByGroup(Group groupId) {
        return scheduleRepository.findScheduleByGroupId(groupId);
    }

    public Schedule mapSchedule(Schedule schedule) {
        return Schedule.builder()
                .id(schedule.getId())
                .day_of_week(schedule.getDay_of_week())
                .lessonId(schedule.getLessonId())
                .groupId(schedule.getGroupId())
                .teacherId(schedule.getTeacherId())
                .build();
    }

    public Schedule create(Schedule schedule) {
        return scheduleRepository.save(Schedule.builder()
                .day_of_week(schedule.getDay_of_week())
                .lessonId(schedule.getLessonId())
                .groupId(schedule.getGroupId())
                .teacherId(schedule.getTeacherId())
                .build());
    }

    public Schedule update(Schedule schedule) {
        return scheduleRepository.save(Schedule.builder()
                .id(schedule.getId())
                .day_of_week(schedule.getDay_of_week())
                .lessonId(schedule.getLessonId())
                .groupId(schedule.getGroupId())
                .teacherId(schedule.getTeacherId())
                .build());
    }

    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }

    public List<Schedule> getAll() {
        return scheduleRepository.findAll();
    }

}

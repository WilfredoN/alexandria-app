package com.example.alexandria.service;

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

    public List<Schedule> findScheduleByGroup(String group_name) {
        return scheduleRepository.findScheduleByGroup_id(group_name);
    }

    public Schedule mapSchedule(Schedule schedule) {
        return Schedule.builder()
                .id(schedule.getId())
                .day_of_week(schedule.getDay_of_week())
                .lesson_id(schedule.getLesson_id())
                .group_id(schedule.getGroup_id())
                .teacher_id(schedule.getTeacher_id())
                .build();
    }

    public Schedule create(Schedule schedule) {
        return scheduleRepository.save(Schedule.builder()
                .day_of_week(schedule.getDay_of_week())
                .lesson_id(schedule.getLesson_id())
                .group_id(schedule.getGroup_id())
                .teacher_id(schedule.getTeacher_id())
                .build());
    }

    public Schedule update(Schedule schedule) {
        return scheduleRepository.save(Schedule.builder()
                .id(schedule.getId())
                .day_of_week(schedule.getDay_of_week())
                .lesson_id(schedule.getLesson_id())
                .group_id(schedule.getGroup_id())
                .teacher_id(schedule.getTeacher_id())
                .build());
    }

    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }

    public List<Schedule> getAll() {
        return scheduleRepository.findAll();
    }

}

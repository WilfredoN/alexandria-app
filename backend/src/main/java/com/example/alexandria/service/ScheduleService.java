package com.example.alexandria.service;

import com.example.alexandria.repository.Schedule;
import com.example.alexandria.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public ScheduleDTO findSchedule(Long id) {
        return scheduleRepository.findScheduleById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("Schedule not found for id: " + id));
    }

    public List<ScheduleDTO> findSchedules() {
        return scheduleRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<ScheduleDTO> findScheduleByGroupName(String groupName) {
        return scheduleRepository.findScheduleByGroupId_Name(groupName)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public ScheduleDTO create(ScheduleDTO scheduleDTO) {
        Schedule savedSchedule = scheduleRepository.save(mapToEntity(scheduleDTO));
        return mapToDTO(savedSchedule);
    }

    public ScheduleDTO update(ScheduleDTO scheduleDTO) {
        Schedule updatedSchedule = scheduleRepository.save(mapToEntity(scheduleDTO));
        return mapToDTO(updatedSchedule);
    }

    public void delete(Long id) {
        scheduleRepository.deleteById(id);
    }

    public List<ScheduleDTO> getAll() {
        return scheduleRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ScheduleDTO mapToDTO(Schedule schedule) {
        return ScheduleDTO.builder()
                .id(schedule.getId())
                .day_of_week(schedule.getDayOfWeek())
                .lesson_id(schedule.getLesson().getId()) // Choose one consistent approach
                .group_id(schedule.getGroup().getId())
                .teacher_id(schedule.getTeacher().getId())
                .week_type(schedule.getWeekType())
                .lesson_num(schedule.getLesson_num())
                .build();
    }

    private Schedule mapToEntity(ScheduleDTO schedule) {
        return Schedule.builder()
                .id(schedule.id())
                .dayOfWeek(schedule.day_of_week())
                .lesson(scheduleRepository.getLessonById(schedule.lesson_id())) // Adjust this based on your repository
                .group(scheduleRepository.getGroupById(schedule.group_id())) // Adjust this based on your repository
                .teacher(scheduleRepository.getTeacherById(schedule.teacher_id())) // Adjust this based on your repository
                .weekType(schedule.week_type())
                .lesson_num(schedule.lesson_num())
                .build();
    }
}

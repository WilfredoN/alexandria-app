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
                .dayOfWeek(schedule.getDayOfWeek())
                .lessonId(schedule.getLesson().getId()) // Choose one consistent approach
                .groupId(schedule.getGroup().getId())
                .teacherId(schedule.getTeacher().getId())
                .weekType(schedule.getWeekType())
                .lessonNumber(schedule.getLesson_num())
                .build();
    }

    private Schedule mapToEntity(ScheduleDTO schedule) {
        return Schedule.builder()
                .id(schedule.id())
                .dayOfWeek(schedule.dayOfWeek())
                .lesson(scheduleRepository.getLessonById(schedule.lessonId())) // Adjust this based on your repository
                .group(scheduleRepository.getGroupById(schedule.groupId())) // Adjust this based on your repository
                .teacher(scheduleRepository.getTeacherById(schedule.teacherId())) // Adjust this based on your repository
                .weekType(schedule.weekType())
                .lesson_num(schedule.lessonNumber())
                .build();
    }
}

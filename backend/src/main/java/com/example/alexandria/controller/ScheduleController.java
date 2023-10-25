package com.example.alexandria.controller;

import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.Schedule;
import com.example.alexandria.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;
    @GetMapping
    public List<Schedule> getSchedules() {
        return scheduleService.findSchedules();
    }
    @GetMapping("/{id}")
    public Schedule getSchedule(@PathVariable long id) {
        return scheduleService.findSchedule(id);
    }
    @GetMapping("/groups/{name}")
    public List<Schedule> getScheduleByGroup(@PathVariable Group name) {
        return scheduleService.findScheduleByGroup(name);
    }
    @PostMapping("/create")
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleService.create(schedule);
    }

    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable long id) {
        scheduleService.delete(id);
    }

    @GetMapping("/all")
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAll();
    }
}

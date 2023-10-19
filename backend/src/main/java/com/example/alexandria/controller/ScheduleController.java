package com.example.alexandria.controller;

import com.example.alexandria.repository.Schedule;
import com.example.alexandria.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class ScheduleController {
    private final ScheduleService scheduleService;


    @GetMapping("/{id}")
    public Schedule getSchedule(@PathVariable long id) {
        return scheduleService.findSchedule(id);
    }

}

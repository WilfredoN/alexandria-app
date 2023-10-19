package com.example.alexandria.service;


import com.example.alexandria.repository.Schedule;
import com.example.alexandria.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;

    public Schedule findSchedule(long id) {
        return scheduleRepository.findScheduleById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
    }

}

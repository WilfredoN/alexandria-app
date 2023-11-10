package com.example.alexandria.service;


import lombok.*;

@Builder
public record ScheduleDTO(
        Long id,
        Long lessonId,
        Long groupId,
        Long teacherId,
        String dayOfWeek,
        int lessonNumber,
        int weekType
) {}


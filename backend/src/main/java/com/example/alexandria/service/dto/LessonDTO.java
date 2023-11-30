package com.example.alexandria.service.dto;

import lombok.Builder;

@Builder
public record LessonDTO(
        long id,
        String lesson_name
) {
}

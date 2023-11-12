package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record LessonDTO(
        long id,
        String lesson_name
) {
}

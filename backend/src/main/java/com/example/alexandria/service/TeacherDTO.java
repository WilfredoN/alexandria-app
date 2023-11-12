package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record TeacherDTO(
        long id,
        String full_name,
        String login,
        String password) {

}

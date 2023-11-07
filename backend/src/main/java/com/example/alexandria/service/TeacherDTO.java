package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record TeacherDTO(
        String full_name,
        String login,
        String password) {

}

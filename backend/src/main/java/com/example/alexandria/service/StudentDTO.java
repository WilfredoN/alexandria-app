package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record StudentDTO(
        String id,
        String full_name,
        String login,
        String password,
        String group_name
) {
}

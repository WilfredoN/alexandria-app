package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record UserDTO(
        String id,
        String fullName,
        String login,
        String password,
        String userGroup
) {
}

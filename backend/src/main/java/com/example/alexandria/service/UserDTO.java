package com.example.alexandria.service;

import lombok.Builder;

@Builder
public record UserDTO(
        String id,
        String full_name,
        String login,
        String password,
        String prefix_group,
        String code_group,
        String role
) {
}

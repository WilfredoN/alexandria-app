package com.example.alexandria.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record UserDTO(
        String id,
        @JsonProperty("full_name")
        String fullName,
        String login,
        String password,
        @JsonProperty("user_group")
        String userGroup
) {
}

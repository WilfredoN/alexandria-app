package com.example.alexandria.service;

import com.example.alexandria.repository.User;
import com.example.alexandria.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private UserDTO mapUser(User user) {
        return UserDTO.builder()
                .id(UUID.randomUUID().toString())
                .full_name(user.getFull_name())
                .login(user.getLogin())
                .password(user.getPassword())
                .user_group(user.getUser_group())
                .role(user.getRole())
                .build();
    }

    public UserDTO logIn(UserDTO user) {
        var foundUser = userRepository.findByLogin(user.login());
        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.password())) {
            return mapUser(foundUser.get());
        } else {
            throw new RuntimeException("Invalid login or password");
        }
    }

    public UserDTO findUser(String id) {
        return userRepository.findByUid(id)
                .map(this::mapUser)
                .orElseThrow();
    }

    public List<UserDTO> findUsers() {
        return userRepository.findAll().stream()
                .map(this::mapUser)
                .collect(Collectors.toList());
    }

    public void deleteUser(String uid) {
        var user = userRepository.findByUid(uid).orElseThrow();
        userRepository.delete(user);
    }

    public UserDTO updateUser(String uid, UserDTO user) {
        var userToUpdate = userRepository.findByUid(uid).orElseThrow();
        userToUpdate.setFull_name(user.full_name());
        userToUpdate.setLogin(user.login());
        return mapUser(userRepository.save(userToUpdate));
    }

    public UserDTO create(UserDTO user) {
        var savedUser = userRepository.save(User.builder()
                .uid(UUID.randomUUID().toString())
                .full_name(user.full_name())
                .login(user.login())
                .password(user.password())
                .user_group(user.user_group())
                .role(user.role())
                .build());
        return mapUser(savedUser);
    }
}

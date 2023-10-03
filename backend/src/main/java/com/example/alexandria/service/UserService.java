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
                .fullName(user.getFullName())
                .login(user.getLogin())
                .password(user.getPassword())
                .build();
    }
    public UserDTO findUser(String id) {
        return userRepository.findByUid(id)
                .map(this::mapUser)
                .orElseThrow();
    }
    public List<UserDTO> findUsers(String fullName, String login, String password) {
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
        userToUpdate.setFullName(user.fullName());
        userToUpdate.setLogin(user.login());
        return mapUser(userRepository.save(userToUpdate));
    }
    public UserDTO create(UserDTO user) {
        var savedUser = userRepository.save(User.builder()
                .uid(UUID.randomUUID().toString())
                .fullName(user.fullName())
                .login(user.login())
                .password(user.password())
                        .userGroup(user.userGroup())
                .build());
        return mapUser(savedUser);
    }
}

package com.example.alexandria.controller;

import com.example.alexandria.service.UserDTO;
import com.example.alexandria.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public UserDTO findUser(@PathVariable String id) {
        return userService.findUser(id);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable String id, @RequestBody UserDTO userDTO) {
        return userService.updateUser(id, userDTO);
    }

    @GetMapping
    public List<UserDTO> getUsers(
            @RequestParam(required = false) String full_name,
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String prefix_group,
            @RequestParam(required = false) String code_group,
            @RequestParam(required = false) String role
    ) {
        log.info("getUsers: full_name={}, login={}, password={}, prefix_group={}, code_group={}, " +
                "role={}", full_name, login, password, prefix_group, code_group, role);
        return userService.findUsers();
    }
    @PostMapping("/login")
    public UserDTO logIn(@RequestBody UserDTO userDTO) {
        return userService.logIn(userDTO);
    }

    @PostMapping("/create")
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.create(userDTO);
    }
}

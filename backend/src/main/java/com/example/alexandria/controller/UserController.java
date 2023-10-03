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
            @RequestParam(required = false) String fullName,
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String password
    ) {
        log.info("getUsers: fullName={}, login={}, password={}", fullName, login, password);
        return userService.findUsers(fullName, login, password);
    }
    @PostMapping
    public UserDTO createUser(@RequestBody UserDTO userDTO) {
        return userService.create(userDTO);
    }


}

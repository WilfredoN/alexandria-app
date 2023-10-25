package com.example.alexandria.controller;

import com.example.alexandria.repository.Group;
import com.example.alexandria.service.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;


    @GetMapping("/{name}")
    public Group getGroup(@PathVariable String name) {
        return groupService.findGroup(name);
    }
    @PostMapping("/create")
    public Group createGroup(@RequestBody Group group) {
        return groupService.create(group);
    }
}

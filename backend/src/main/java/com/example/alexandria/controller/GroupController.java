package com.example.alexandria.controller;

import com.example.alexandria.repository.Group;
import com.example.alexandria.service.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;

    @GetMapping
    public List<Group> getGroups(
            ) {
        return groupService.findGroups();
    }
    @GetMapping("/{name}")
    public Group getGroup(@PathVariable String name) {
        return groupService.findGroup(name);
    }
    @GetMapping("/{id}")
    public Group getGroup(@PathVariable long id) {
        return groupService.findGroup(id);
    }
    @PostMapping("/create")
    public Group createGroup(@RequestBody Group group) {
        return groupService.create(group);
    }
}

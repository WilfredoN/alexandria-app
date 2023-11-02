package com.example.alexandria.service;


import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public Group findGroup(String name) {
        return groupRepository.findGroupByName(name)
                .orElse(null);
    }
    public Group findGroup(Long id) {
        return groupRepository.findGroupById(id)
                .orElse(null);
    }
    public List<Group> findGroups() {
        return groupRepository.findAll().stream()
                .map(this::mapGroup)
                .collect(toList());
    }

    private Group mapGroup(Group group) {
        return Group.builder()
                .id(group.getId())
                .name(group.getName())
                .build();
    }

    public List<Group> getGroupsByTeacherId(long teacherId) {
        return groupRepository.findGroupsByTeachersId(teacherId);
    }
    public Group create(Group group) {
        return groupRepository.save(Group.builder()
                .name(group.getName())
                .build());
    }
    public Group update(Group group) {
        return groupRepository.save(Group.builder()
                .id(group.getId())
                .name(group.getName())
                .build());
    }
    public void delete(Long id) {
        groupRepository.deleteById(id);
    }
}


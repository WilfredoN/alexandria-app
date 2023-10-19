package com.example.alexandria.service;


import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public Group findGroup(long id) {
        return groupRepository.findGroupById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public Group create(Group group) {
        return groupRepository.save(Group.builder()
                .group_name(group.getGroup_name())
                .build());
    }
}


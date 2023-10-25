package com.example.alexandria.service;


import com.example.alexandria.repository.Group;
import com.example.alexandria.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupService {
    private final GroupRepository groupRepository;

    public Group findGroup(String name) {
        return groupRepository.findGroupByName(name)
                .orElse(null);
    }

    public Group create(Group group) {
        return groupRepository.save(Group.builder()
                .name(group.getName())
                .build());
    }
}


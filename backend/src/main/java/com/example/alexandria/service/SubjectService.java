package com.example.alexandria.service;

import com.example.alexandria.repository.SubjectRepository;
import com.example.alexandria.repository.entity.Subject;
import com.example.alexandria.service.dto.SubjectDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {
    SubjectRepository subjectRepository;

    public SubjectDTO findSubject(Long id) {
        return subjectRepository.findSubjectById(id)
                .map(this::mapSubject)
                .orElseThrow();
    }

    private SubjectDTO mapSubject(Subject subject) {
        return SubjectDTO.builder()
                .id(subject.getId())
                .subject_name(subject.getSubject_name())
                .build();
    }

    public List<SubjectDTO> findSubjects() {
        return subjectRepository.findAll().stream()
                .map(this::mapSubject)
                .collect(Collectors.toList());
    }

    public SubjectDTO create(SubjectDTO subject) {
        var savedSubject = subjectRepository.save(Subject.builder()
                .id(subject.id())
                .subject_name(subject.subject_name())
                .build());
        return mapSubject(savedSubject);
    }

    public SubjectDTO update(SubjectDTO subject) {
        return subjectRepository.findSubjectById(subject.id())
                .map(foundSubject -> {
                    foundSubject.setSubject_name(subject.subject_name());
                    return mapSubject(subjectRepository.save(foundSubject));
                })
                .orElseThrow();
    }

    public void delete(Long id) {
        subjectRepository.deleteById(id);
    }
}

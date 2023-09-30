package com.example.alexandria.repository;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;


@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name="users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    private String uid;
    private String fullName;
    private String login;
    private String password;
    private String userGroup;

}

package com.example.TLBet.models.entities;


import com.example.TLBet.models.BaseEntity;
import com.example.TLBet.models.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

@Data
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User extends BaseEntity implements UserDetails {

    @NotNull
    @NotBlank
    @Size(min = 3)
    @Column(unique = true)
    private String username;

    @NotNull
    @NotBlank
    @Size(min = 3)
    private String firstName;

    @NotNull
    @NotBlank
    @Size(min = 3)
    private String lastName;

    @Column(name = "created_on", columnDefinition = "TIMESTAMP", updatable = false)
    @CreatedDate
    private Timestamp createdOn;

    @Email
    @NotNull
    @Size(min = 3)
    @Column(unique = true)
    private String email;

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String password;

    @Column(name = "profile_viewed")
    private Integer profileViewed;

    @Column(name = "other_profile_views")
    private Integer otherProfileViews;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User(String firstName, String lastName, String username){
        this.firstName =firstName;
        this.lastName = lastName;
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

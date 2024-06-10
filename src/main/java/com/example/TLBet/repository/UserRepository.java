package com.example.TLBet.repository;

import com.example.TLBet.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    List<User> findAllByOrderByIdDesc();

    @Query(value = "select concat(coalesce(u.firstName, '') , ' ',coalesce(u.lastName, ''), ' (', coalesce(u.username, ''), ')') from User u " +
            "order by u.id desc")
    List<String> findAllFullNames();
}

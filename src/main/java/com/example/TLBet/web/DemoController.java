package com.example.TLBet.web;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/demo")
@RequiredArgsConstructor
public class DemoController {

    private final UserRepository repository;

    @GetMapping("/get")
    public ResponseEntity<List<User>> demo(){
        return ResponseEntity.ok(repository.findAll());
    }

}

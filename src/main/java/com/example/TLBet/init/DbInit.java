package com.example.TLBet.init;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = User.builder().username("jivko").password(passwordEncoder.encode("jivko")).role(UserRole.ADMIN).build();
            userRepository.save(user);
        }
    }
}
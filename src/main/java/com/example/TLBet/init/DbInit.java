package com.example.TLBet.init;

import com.example.TLBet.models.entities.Role;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        if(roleRepository.count() == 0){
            for (UserRole value : UserRole.values()) {
                Role role = Role.builder()
                        .role(value)
                        .build();
                roleRepository.save(role);
            }
        }
    }
}

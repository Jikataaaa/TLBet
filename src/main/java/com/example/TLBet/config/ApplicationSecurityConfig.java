package com.example.TLBet.config;

import com.example.TLBet.models.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApplicationSecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final String [] adminPaths = {"/leagues/getAll", "/leagues/add", "/leagues/edit", "/leagues/delete",
            "/match/new-match", "/match/edit-match", "/match/add", "/match/delete", "/match/edit",
            "/rounds/getAll", "/rounds/add", "/rounds/edit", "/rounds/delete", "/rounds/setActive", "/rounds/activeRound",
            "/team/new-team", "/team/all-teams", "/team/all-teams-by-league", "/team/edit", "/team/delete",
            "/tournaments/add", "/tournaments/edit", "/tournaments/delete", "/tournaments/getAll"
            };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

       return httpSecurity
               .csrf(AbstractHttpConfigurer::disable)
               .cors(Customizer.withDefaults())
               .authorizeHttpRequests(auth -> auth
                       .requestMatchers("/api/v1/auth/**").permitAll()
                       .requestMatchers(adminPaths).hasRole(UserRole.ADMIN.name())
                       .anyRequest().authenticated()
               )
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }


}

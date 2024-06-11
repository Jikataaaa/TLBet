package com.example.TLBet.config;

import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.service.JwtService;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

import static com.example.TLBet.utils.AuthUtil.validateToken;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final List<String> adminPaths = List.of("/leagues/getAll", "/leagues/add", "/leagues/edit", "/leagues/delete",
            "/match/new-match", "/match/edit-match", "/match/add", "/match/delete", "/match/edit",
            "/rounds/getAll", "/rounds/add", "/rounds/edit", "/rounds/delete", "/rounds/setActive", "/rounds/activeRound",
            "/team/new-team", "/team/all-teams", "/team/all-teams-by-league", "/team/edit", "/team/delete",
            "/tournaments/add", "/tournaments/edit", "/tournaments/delete", "/tournaments/getAll");

    @Override
    protected void doFilterInternal( @NonNull HttpServletRequest request,
                                     @NonNull HttpServletResponse response,
                                     @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String jwt;
        String username;
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(7);


        username = validateToken(jwt);


        if(username != null && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            if (this.adminPaths.contains(request.getRequestURI())){
                if(!((User) userDetails).getRole().name().equals(UserRole.ADMIN.name())){
                    filterChain.doFilter(request, response);
                    return;
                }
            }
            if (jwtService.isTokenValid(jwt, userDetails)){
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);

    }
}

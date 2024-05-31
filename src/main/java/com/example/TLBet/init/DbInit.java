package com.example.TLBet.init;
import com.example.TLBet.models.entities.Match;
import com.example.TLBet.models.entities.Team;
import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.repository.MatchRepository;
import com.example.TLBet.repository.TeamRepository;
import com.example.TLBet.repository.TournamentRepository;
import com.example.TLBet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;
    private final MatchRepository matchRepository;
    private final TournamentRepository tournamentRepository;


    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0){
            User user = User.builder().username("jivko").password(passwordEncoder.encode("jivko")).role(UserRole.ADMIN).build();
            userRepository.save(user);
        }
        if(teamRepository.count() == 0){
            teamRepository.save(Team.builder()
                    .imageUrl("https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png")
                    .name("Барселона")
                    .build());
            teamRepository.save(Team.builder()
                    .imageUrl("https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png")
                    .name("Реал Мадрид")
                    .build());

            teamRepository.save(Team.builder()
                    .imageUrl("https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png")
                    .name("Манчестър Юнайтед")
                    .build());
            teamRepository.save(Team.builder()
                    .imageUrl("https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png")
                    .name("Ливърпул")
                    .build());
        }
        if(tournamentRepository.count() == 0){
            tournamentRepository.save(Tournament
                    .builder()
                    .name("Premier League")
                    .build());
            tournamentRepository.save(Tournament
                    .builder()
                    .name("La Liga")
                    .build());
        }
        if (matchRepository.count() == 0){
            matchRepository.save(Match
                    .builder()
                    .awayTeam(teamRepository.findTeamByName("Ливърпул").orElseThrow())
                    .homeTeam(teamRepository.findTeamByName("Манчестър Юнайтед").orElseThrow())
                    .tournament(tournamentRepository.findTournamentByName("Premier League").orElseThrow())
                    .startTime(Instant.now().plusSeconds(259200))
                    .round(1)
                    .build());

            matchRepository.save(Match
                    .builder()
                    .awayTeam(teamRepository.findTeamByName("Барселона").orElseThrow())
                    .homeTeam(teamRepository.findTeamByName("Реал Мадрид").orElseThrow())
                    .tournament(tournamentRepository.findTournamentByName("La Liga").orElseThrow())
                    .startTime(Instant.now().plusSeconds(259200))
                    .round(1)
                    .build());
        }

    }
}

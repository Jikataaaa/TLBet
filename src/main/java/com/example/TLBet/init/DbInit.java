package com.example.TLBet.init;

import com.example.TLBet.models.entities.Tournament;
import com.example.TLBet.models.entities.User;
import com.example.TLBet.models.enums.UserRole;
import com.example.TLBet.models.view.AddRoundView;
import com.example.TLBet.models.view.AddTournamentView;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.repository.TournamentRepository;
import com.example.TLBet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.example.TLBet.utils.Constants.EUROPEAN_CHAMPIONSHIP_2024;
import static com.example.TLBet.utils.Constants.FIRST_GROUP_STAGE;

@Component
@RequiredArgsConstructor
public class DbInit implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoundRepository roundRepository;
    private final TournamentRepository tournamentRepository;
    private final ModelMapper modelMapper;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = User.builder().username("jivko").password(passwordEncoder.encode("jivko")).role(UserRole.ADMIN).build();
            userRepository.save(user);

            if (roundRepository.count() == 0) {
                Tournament tournament;
                if (tournamentRepository.count() == 0) {
                    AddTournamentView defaultTournament = AddTournamentView.builder()
                            .name(EUROPEAN_CHAMPIONSHIP_2024)
                            .build();
                    tournament = tournamentRepository.save(this.modelMapper.map(defaultTournament, Tournament.class));
                } else {
                    tournament = tournamentRepository.findAll().get(0);
                }

                AddRoundView defaultRound = AddRoundView.builder()
                        .name(FIRST_GROUP_STAGE)
                        .tournamentId(tournament.getId())
                        .build();
                roundRepository.save(this.modelMapper.map(defaultRound, com.example.TLBet.models.entities.Round.class));
            }
        }
    }
}
package com.example.TLBet.repository;

import com.example.TLBet.models.entities.TournamentBetWinner;
import com.example.TLBet.models.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findUserByUsername(String username);

    List<User> findAllByOrderByIdDesc();

    @Query(value =
            "select new User(u.firstName, u.lastName, u.username)   " +
            "from User u                                            " +
            "order by u.id desc                                     ")
    List<User> findAllFullNames();

    Optional<User> findByUsernameOrEmail(String username, String email);

    @Query(value =
            "select tbw                                                  " +
            "from TournamentBetWinner tbw  join User u on tbw.userId = u.id     " +
            "where tbw.userId = :id and tbw.tournament.isActive = true          "
    )
    Optional<TournamentBetWinner> findUserChoiceForWinner(@Param("id") Long id);
}

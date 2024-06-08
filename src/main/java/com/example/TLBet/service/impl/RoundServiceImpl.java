package com.example.TLBet.service.impl;

import com.example.TLBet.models.entities.Round;
import com.example.TLBet.models.enums.ExceptionEnum;
import com.example.TLBet.models.exeptions.NoContentException;
import com.example.TLBet.models.view.AddRoundView;
import com.example.TLBet.models.view.RoundOutView;
import com.example.TLBet.models.view.RoundView;
import com.example.TLBet.repository.RoundRepository;
import com.example.TLBet.service.RoundService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class RoundServiceImpl implements RoundService {
    private final RoundRepository repository;
    private final ModelMapper mapper;

    @Override
    public Round getLastRound() {
        return repository.findFirstByOrderByIdDesc();
    }

    @Override
    public Round getById(long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public List<RoundView> getAllByTournamentId(long tournamentId) {
        return repository.findRoundsByTournamentId(tournamentId)
                .stream()
                .map(x -> mapper.map(x, RoundView.class))
                .collect(Collectors.toList());
    }

    @Override
    public long createRound(AddRoundView roundView) {
        return repository.save(mapper.map(roundView, Round.class)).getId();
    }

    @Override
    public long editRound(AddRoundView roundView) {
        return repository.save(mapper.map(roundView, Round.class)).getId();
    }

    @Override
    public void deleteRoundById(long id) {
        repository.delete(this.getById(id));
    }

    @Override
    public long setRoundActiveById(long id) {
        repository.setAllIsActiveFalse();
        Round byId = this.getById(id);
        byId.setActive(true);
        repository.save(byId);
        return byId.getId();
    }

    @Override
    public RoundOutView getActiveRound() throws NoContentException {
        Round round = repository.findByIsActiveIsTrueAndTournament_IsActiveIsTrue().orElse(null);

        if (round == null) {
            throw new NoContentException(ExceptionEnum.EXCEPTION_NO_CONTENT,
                    new Throwable("No content"));
        }

        return mapper.map(round, RoundOutView.class);
    }
}

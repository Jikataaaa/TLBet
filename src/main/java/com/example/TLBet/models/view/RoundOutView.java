package com.example.TLBet.models.view;

import com.example.TLBet.models.entities.Tournament;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoundOutView {

    private long id;

    private boolean isActive;

    private TournamentView tournament;
}

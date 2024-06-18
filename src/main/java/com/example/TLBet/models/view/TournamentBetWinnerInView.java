package com.example.TLBet.models.view;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentBetWinnerInView {

    @NotNull
    @JsonProperty("teamId")
    private Long teamId;

    @NotNull
    @JsonProperty("tournamentId")
    private Long tournamentId;
}

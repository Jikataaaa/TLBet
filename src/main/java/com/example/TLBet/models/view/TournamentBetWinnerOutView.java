package com.example.TLBet.models.view;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentBetWinnerOutView {

    @JsonProperty("id")
    private Long id;

    @JsonProperty("team")
    private TeamView team;

    @JsonProperty("tournament")
    private TournamentView tournament;

    @JsonProperty("isExpired")
    private Boolean isExpired;
}

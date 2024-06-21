package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RankingView {
    private int place;
    private String firstName;
    private String lastName;
    private String username;
    private long points;
    private int rankingDifferences;
}

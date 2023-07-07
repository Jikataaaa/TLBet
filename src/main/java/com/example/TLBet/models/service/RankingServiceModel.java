package com.example.TLBet.models.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RankingServiceModel {
    private String username;
    private long points;
    private int place;

}

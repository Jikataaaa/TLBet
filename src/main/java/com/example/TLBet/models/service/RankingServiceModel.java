package com.example.TLBet.models.service;

import com.example.TLBet.models.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RankingServiceModel {
    private User user;
    private long points;
    private int place;

}

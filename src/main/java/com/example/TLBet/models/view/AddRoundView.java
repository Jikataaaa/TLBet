package com.example.TLBet.models.view;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AddRoundView {
    private long id;
    private boolean isActive;
    private String name;
    private long tournamentId;
}

package com.example.TLBet.models.view;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class AddTournamentView {
    private String name;
    private boolean isActive;
}

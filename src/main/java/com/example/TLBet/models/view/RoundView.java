package com.example.TLBet.models.view;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RoundView {
    private long id;
    private String name;
    private boolean isActive;
}

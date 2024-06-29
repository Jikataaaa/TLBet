package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTeamPickPercentageOutView {

    private String teamName;
    private BigDecimal teamPickPercentage;
    private Long teamPickCount;
}

package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamInsertUpdateOutView {

    private long id;
    private String name;
    private String imageUrl;
    private long leagueId;
}

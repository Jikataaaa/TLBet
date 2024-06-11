package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileOutView {

    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private List<BetView> bets;
}

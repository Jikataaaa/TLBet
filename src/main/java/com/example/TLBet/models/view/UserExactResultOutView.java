package com.example.TLBet.models.view;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserExactResultOutView {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private Long countExactResults;
}

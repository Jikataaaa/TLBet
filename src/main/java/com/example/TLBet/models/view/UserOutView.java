package com.example.TLBet.models.view;

import com.example.TLBet.models.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserOutView {

    private long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
}

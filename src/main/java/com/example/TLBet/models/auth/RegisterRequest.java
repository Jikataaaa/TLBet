package com.example.TLBet.models.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank
    @NotNull
    @Size(min = 3)
    private String username;

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String email;

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String firstName;

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String lastName;

    @NotBlank
    @NotNull
    @Size(min = 3)
    private String password;
}

package com.example.TLBet.models.view;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInView {

    @JsonProperty(value = "firstName", required = true)
    @NotNull
    @NotBlank
    @Size(min = 3)
    @NotEmpty
    private String firstName;


    @JsonProperty(value = "lastName", required = true)
    @NotNull
    @Size(min = 3)
    @NotBlank
    @NotEmpty
    private String lastName;

    @JsonProperty(value = "password")
    private String password;
}

package com.example.TLBet.models.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamServiceModel {
    private long id;
    private String name;
    private String imageUrl;
}

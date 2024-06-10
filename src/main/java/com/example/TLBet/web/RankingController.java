package com.example.TLBet.web;

import com.example.TLBet.models.view.RankingView;
import com.example.TLBet.service.RankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ranking")
public class RankingController extends BaseController{

    private final RankingService rankingService;

    @GetMapping("/general-ranking")
    public ResponseEntity<List<RankingView>> generalRanking(){
        return ResponseEntity.ok(rankingService.getInGeneralRanking());
    }
//    @GetMapping("/last-round-ranking")
//    public ResponseEntity<List<RankingView>> lastRoundRanking(){
//        return ResponseEntity.ok(rankingService.getLastRoundRanking());
//    }
//    @GetMapping("/current-year-ranking")
//    public ResponseEntity<List<RankingView>> currentYearRanking(){
//        return ResponseEntity.ok(rankingService.getCurrentYearRanking());
//    }

}

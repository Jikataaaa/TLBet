import { Match } from './services/match/models/Match';
import { MatchTeam } from './services/match/models/MatchTeam';

export class MockData {
    public static matches: Match[] = [
        new Match({
            id: 1,
            homeTeam: new MatchTeam({
                id: 101,
                name: "Барселона",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/47/FC_Barcelona_%28crest%29.svg/1200px-FC_Barcelona_%28crest%29.svg.png",
                goals: 2
            }),
            awayTeam: new MatchTeam({
                id: 102,
                name: "Реал Мадрид",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png",
                goals: 1
            }),
            startTime: new Date("2023-05-21T15:30:00Z"),
            tournamentId: 201,
            tournamentName: "La Liga",
            round: 1
        }),
        new Match({
            id: 2,
            homeTeam: new MatchTeam({
                id: 103,
                name: "Манчестър Юнайтед",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
                goals: 3
            }),
            awayTeam: new MatchTeam({
                id: 104,
                name: "Ливърпул",
                imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png",
                goals: 3
            }),
            startTime: new Date("2023-05-22T17:00:00Z"),
            tournamentId: 202,
            tournamentName: "Premier League",
            round: 2
        }),
        new Match({
            id: 3,
            homeTeam: new MatchTeam({
                id: 105,
                name: "Байерн Мюнхен",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg/190px-FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg.png",
                goals: 1
            }),
            awayTeam: new MatchTeam({
                id: 106,
                name: "Борусия Дортмунд",
                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Borussia_Dortmund_logo.svg/1200px-Borussia_Dortmund_logo.svg.png",
                goals: 4
            }),
            startTime: new Date("2023-05-23T19:45:00Z"),
            tournamentId: 203,
            tournamentName: "Bundesliga",
            round: 3
        })
    ];
}

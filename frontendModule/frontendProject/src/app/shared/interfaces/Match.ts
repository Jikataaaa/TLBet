export interface Match{
    id : number,
    homeTeamId : number,
    homeTeam : string,
    homeTeamGoals : Number,
    awayTeamId : number,
    awayTeam: string,
    awayTeamGoals: Number,
    startTime : Date,
    tournamentId : number,
    tournamentName: string,
    round : number
}
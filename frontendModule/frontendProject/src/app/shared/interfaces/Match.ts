export interface Match{
    id : number,
    homeTeamId : number,
    homeTeam : string,
    homeTeamImageUrl : string,
    homeTeamGoals : Number,
    awayTeamId : number,
    awayTeam: string,
    awayTeamGoals: Number,
    awayTeamImageUrl : string,
    startTime : Date,
    tournamentId : number,
    tournamentName: string,
    round : number
}
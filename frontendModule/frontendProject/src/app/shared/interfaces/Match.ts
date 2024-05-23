export interface Match{
    id : number,
    homeTeamId : number,
    homeTeam : string,
    homeTeamImageUrl : string,
    homeTeamGoals : number,
    awayTeamId : number,
    awayTeam: string,
    awayTeamGoals: number,
    awayTeamImageUrl : string,
    startTime : Date,
    tournamentId : number,
    tournamentName: string,
    round : number
}
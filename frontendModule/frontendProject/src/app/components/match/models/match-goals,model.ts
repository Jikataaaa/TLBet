export class MatchGoalsModel {
    
    constructor(init?: Partial<MatchGoalsModel>) {
        Object.assign(this, init);
    }

    homeTeamGoals?: number;
    awayTeamGoals?: number;
}
export class MatchModel {

    constructor(init?: Partial<MatchModel>) {
        Object.assign(this, init);
    }

    id!: number;
    homeTeamGoals!: number;
    awayTeamGoals!: number;
    homeTeamId!: number;
    awayTeamId!: number;
    startTime!: Date;
    roundId!: number;
}
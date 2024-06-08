export class MatchModel {

    constructor(init?: Partial<MatchModel>) {
        Object.assign(this, init);
    }

    id!: number;
    homeGoals!: number;
    awayGoals!: number;
    homeTeamId!: number;
    homeTeamName!: string;
    homeTeamImageUrl!: string;
    awayTeamId!: number;
    awayTeamName!: string;
    awayTeamImageUrl!: string;
    startTime!: Date;
    roundId!: number;
}
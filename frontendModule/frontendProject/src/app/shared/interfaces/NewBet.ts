export class NewBet {
    constructor(init?: Partial<NewBet>) {
        Object.assign(this, init);
    }

    homeTeamGoals!: number;
    awayTeamGoals!: number;
    matchId!: number;
    username!: string;
}
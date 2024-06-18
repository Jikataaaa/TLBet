
export class BetTournamentWinnerModel {
    constructor(init?: Partial<BetTournamentWinnerModel>) {
        Object.assign(this, init);
    }

    teamId!: number;
    tournamentId!: number;
}
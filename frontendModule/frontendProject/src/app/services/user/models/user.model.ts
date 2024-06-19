import { BetMatchModel } from 'src/app/components/match/models/bet-match.model';
import { TeamModel } from 'src/app/components/team/models/team.model';

export class UserModel {
    constructor(init?: Partial<UserModel>) {
        Object.assign(this, init);
    }
    id!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    bets: BetMatchModel[] = [];
    tournamentWinner?: TeamModel;
    isWinnerChoicePossibilityExpired?: boolean;
}
import { MatchStatusEnum } from './MatchStatusEnum';
import { MatchTeamModel } from './match-team.model.ts';

export class BetMatchModel {
    
    constructor(init?: Partial<BetMatchModel>) {
        Object.assign(this, init);
    }

    id!: number;
    homeTeam!: MatchTeamModel;
    awayTeam!: MatchTeamModel;
    startTime!: Date;
    status!: MatchStatusEnum;
    tournamentId!: number;
    tournamentName!: string;
    round!: number;
}
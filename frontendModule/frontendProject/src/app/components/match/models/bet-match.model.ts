import { MatchStatusEnum } from './MatchStatusEnum';
import { BaseRoundModel } from './base-round-model';
import { MatchGoalsModel } from './match-goals,model';
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
    round!: BaseRoundModel;
    matchGoals?: MatchGoalsModel;
}
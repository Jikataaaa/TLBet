import { MatchTeam } from './MatchTeam';

export class Match {
    
    constructor(init?: Partial<Match>) {
        Object.assign(this, init);
    }

    id!: number;
    homeTeam!: MatchTeam;
    awayTeam!: MatchTeam;
    startTime!: Date;
    tournamentId!: number;
    tournamentName!: string;
    round!: number;
}
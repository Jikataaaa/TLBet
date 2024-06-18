import { TeamModel } from '../../team/models/team.model';
import { TournamentModel } from '../../tournament/models/tournament.model';

export class TournamentWinnerModel {
    constructor(init?: Partial<TournamentWinnerModel>) {
        Object.assign(this, init);
    }

    id?: number;
    team?: TeamModel;
    tournament?: TournamentModel;
    isExpired?: boolean;
}
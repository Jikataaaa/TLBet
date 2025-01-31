import { TournamentModel } from '../../tournament/models/tournament.model';

export class ActiveRound {
    constructor (init?: Partial<ActiveRound>) {
        Object.assign(this, init);
    }

    id!: number;
    tournament!: TournamentModel;
}
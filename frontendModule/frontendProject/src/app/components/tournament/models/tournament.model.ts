
export class TournamentModel {
    constructor(init?: Partial<TournamentModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    active!: boolean;
}
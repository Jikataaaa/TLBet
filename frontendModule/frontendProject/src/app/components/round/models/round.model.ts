
export class RoundModel {
    constructor (init?: Partial<RoundModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    active!: boolean;
    tournamentId!: number;
}
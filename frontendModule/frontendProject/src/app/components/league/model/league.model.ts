
export class LeagueModel {
    constructor(init?: Partial<LeagueModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
}
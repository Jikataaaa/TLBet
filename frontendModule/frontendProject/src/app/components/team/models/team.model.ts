
export class TeamModel {
    constructor (init?: Partial<TeamModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    imageUrl!: string;
    leagueId!: number;
}
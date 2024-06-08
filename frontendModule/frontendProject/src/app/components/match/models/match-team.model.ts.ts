export class MatchTeamModel {

    constructor(init?: Partial<MatchTeamModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    imageUrl!: string;
    goals!: number;
}
export class MatchTeam {

    constructor(init?: Partial<MatchTeam>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    imageUrl!: string;
    goals!: number;
}

export class TeamPickPercentageModel {
    constructor(init?: Partial<TeamPickPercentageModel>) {
        Object.assign(this, init);
    }

    teamName!: string;
    teamPickPercentage!: number;
    teamPickCount!: number;
}
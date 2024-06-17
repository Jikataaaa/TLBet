export class RankingModel {
    constructor(init?: Partial<RankingModel>) {
        Object.assign(this, init);
    }

    place!: number;
    firstName!: string;
    lastName!: string;
    username!: string;
    points!: Number;
    rankingDifferences!: number;
    isFirst?: boolean;
    isCurrentUser?: boolean;
}
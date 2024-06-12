
export class BaseRoundModel {
    constructor (init?: Partial<BaseRoundModel>) {
        Object.assign(this, init);
    }

    id!: number;
    name!: string;
    active!: boolean;
}
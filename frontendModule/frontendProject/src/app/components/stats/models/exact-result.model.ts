
export class ExactResultModel {
    constructor(init?: Partial<ExactResultModel>) {
        Object.assign(this, init);
    }

    id!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    countExactResults!: number;
}
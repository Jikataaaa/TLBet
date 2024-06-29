
export class ChartModel {
    constructor(init?: Partial<ChartModel>) {
        Object.assign(this, init);
    }

    name!: string;
    value!: number;
}
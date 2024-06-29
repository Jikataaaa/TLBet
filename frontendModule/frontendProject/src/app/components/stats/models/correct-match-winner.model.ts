
    export class CorrectMatchWinnerModel {
        constructor(init?: Partial<CorrectMatchWinnerModel>) {
            Object.assign(this, init);
        }

        id!: number;
        username!: string;
        firstName!: string;
        lastName!: string;
        countCorrectMatchWinners!: number;
    }
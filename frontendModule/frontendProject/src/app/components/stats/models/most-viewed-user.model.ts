
export class MostViewedUserModel {
    constructor(init?: Partial<MostViewedUserModel>) {
        Object.assign(this, init);
    }

    id!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    profileViewed!: number;
}
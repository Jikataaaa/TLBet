export class Register {
    constructor (init?: Partial<Register>) {
        Object.assign(this, init);
    }
    username!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    password!: string;
}
export class Login {
    constructor(init?: Partial<Login>) {
        Object.assign(this, init);
    }
    username!: string;
    password!: string;
}
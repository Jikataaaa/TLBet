
export class JwtUserData {
    constructor(init?: Partial<JwtUserData>) {
        Object.assign(this, init);
    }
    username!: string;
    role!: string;
    expirationDate!: Date;
    issuedAt!: Date;
}
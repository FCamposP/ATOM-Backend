export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public readonly createdAt: Date
  ) {}
}

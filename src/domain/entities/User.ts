export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string|undefined,
    public createdAt: Date
  ) {}
}

export class Task {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public title: string,
    public description: string,
    public completed: boolean,
    public readonly createdAt: Date,
    public isActive: boolean,
    public deletedAt?: Date|null
  ) {}
}

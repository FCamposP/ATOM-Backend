export interface ITask {
    id: string;
    userId: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
    isActive: boolean;
    deletedAt?: Date;
    modifiedAt?: Date
}

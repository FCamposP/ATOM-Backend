export interface ITaskResponseDto {
    id: string;
    title: string;
    description:string;
    completed: boolean;
    createdAt: Date;
    modifiedAt?: Date;
}

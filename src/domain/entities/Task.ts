export class Task {
    constructor(
        public id: string,
        public userId: string,
        public title: string,
        public description: string | undefined | null,
        public completed: boolean,
        public createdAt: Date,
        public isActive: boolean,
        public deletedAt: Date | undefined | null,
    ) { }
}

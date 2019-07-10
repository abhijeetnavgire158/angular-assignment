export class Todo {
    constructor(
        public title: string,
        public todoDate: Date,
        public categories: string[],
        public isReminder: boolean,
        public reminderDate: Date,
        public isPublic: boolean,
        public attached: string,
        public id: string = '_' + Math.random().toString(36).substr(2, 9)
    ) { }
}
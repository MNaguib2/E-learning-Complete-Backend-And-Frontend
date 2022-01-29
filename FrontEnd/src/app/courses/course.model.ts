export interface Author {
    id: number;
    firstName: string;
    lastName: string;
}
//*
interface CoursesListItem {
    id: number;
    title: string;
    date: string;
    duration: number;
    description: string;
    authors: Array<number>;
    isTopRated: boolean;
}
//*/
export class Course implements CoursesListItem {

    constructor(
        public id: number = null,
        public title = '',
        public date = '',
        public duration = 0,
        public description = '',
        public imageUrl : any,
        public authors: Array<number> = [],
        public isTopRated = false
    ) {}
}

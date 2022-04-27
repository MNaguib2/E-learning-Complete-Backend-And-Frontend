
export class Classes {
    constructor(
        public Name: string,
        public Detials: string,
        public Note: string,
        public Material: Array<boolean>,
        public _id: string
    ) { }
}

export class Material {
    constructor(
        public Name: string,
        public Detials: string,
        public Properites: string,
        public Note: string,
        public Professor: Proffersor["_id"],
        public _id: string,
        public Class: Classes["_id"],
        public NumberHoure: number,
        public Lectures: Array<{
            VideoURL: String,
            detials: String,
            Note: String
        }>
    ) { }
}

export interface Proffersor {
    _id : string;
    Name : string; 
    DataBorn : Date;
    email : string,
    userName : string,
    detials : string
}
export interface IProfile {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: Gender;
}


enum Gender {
    Male,
    Female,
    Other
}
export interface IStudent {
    id: number;
    name: string;
    email: string;
    gender: Gender;
}

enum Gender {
    Male,
    Female,
    Other
}

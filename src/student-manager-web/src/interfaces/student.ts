export interface IStudent {
    studentId: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: Gender;
}

enum Gender {
    Male,
    Female,
    Other
}

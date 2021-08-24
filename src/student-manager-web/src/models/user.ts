import { IProfile } from "./profile";

export interface IUser {
    id: number;
    role: UserRole;
    profile: IProfile;
}

enum UserRole {
    Student,
    Instructor,
    Administrator,
    SystemManager
}


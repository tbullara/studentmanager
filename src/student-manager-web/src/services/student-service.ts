import axios from 'axios';
import { IUser } from '../models/user';

export class StudentClient {
    getStudents(): Promise<IUser[]> {
        return new Promise<IUser[]>((resolve, reject) => {
            axios.get('/students').then((response: any) => {
                resolve(response.data as IUser[])
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }

    addStudent(student: IUser) {
        return new Promise<IUser>((resolve, reject) => {
            axios.post('/students', student).then((response: any) => {
                resolve(response.data as IUser)
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }
}

export const studentClient = new StudentClient();

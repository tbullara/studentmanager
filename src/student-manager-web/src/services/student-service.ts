import axios from 'axios';
import { IStudent } from '../interfaces/student';

export class StudentClient {
    getStudents(): Promise<IStudent[]> {
        return new Promise<IStudent[]>((resolve, reject) => {
            axios.get('/students').then((response: any) => {
                resolve(response.data as IStudent[])
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }
}

export const studentClient = new StudentClient();

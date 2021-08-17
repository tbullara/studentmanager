import axios, { AxiosRequestConfig } from "axios";
import { IHttpClient } from "../interfaces/http-client";
import { IHttpClientRequestArgs } from "../interfaces/http-client-args";

export class HttpClient implements IHttpClient {
    get<T>(args: IHttpClientRequestArgs<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken } = args

            const options: AxiosRequestConfig = {
                headers: {}
            }

            if (requiresToken) {
                // TODO: get and set token
            }

            axios.get(url, options).then((response: any) => {
                resolve(response.data as T)
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }

    post<T>(args: IHttpClientRequestArgs<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken, payload } = args

            const options: AxiosRequestConfig = {
                headers: {}
            }

            if (requiresToken) {
                // TODO: get and set token
            }

            axios.post(url, payload, options).then((response: any) => {
                resolve(response.data as T)
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }

    delete<T>(args: IHttpClientRequestArgs<T>): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            const { url, requiresToken, payload } = args

            const options: AxiosRequestConfig = {
                headers: {}
            }

            if (requiresToken) {
                // TODO: get and set token
            }

            axios.delete(url).then((response: any) => {
                resolve(response.data as T)
            })
            .catch((response: any) => {
                reject(response)
            })
        });
    }

}

export const httpClient = new HttpClient();
import { IHttpClientRequestArgs } from "./http-client-args";

export interface IHttpClient {
    get<T>(args: IHttpClientRequestArgs<T>): Promise<T>
    post<T>(args: IHttpClientRequestArgs<T>): Promise<T>
}

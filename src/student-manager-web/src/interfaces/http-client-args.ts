export interface IHttpClientRequestArgs<T> {
    url: string;
    requiresToken: boolean;
    payload?: T;
}

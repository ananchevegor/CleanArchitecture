export class ApiClient {
    constructor(private readonly baseUrl: string) {}

    async get<T>(path: string): Promise<T> {
        const normalizedPath = path.startsWith("/") ? path : `/${path}`;
        const url = `${this.baseUrl}${normalizedPath}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Request failed: GET ${url} returned ${response.status} ${response.statusText}`
            );
        }

        return response.json() as Promise<T>;
    }
}

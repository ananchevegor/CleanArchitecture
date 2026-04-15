import { CountriesApiResponseDto } from "./dto/CountryApiDto";
import { ApiClient } from "../http/ApiClient";

export class CountryApiClient {
    constructor(private readonly apiClient: ApiClient) {}

    async getAll(): Promise<CountriesApiResponseDto> {
        return this.apiClient.get<CountriesApiResponseDto>("/all?fields=name,population");
    }
}

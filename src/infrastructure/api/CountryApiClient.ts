import { CountriesApiResponseDto } from "./dto/CountryApiDto";
import { ApiClient } from "../http/ApiClient";
import { CountrySelectedApiDto } from "./dto/CountrySelectedApiDto";

export class CountryApiClient {
    constructor(private readonly apiClient: ApiClient) {}

    async getAll(): Promise<CountriesApiResponseDto> {
        return this.apiClient.get<CountriesApiResponseDto>("/all?fields=name,population");
    }

    async getByName(name: string): Promise<CountrySelectedApiDto>{
        return this.apiClient.get<CountrySelectedApiDto>(`/name/${name}`)
    }

}

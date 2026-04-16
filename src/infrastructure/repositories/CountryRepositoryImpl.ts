
import { Country } from "@entities/Country";
import { CountrySelected } from "@entities/CountrySelected";
import { CountryApiClient } from "@infrastructure/api/CountryApiClient";
import { CountryApiMapper } from "@infrastructure/api/mappers/CountryApiMapper";
import { CountrySelectedMapper } from "@infrastructure/api/mappers/CountrySelectedApiMapper";
import { CountryRepository } from "@repositories/CountryRepository";



export class CountryRepositoryImpl implements CountryRepository {
    constructor(private readonly countryApiClient: CountryApiClient) {}

    async getAll(): Promise<Country[]> {
        const response = await this.countryApiClient.getAll();

        return response.map(CountryApiMapper.toDomain);
    }

    async getCountryByName(name: string): Promise<CountrySelected[]> {
        const response = await this.countryApiClient.getByName(name);
        console.log(response);
        return response.map(CountrySelectedMapper.toDomain);
    }
}

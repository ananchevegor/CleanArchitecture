import { Country } from "../../domain/entities/Country";
import { CountrySelected } from "../../domain/entities/CountrySelected";
import { CountryRepository } from "../../domain/repositories/CountryRepository";
import { CountryApiClient } from "../api/CountryApiClient";
import { CountryApiMapper } from "../api/mappers/CountryApiMapper";
import { CountrySelectedMapper } from "../api/mappers/CountrySelectedApiMapper";

export class CountryRepositoryImpl implements CountryRepository {
    constructor(private readonly countryApiClient: CountryApiClient) {}

    async getAll(): Promise<Country[]> {
        const response = await this.countryApiClient.getAll();

        return response.map(CountryApiMapper.toDomain);
    }

    async getCountryByName(name: string): Promise<CountrySelected> {
        const response = await this.countryApiClient.getByName(name);
        return CountrySelectedMapper.toDomain(response)
    }
}

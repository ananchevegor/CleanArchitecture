import { Country } from "../../domain/entities/Country";
import { CountryRepository } from "../../domain/repositories/CountryRepository";
import { CountryApiClient } from "../api/CountryApiClient";
import { CountryApiMapper } from "../api/mappers/CountryApiMapper";

export class CountryRepositoryImpl implements CountryRepository {
    constructor(private readonly countryApiClient: CountryApiClient) {}

    async getAll(): Promise<Country[]> {
        const response = await this.countryApiClient.getAll();

        return response.map(CountryApiMapper.toDomain);
    }
}

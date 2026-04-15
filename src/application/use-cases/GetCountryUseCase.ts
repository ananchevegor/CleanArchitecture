import { Country } from "../../domain/entities/Country";
import { CountryRepository } from "../../domain/repositories/CountryRepository";

export class GetCountryUseCase {
    constructor(private readonly countryRepository: CountryRepository) {}

    async execute(): Promise<Country[]> {
        const countries = await this.countryRepository.getAll();

        return [...countries].sort((a, b) => b.population - a.population);
    }
}

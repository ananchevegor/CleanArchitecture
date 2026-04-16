import { CountrySelected } from "../../domain/entities/CountrySelected";
import { CountryRepository } from "../../domain/repositories/CountryRepository";

export class GetCountryByNameUseCase{
    constructor(private readonly countryRepository: CountryRepository){}
    async execute(name: string): Promise<CountrySelected>{
        const country = await this.countryRepository.getCountryByName(name);
        return country;
    }
}
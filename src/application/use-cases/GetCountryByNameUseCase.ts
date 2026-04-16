import { CountrySelected } from "@entities/CountrySelected";
import { CountryRepository } from "@repositories/CountryRepository";


export class GetCountryByNameUseCase{
    constructor(private readonly countryRepository: CountryRepository){}
    async execute(name: string): Promise<CountrySelected[]>{
        const country = await this.countryRepository.getCountryByName(name);
        return country;
    }
}
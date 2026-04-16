import { Country } from "@entities/Country";
import { CountrySelected } from "@entities/CountrySelected";


export interface CountryRepository {
    getAll(): Promise<Country[]>;
    getCountryByName(name: string): Promise<CountrySelected[]>; 
}

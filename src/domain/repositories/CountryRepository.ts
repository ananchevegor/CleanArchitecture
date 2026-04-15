import { Country } from "../entities/Country";

export interface CountryRepository {
    getAll(): Promise<Country[]>;
}

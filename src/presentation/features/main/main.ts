import { createMainDependencies } from "@composition/main/createMainDependencies";
import { Country } from "@entities/Country";



export async function loadCountries(): Promise<Country[]> {
    const { getCountryUseCase } = createMainDependencies();


    return getCountryUseCase.execute();
}

export const main = loadCountries;

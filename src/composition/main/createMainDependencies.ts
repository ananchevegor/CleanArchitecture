import { GetCountryUseCase } from "../../application/use-cases/GetCountryUseCase";
import { CountryApiClient } from "../../infrastructure/api/CountryApiClient";
import { ApiClient } from "../../infrastructure/http/ApiClient";
import { CountryRepositoryImpl } from "../../infrastructure/repositories/CountryRepositoryImpl";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";

type MainDependencies = {
    getCountryUseCase: GetCountryUseCase;
};

let cachedDependencies: MainDependencies | null = null;

function buildMainDependencies(): MainDependencies {
    const apiClient = new ApiClient(REST_COUNTRIES_BASE_URL);
    const countryApiClient = new CountryApiClient(apiClient);
    const countryRepository = new CountryRepositoryImpl(countryApiClient);

    return {
        getCountryUseCase: new GetCountryUseCase(countryRepository),
    };
}

export function createMainDependencies(): MainDependencies {
    if (!cachedDependencies) {
        cachedDependencies = buildMainDependencies();
    }

    return cachedDependencies;
}

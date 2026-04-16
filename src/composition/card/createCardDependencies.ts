
import { GetCountryByNameUseCase } from "@use-cases/GetCountryByNameUseCase";
import { CountryApiClient } from "@infrastructure/api/CountryApiClient";
import { ApiClient } from "@infrastructure/http/ApiClient";
import { CountryRepositoryImpl } from "@infrastructure/repositories/CountryRepositoryImpl";

const REST_COUNTRIES_BASE_URL = "https://restcountries.com/v3.1";

type MainDependencies = {
    getCountryByNameUseCase: GetCountryByNameUseCase;
};

let cachedDependencies: MainDependencies | null = null;

function buildMainDependencies(): MainDependencies {
    const apiClient = new ApiClient(REST_COUNTRIES_BASE_URL);
    const countryApiClient = new CountryApiClient(apiClient);
    const countryRepository = new CountryRepositoryImpl(countryApiClient);

    return {
        getCountryByNameUseCase: new GetCountryByNameUseCase(countryRepository),
    };
}

export function createCardDependencies(): MainDependencies {
    if (!cachedDependencies) {
        cachedDependencies = buildMainDependencies();
    }

    return cachedDependencies;
}

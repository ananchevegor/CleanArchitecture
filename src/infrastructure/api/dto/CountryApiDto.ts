export type CountryApiDto = {
    name: {
        common: string;
        official: string;
        nativeName?: Record<
            string,
            {
                official: string;
                common: string;
            }
        >;
    };
    population: number;
};

export type CountriesApiResponseDto = CountryApiDto[];

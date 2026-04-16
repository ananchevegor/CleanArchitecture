export type CountrySelectedApiDto = {
    cca2: string;
    cca3: string;
    capital?: string[];
    region: string;
    subregion?: string;
    population: number;
    area: number;
    flag: string;
    timezones: string[];
    languages?: Record<string, string>;
    latlng?: [number, number];
    name: {
        common: string;
        official: string;
    };
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
    currencies?: Record<
        string,
        {
            symbol?: string;
            name: string;
        }
    >;
};
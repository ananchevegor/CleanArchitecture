export class CountrySelected {
    constructor(
        public readonly commonName: string,
        public readonly officialName: string,
        public readonly cca2: string,
        public readonly cca3: string,
        public readonly capital: string[],
        public readonly region: string,
        public readonly subregion: string,
        public readonly population: number,
        public readonly area: number,
        public readonly flagEmoji: string,
        public readonly flagPng: string,
        public readonly currencyCode: string | null,
        public readonly currencyName: string | null,
        public readonly currencySymbol: string | null,
        public readonly languages: string[],
        public readonly lat: number,
        public readonly lng: number,
        public readonly timezones: string[],
    ) {}
}
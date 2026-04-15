export class Country {
    constructor(
        public readonly commonName: string, 
        public readonly officialName: string,
        public readonly population: number,
        public readonly nativeCommon?: string
    ) {}
}
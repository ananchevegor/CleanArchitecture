import { FavoriteRepository } from "@repositories/FavoriteRepository";

export class ToogleFavoriteUseCase {
    constructor(
        private favoriteRepository: FavoriteRepository
    ) {}

    async execute(countryName: string): Promise<string[]> {
        const currentfavorites = await this.favoriteRepository.getFavorites();

        const isFavorite = currentfavorites.includes(countryName);

        let newFavorites: string[];
        if (isFavorite) {
            newFavorites = currentfavorites.filter((name: string) => name !== countryName);
        } else {
            newFavorites = [...currentfavorites, countryName];
        }

        await this.favoriteRepository.saveFavorites(newFavorites);

        return newFavorites;
    };
}
import { FavoriteRepository } from "@repositories/FavoriteRepository";

export class GetFavoriteUseCase {
    constructor(
        private favoriteRepository: FavoriteRepository
    ) {}

    async execute(): Promise<string[]> {
        return this.favoriteRepository.getFavorites();
    }
}
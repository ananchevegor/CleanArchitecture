import { FavoriteRepositoryImpl } from "@infrastructure/repositories/FavoriteRepositoryImpl";
import { storage } from "@infrastructure/storage/mmkvStorage";
import { GetFavoriteUseCase } from "@use-cases/GetFavoriteUseCase";
import { ToogleFavoriteUseCase } from "@use-cases/ToogleFavoriteUseCase";

export function createFavoriteDependencies() {

    const favoriteRepository = new FavoriteRepositoryImpl();

    const getFavorites = new GetFavoriteUseCase(favoriteRepository);
    const toggleFavorite = new ToogleFavoriteUseCase(favoriteRepository);

    return {
        getFavorites,
        toggleFavorite,
    };
}

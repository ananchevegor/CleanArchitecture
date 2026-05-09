import { storage } from "@infrastructure/storage/mmkvStorage";
import { FavoriteRepository } from "@repositories/FavoriteRepository";


export class FavoriteRepositoryImpl implements FavoriteRepository {
    private static FAVORITES_KEY = 'favorites';

    async getFavorites(): Promise<string[]> {
        const favorites = storage.getString(FavoriteRepositoryImpl.FAVORITES_KEY);
        return favorites ? JSON.parse(favorites) : [];
    }

    async addFavorite(countryName: string): Promise<void> {
        const favorites = await this.getFavorites();
        if (!favorites.includes(countryName)) {
            favorites.push(countryName);
            storage.set(FavoriteRepositoryImpl.FAVORITES_KEY, JSON.stringify(favorites));
        }
    }

    async removeFavorite(countryName: string): Promise<void> {
        const favorites = await this.getFavorites();
        const updatedFavorites = favorites.filter((name) => name !== countryName);
        storage.set(FavoriteRepositoryImpl.FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }

    async saveFavorites(favorites: string[]): Promise<void> {
        storage.set(FavoriteRepositoryImpl.FAVORITES_KEY, JSON.stringify(favorites));
    }
}
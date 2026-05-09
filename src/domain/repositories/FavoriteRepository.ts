export interface FavoriteRepository {
    getFavorites(): Promise<string[]>;
    addFavorite(countryName: string): Promise<void>;
    removeFavorite(countryName: string): Promise<void>;
    saveFavorites(favorites: string[]): Promise<void>;
}
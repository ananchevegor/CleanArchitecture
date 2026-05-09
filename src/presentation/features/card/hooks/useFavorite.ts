import { useFavoriteStore } from "@presentation/store/favorite";
import { GetFavoriteUseCase } from "@use-cases/GetFavoriteUseCase";
import { ToogleFavoriteUseCase } from "@use-cases/ToogleFavoriteUseCase";
import { useEffect } from "react";

export function useFavorite(
    getFavorites: GetFavoriteUseCase,
    toggleFavorite: ToogleFavoriteUseCase
) {

    const favorites = useFavoriteStore((state) => state.favorites);
    const setFavorites = useFavoriteStore((state) => state.setFavorites);

    useEffect(() => {
        const loadInitialFavorites = async () => {
            const initialFavorites = await getFavorites.execute();
            setFavorites(initialFavorites);
        };

        loadInitialFavorites();
    }, [getFavorites, setFavorites]);


    const handleToggleFavorite = async (countryName: string) => {
        await toggleFavorite.execute(countryName);
        const updatedFavorites = await getFavorites.execute();
        setFavorites(updatedFavorites);
    }


    const isFavorite = (countryName: string): boolean => {
        return favorites.includes(countryName);
    }

    return { isFavorite, handleToggleFavorite };
}
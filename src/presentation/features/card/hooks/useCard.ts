import { Country } from "../../../../domain/entities/Country";
import React, { useEffect } from "react";
import { loadCountryByName } from "../card";
import { CountrySelected } from "../../../../domain/entities/CountrySelected";

type CountryCard = {
    loading: boolean;
    error: string | null;
    country: CountrySelected | null;
};

export default function useCard(c: string): CountryCard {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);
    const [country, setCountry] = React.useState<CountrySelected | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCountry = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await loadCountryByName(c);

                console.log(data)

                if (isMounted) {
                    setCountry(data);
                }
            } catch (currentError) {
                if (isMounted) {
                    setError(
                        currentError instanceof Error
                            ? currentError.message
                            : "Unknown error"
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCountry();

        return () => {
            isMounted = false;
        };
    }, [c]);

    return { loading, error, country };
}
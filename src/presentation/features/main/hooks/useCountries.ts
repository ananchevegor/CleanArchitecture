import { useEffect, useState } from "react";
import { loadCountries } from "../main";
import { Country } from "@entities/Country";

type UseCountriesResult = {
    countries: Country[];
    loading: boolean;
    error: string | null;
};

export function useCountries(): UseCountriesResult {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchCountries = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await loadCountries();


                if (isMounted) {
                    setCountries(data);
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

        fetchCountries();

        return () => {
            isMounted = false;
        };
    }, []);

    return { countries, loading, error };
}

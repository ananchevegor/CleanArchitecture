import { useEffect, useState } from "react";
import { loadCountries } from "../main";
import { Country } from "@entities/Country";
import AuthorizationFingerprint from "../../../../native/TurboModule";

type UseCountriesResult = {
    countries: Country[];
    loading: boolean;
    error: string | null;
    authorized: boolean | null;
    authorizeAgain?: () => void;
};

export function useCountries(): UseCountriesResult {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [authorized, setAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        let isMounted = true;

        AuthorizationFingerprint.authorization()
        .then(result => {
            if (result) {
                setAuthorized(true);
            }
        })
        .catch(error => {
            console.error("Authorization error:", error);
        });

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

    const authorizeAgain = () => {
        AuthorizationFingerprint.authorization()
        .then(result => {
            if (result) {
                setAuthorized(true);
            }
        })
        .catch(error => {
            console.error("Authorization error:", error);
        });
    }

    return { countries, loading, error, authorized, authorizeAgain };
}

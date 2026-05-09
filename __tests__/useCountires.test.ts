import { renderHook, waitFor } from '@testing-library/react-native';
import { useCountries } from '@presentation/features/main/hooks/useCountries';

import { loadCountries } from '@presentation/features/main/main';
import { Platform } from 'react-native';

jest.mock('@presentation/features/main/main', () => ({
    loadCountries: jest.fn(),
}));

describe('useCountries', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        Platform.OS = 'android';
    });

    it('should load countries on mount', async () => {
        const mockData = [
            { commonName: 'Country A', officialName: 'A', population: 100, nativeCommon: '' },
        ];
        (loadCountries as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => useCountries());

        expect(result.current.loading).toBe(true);
        expect(result.current.countries).toEqual([]);

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.countries).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should handle errors when loading countries', async () => {
        (loadCountries as jest.Mock).mockRejectedValue(new Error('Failed to load'));

        const { result } = renderHook(() => useCountries());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.error).toBe('Failed to load');
        expect(result.current.countries).toEqual([]);
    });
});

import { GetCountryUseCase } from '@use-cases/GetCountryUseCase';
import { CountryRepository } from '@repositories/CountryRepository';
import { Country } from '@entities/Country';

const mockCountries: Country[] = [
    { commonName: 'Country A', officialName: 'A', population: 100, nativeCommon: '' },
    { commonName: 'Country B', officialName: 'B', population: 500, nativeCommon: '' },
    { commonName: 'Country C', officialName: 'C', population: 50, nativeCommon: '' },
];

const mockRepository: jest.Mocked<CountryRepository> = {
    getAll: jest.fn(),
    getCountryByName: jest.fn(),
}

describe('GetCountryUseCase', () => {
    let useCase: GetCountryUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        useCase = new GetCountryUseCase(mockRepository);
    });

    it('should return countries sorted by population in descending order', async () => {
        mockRepository.getAll.mockResolvedValue(mockCountries);

        const result = await useCase.execute();
        expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        expect(result.length).toBe(3);
        expect(result[0].commonName).toBe('Country B');
        expect(result[1].commonName).toBe('Country A');
        expect(result[2].commonName).toBe('Country C');
    });
});
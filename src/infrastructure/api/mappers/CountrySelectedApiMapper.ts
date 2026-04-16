
import { CountrySelected } from "../../../domain/entities/CountrySelected";
import { CountrySelectedApiDto } from "../dto/CountrySelectedApiDto";

export class CountrySelectedMapper {
    static toDomain(dto: CountrySelectedApiDto): CountrySelected {
        const firstCurrencyEntry = dto.currencies
            ? Object.entries(dto.currencies)[0]
            : null;

        const currencyCode = firstCurrencyEntry ? firstCurrencyEntry[0] : null;
        const currencyData = firstCurrencyEntry ? firstCurrencyEntry[1] : null;

        return new CountrySelected(
            dto.name.common,
            dto.name.official,
            dto.cca2,
            dto.cca3,
            dto.capital ?? [],
            dto.region,
            dto.subregion ?? "",
            dto.population,
            dto.area,
            dto.flag,
            dto.flags.png,
            currencyCode,
            currencyData?.name ?? null,
            currencyData?.symbol ?? null,
            dto.languages ? Object.values(dto.languages) : [],
            dto.latlng?.[0] ?? 0,
            dto.latlng?.[1] ?? 0,
            dto.timezones ?? [],
        );
    }
}
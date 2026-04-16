import { Country } from "@entities/Country";
import { CountryApiDto } from "../dto";

export class CountryApiMapper {
    static toDomain(dto: CountryApiDto): Country {
        const firstNativeName = dto.name.nativeName
            ? Object.values(dto.name.nativeName)[0]
            : undefined;

        return new Country(
            dto.name.common,
            dto.name.official,
            dto.population,
            firstNativeName?.common
        );
    }
}

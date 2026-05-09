import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CountryCard from "@presentation/features/main/components/CountryCard";
import { Country } from "@entities/Country";

const mockCountry: Country = {
    commonName: "testLand",
    officialName: "Testlandia",
    population: 123456,
    nativeCommon: "Testland"
}

describe("CountryCard", () => {
    it("renders country information correctly", () => {

        const mockOnPress = jest.fn();

        const { getByText } = render(
            <CountryCard item={mockCountry} onPress={mockOnPress} />
        );

        const expectesPopulation = mockCountry.population.toLocaleString();
        expect(getByText("testLand")).toBeTruthy();
        expect(getByText("Testlandia")).toBeTruthy();
        expect(getByText("Native: Testland")).toBeTruthy();
        expect(getByText(`Population: ${expectesPopulation}`)).toBeTruthy();
    });

    it("calls onPress with the correct country name when pressed", () => {

        const mockOnPress = jest.fn();

        const { getByText } = render(
            <CountryCard item={mockCountry} onPress={mockOnPress} />
        );

        const cardElement = getByText("testLand");
        fireEvent.press(cardElement);

        expect(mockOnPress).toHaveBeenCalledTimes(1);
        expect(mockOnPress).toHaveBeenCalledWith("testLand");
    });
});
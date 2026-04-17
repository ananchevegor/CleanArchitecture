import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Country } from "../../../../domain/entities/Country";


type CountryCardProps = {
    item: Country,
    onPress: (countryName: string) => void
};


const CountryCard = React.memo(({ item, onPress}: CountryCardProps) => {
    console.log(`Rendering card for`);
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item.commonName)}>
            <Text style={styles.title}>{item.commonName}</Text>
            <Text style={styles.subtitle}>{item.officialName}</Text>

            {item.nativeCommon ? (
                <Text style={styles.meta}>Native: {item.nativeCommon}</Text>
            ) : null}

            <Text style={styles.population}>
                Population: {item.population.toLocaleString()}
            </Text>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 10,
    },
    meta: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 8,
    },
    population: {
        fontSize: 15,
        fontWeight: "600",
        color: "#2563EB",
    },
});

export default CountryCard;

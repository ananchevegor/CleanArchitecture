import React, { useMemo } from "react";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import useCard from "./hooks/useCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../App";
import { createFavoriteDependencies } from "@composition/main/createFavoriteDependencies";
import { useFavorite } from "./hooks/useFavorite";

type Props = NativeStackScreenProps<RootStackParamList, "CardScreen">;

export default function CardScreen({ route }: Props) {
    const name: string = route.params.countryName;
    const { loading, error, country } = useCard(name);

    const selectedCountry = country?.[0] ?? null;

    const dependencies = useMemo(() => createFavoriteDependencies(), []);

    const { isFavorite, handleToggleFavorite } = useFavorite(dependencies.getFavorites, dependencies.toggleFavorite);

    const isFav = selectedCountry ? isFavorite(selectedCountry.commonName) : false;


    if (loading) {
        return (
            <View style={styles.centeredState}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.stateText}>Loading country...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredState}>
                <Text style={styles.errorTitle}>Unable to load country</Text>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    if (!selectedCountry) {
        return (
            <View style={styles.centeredState}>
                <Text style={styles.errorTitle}>Country not found</Text>
                <Text style={styles.errorMessage}>
                    No data is available for this country.
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.screen}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.heroCard}>
                <Text style={styles.flag}>{selectedCountry.flagEmoji || "🏳️"}</Text>
                <Text style={styles.title}>{selectedCountry.commonName || "—"}</Text>
                <Text style={styles.subtitle}>
                    {selectedCountry.officialName || "—"}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>

                <InfoRow label="CCA2" value={selectedCountry.cca2 || "—"} />
                <InfoRow label="CCA3" value={selectedCountry.cca3 || "—"} />
                <InfoRow
                    label="Capital"
                    value={
                        selectedCountry.capital?.length
                            ? selectedCountry.capital.join(", ")
                            : "—"
                    }
                />
                <InfoRow label="Region" value={selectedCountry.region || "—"} />
                <InfoRow label="Subregion" value={selectedCountry.subregion || "—"} />
                <InfoRow
                    label="Population"
                    value={selectedCountry.population != null
                        ? selectedCountry.population.toLocaleString()
                        : "—"}
                />
                <InfoRow
                    label="Area"
                    value={
                        selectedCountry.area != null
                            ? `${selectedCountry.area.toLocaleString()} km²`
                            : "—"
                    }
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Location</Text>

                <InfoRow
                    label="Latitude"
                    value={
                        selectedCountry.lat != null
                            ? String(selectedCountry.lat)
                            : "—"
                    }
                />
                <InfoRow
                    label="Longitude"
                    value={
                        selectedCountry.lng != null
                            ? String(selectedCountry.lng)
                            : "—"
                    }
                />
                <InfoRow
                    label="Timezones"
                    value={
                        selectedCountry.timezones?.length
                            ? selectedCountry.timezones.join(", ")
                            : "—"
                    }
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Culture</Text>

                <InfoRow
                    label="Languages"
                    value={
                        selectedCountry.languages?.length
                            ? selectedCountry.languages.join(", ")
                            : "—"
                    }
                />
                <InfoRow
                    label="Currency code"
                    value={selectedCountry.currencyCode || "—"}
                />
                <InfoRow
                    label="Currency"
                    value={selectedCountry.currencyName || "—"}
                />
                <InfoRow
                    label="Symbol"
                    value={selectedCountry.currencySymbol || "—"}
                />
            </View>
            <Pressable 
                onPress={() => handleToggleFavorite(selectedCountry.commonName)}
                style={({ pressed }) => [
                    styles.button,
                    isFav ? styles.buttonRemove : styles.buttonAdd,
                    pressed && styles.buttonPressed // Эффект прикосновения
                ]}
            >
                <Text style={[
                    styles.buttonText, 
                    isFav ? styles.textRemove : styles.textAdd
                ]}>
                    {isFav ? '❤️ Убрать из избранного' : '🤍 В избранное'}
                </Text>
            </Pressable>
                    </ScrollView>
                );
}

type InfoRowProps = {
    label: string;
    value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
    return (
        <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    content: {
        padding: 16,
        paddingBottom: 32,
    },
    centeredState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: "#F3F4F6",
    },
    stateText: {
        marginTop: 12,
        fontSize: 16,
        color: "#4B5563",
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#B91C1C",
        marginBottom: 8,
        textAlign: "center",
    },
    errorMessage: {
        fontSize: 14,
        color: "#6B7280",
        textAlign: "center",
    },
    heroCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    flag: {
        fontSize: 56,
        marginBottom: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
    },
    subtitle: {
        marginTop: 8,
        fontSize: 15,
        color: "#6B7280",
        textAlign: "center",
    },
    section: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 14,
    },
    infoRow: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    infoLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6B7280",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12, 
        marginTop: 16,
        borderWidth: 1,
    },
    buttonAdd: {
        backgroundColor: '#007AFF', 
        borderColor: '#007AFF',
    },
    buttonRemove: {
        backgroundColor: '#F2F2F7', 
        borderColor: '#FF3B30',     
    },
    buttonPressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }], 
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600', 
        marginLeft: 8,     
    },

    textAdd: {
        color: '#FFFFFF',
    },

    textRemove: {
        color: '#FF3B30',
    },
});
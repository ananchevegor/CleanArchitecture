import React, { useCallback, useEffect, useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CountryCard from "./components/CountryCard";
import { useCountries } from "./hooks/useCountries";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";
import { Country } from "@entities/Country";
import NativeModule from "../../../../specs/NativeModule";
import AuthorizationFingerprint from "../../../native/TurboModule";
import { useFavorite } from "./hooks/useFavorite";
import { createFavoriteDependencies } from "@composition/main/createFavoriteDependencies";




type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

export default function MainScreen({navigation}: Props) {
    const { countries, loading, error, authorized, authorizeAgain } = useCountries();

    const dependencies = useMemo(() => createFavoriteDependencies(), []);

    const  { isFavorite } = useFavorite(dependencies.getFavorites, dependencies.toggleFavorite);

    const totalPopulation = NativeModule.summuryPopulation(countries.map(c => c.population));
    
    const handlePress = useCallback((countryName: string) => {
        navigation.navigate("CardScreen", {countryName: countryName.toLowerCase()})
    }, [navigation]);

    const renderItem = useCallback(
        ({ item }: { item: Country }) => (
            <CountryCard item={item} onPress={handlePress} isFavorite={isFavorite(item.commonName)} />
        ),
        [handlePress, isFavorite]
    );


    if (loading) {
        return (
            <View style={styles.centeredState}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.stateText}>Loading countries...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredState}>
                <Text style={styles.errorTitle}>Unable to load countries</Text>
                <Text style={styles.errorMessage}>{error}</Text>
            </View>
        );
    }

    if (!authorized) {
        return (
            <View style={styles.centeredState}>
                <Text style={styles.errorTitle}>Unauthorized</Text>
                <Text style={styles.errorMessage}>You are not authorized to view this content.</Text>
                <Text style={[styles.errorMessage, { marginTop: 16, color: '#2563EB' }]} onPress={authorizeAgain}>Try Again</Text>
            </View>
        );
    }

    

    return (
        <View style={styles.screen}>
            <View style={styles.summaryContainer}>
            <Text style={styles.summaryLabel}>Total population</Text>
            <Text style={styles.summaryValue}>
                {totalPopulation.toLocaleString()}
            </Text>
            </View>
        
            <FlatList
            data={countries}
            renderItem={renderItem}
            keyExtractor={(item) => item.officialName}
            initialNumToRender={12}
            maxToRenderPerBatch={10}
            updateCellsBatchingPeriod={50}
            windowSize={7}
            removeClippedSubviews
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },
    listContent: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        paddingBottom: 24,
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
    summaryContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      },
      summaryLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
      },
      summaryValue: {
        fontSize: 24,
        fontWeight: '700',
        color: '#111',
      },
});

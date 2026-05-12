import React, { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
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
import Animated, { SharedTransition, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedFlashList, FlashList, FlashListRef } from "@shopify/flash-list";




type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

export default function MainScreen({navigation}: Props) {
    const { countries, loading, error, authorized, authorizeAgain, filteredCountries, searchOfCountries } = useCountries();

    const dependencies = useMemo(() => createFavoriteDependencies(), []);

    const  { isFavorite } = useFavorite(dependencies.getFavorites, dependencies.toggleFavorite);

    const totalPopulation = NativeModule.summuryPopulation(countries.map(c => c.population));
    
    const handlePress = useCallback((countryName: string) => {
        navigation.navigate("CardScreen", {countryName: countryName.toLowerCase()})
    }, [navigation]);

    const transition = SharedTransition.duration(550).springify();

    const renderItem = useCallback(
        ({ item }: { item: Country }) => (
            <Animated.View sharedTransitionTag="hero" sharedTransitionStyle={transition}>
                <CountryCard item={item} onPress={handlePress} isFavorite={isFavorite(item.commonName)} />
            </Animated.View>
        ),
        [handlePress, isFavorite]
    );

    const insets = useSafeAreaInsets();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerSearchBarOptions: {
                placeholder: "Search countries",
                hideWhenScrolling: true,
                onChangeText: (event) => {
                    searchOfCountries(event.nativeEvent.text);
                }
            },
        });
    }, [navigation]);

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
        <SafeAreaView style={[styles.screen, { paddingTop: insets.top }]}>
            <View style={styles.summaryContainer}>
            <Text style={styles.summaryLabel}>Total population</Text>
            <Text style={styles.summaryValue}>
                {totalPopulation.toLocaleString()}
            </Text>
            </View>
        
            <AnimatedFlashList
                data={filteredCountries.length === 0 ? countries : filteredCountries}
                renderItem={renderItem}
                keyExtractor={(item) => item.officialName}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                keyboardDismissMode="on-drag"
                automaticallyAdjustKeyboardInsets={true}
                scrollEventThrottle={16}
                contentInsetAdjustmentBehavior="automatic"
            />
        </SafeAreaView>
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
    button: {
        position: "absolute",
        bottom: 24,
        right: 16,
    },
    buttonText: {
        backgroundColor: "#2563EB",
        color: "#fff",
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

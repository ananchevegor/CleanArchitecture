import React from "react";
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


type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

export default function MainScreen({navigation}: Props) {
    const { countries, loading, error } = useCountries();

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


    return (
        <View style={styles.screen}>
            <FlatList
                data={countries}
                renderItem={({ item }) => <CountryCard item={item} onPress={() => {
                    navigation.navigate("CardScreen", {countryName: item.commonName.toLowerCase()})
                }}/>}
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
});

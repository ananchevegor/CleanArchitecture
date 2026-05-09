import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Country } from "@entities/Country";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useFavorite } from "../hooks/useFavorite";

type CountryCardProps = {
    item: Country,
    onPress: (countryName: string) => void,
    isFavorite: boolean
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CountryCard = React.memo(({ item, onPress, isFavorite }: CountryCardProps) => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    
    return (
        <AnimatedPressable 
            style={[styles.card, animatedStyle]} 
            onPress={() => onPress(item.commonName)} 
            onPressIn={() => {
                scale.value = withSpring(0.95, {
                damping: 15,
                stiffness: 1000,
                });
            }}
            onPressOut={() => {
                scale.value = withSpring(1);
            }}>

            <View style={styles.commonNameFavirite}>
                <Text style={styles.title}>{item.commonName}</Text> 
                <Text>{ isFavorite ? "❤️" : null }</Text>
            </View>
            <Text style={styles.subtitle}>{item.officialName}</Text>

            {item.nativeCommon ? (
                <Text style={styles.meta}>Native: {item.nativeCommon}</Text>
            ) : null}

            <Text style={styles.population}>
                Population: {item.population.toLocaleString()}
            </Text>
        </AnimatedPressable>
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
    commonNameFavirite:{
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
    }
});

export default CountryCard;

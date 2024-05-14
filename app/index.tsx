import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const calculateFinalPrice = (originalPrice: number, discountPercentage: number, minimumDiscount: number): number => {
    let calculatedDiscount = (originalPrice * (discountPercentage / 100));

    if (calculatedDiscount < minimumDiscount) {
        calculatedDiscount = minimumDiscount;
    }
    if (calculatedDiscount > originalPrice) {
        calculatedDiscount = originalPrice;
    }

    const finalPrice = originalPrice - calculatedDiscount;

    return finalPrice;
}

export default function DiscountCalculator() {
    const [originalPrice, setOriginalPrice] = useState<string>('');
    const [discountPercentage, setDiscountPercentage] = useState<string>('');
    const [minimumDiscount, setMinimumDiscount] = useState<string>('');
    const [finalPrice, setFinalPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCalculate = () => {
        try {
            const price = parseFloat(originalPrice);
            const discount = parseFloat(discountPercentage);
            const minDiscount = parseFloat(minimumDiscount);

            if (isNaN(price) || isNaN(discount) || isNaN(minDiscount)) {
                throw new Error('Please enter valid numbers for all fields.');
            }

            if (price < 0 || discount < 0 || minDiscount < 0) {
                throw new Error('Values cannot be negative.');
            }

            if (discount > 100) {
                throw new Error('Discount cannot be greater than 100.');
            }

            if (minDiscount > price) {
                throw new Error('The minimum discount cannot exceed the original price.');
            }

            const final = calculateFinalPrice(price, discount, minDiscount);
            setFinalPrice(final);
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred.');
            }
            setFinalPrice(null);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Original Price:
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={originalPrice}
                onChangeText={setOriginalPrice}
            />
            <Text style={styles.label}>
                Discount Percentage:
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={discountPercentage}
                onChangeText={setDiscountPercentage}
            />
            <Text style={styles.label}>
                Minimum Discount:
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={minimumDiscount}
                onChangeText={setMinimumDiscount}
            />
            <Button title="Calculate" onPress={handleCalculate} />
            {finalPrice !== null && (
                <Text style={styles.labelFinal}>
                    The Final Price is: ${finalPrice.toFixed(2)}
                </Text>
            )}
            {error && (
                <Text style={styles.labelError}>
                    {error}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
    },
    labelFinal: {
        marginTop: 15,
    },
    labelError: {
        marginTop: 15,
        color: 'red'
    },
});
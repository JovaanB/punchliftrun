
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, TextInput, TextInputProps } from 'react-native-paper';

const NumberInput = (props: {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
} & TextInputProps) => {

    const { label, value, onChangeText, ...rest } = props;
    return (
        <TextInput
            label={label}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            keyboardType="numeric"
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10
    }
})

export default NumberInput;
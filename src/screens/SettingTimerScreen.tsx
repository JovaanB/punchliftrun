import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import Layout from "../components/Layout";
import { StyleSheet } from "react-native";
import ScreenTitle from "../components/ScreenTitle";
import NumberInput from "../components/NumberInput";

type SettingTimerScreenProps = {
    navigation: StackNavigationProp<any>;
}

const SettingTimerScreen = ({ navigation }: SettingTimerScreenProps) => {
    const [settings, setSettings] = useState({
        preparation: "",
        exercice: "",
        repos: "",
        rounds: ""
    });

    const { preparation, exercice, repos, rounds } = settings;

    return (
        <Layout>
            <ScreenTitle title="Paramètres" />
            <NumberInput
                label="Préparation"
                value={preparation.toString()}
                onChangeText={text => setSettings(prevState => ({ ...prevState, preparation: text }))}
            />
            <NumberInput
                label="Exercice"
                value={exercice.toString()}
                onChangeText={text => setSettings(prevState => ({ ...prevState, exercice: text }))}
            />
            <NumberInput
                label="Repos"
                value={repos.toString()}
                onChangeText={text => setSettings(prevState => ({ ...prevState, repos: text }))}
            />
            <NumberInput
                label="Rounds"
                value={rounds.toString()}
                onChangeText={text => setSettings(prevState => ({ ...prevState, rounds: text }))}
            />
            <Button
                mode="contained"
                style={styles.button}
                onPress={() => navigation.navigate("Timer", {
                    preparation
                })}
            >Enregistrer</Button>

        </Layout>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: "auto"
    },
    input: {
        margin: 8,
    }
})

export default SettingTimerScreen;

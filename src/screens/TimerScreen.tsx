import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from "react-native";
import colors from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import Layout from "../components/Layout";

type TimerScreenProps = StackScreenProps<RootStackParamList, 'Timer'>;

interface Rounds {
    name: string;
    timeInSec: number;
}

const defaultRounds: Rounds[] = [
    {
        name: "Préparation",
        timeInSec: 5
    }
];

const formatNumber = (number: number): string => `0${number}`.slice(-2);

const TimerScreen = ({ navigation, route }: TimerScreenProps) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [currentRounds, setCurrentRounds] = useState<Rounds[]>(defaultRounds);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (route.params) {
            const { preparation = 5 } = route.params;

            setCurrentRounds([{
                name: "Préparation",
                timeInSec: preparation
            }])
        }
    }, [route.params])

    useEffect(() => {
        if (currentRounds.length === 0 && isRunning) {
            stop();
        }
    }, [currentRounds]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const stop = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const start = useCallback(() => {
        setIsRunning(true);

        const ONE_SECOND = 1000;

        intervalRef.current = setInterval(() => {
            setCurrentRounds(prevRounds => {
                const [currentRound, ...remainingRounds] = prevRounds;

                if (currentRound.timeInSec <= 1) {
                    if (remainingRounds.length < 1) {
                        stop();
                        return defaultRounds;
                    }

                    return remainingRounds;
                }

                return [
                    { ...currentRound, timeInSec: currentRound.timeInSec - 1 },
                    ...remainingRounds
                ];
            });
        }, ONE_SECOND);

    }, []);

    return (
        <Layout>
            <StatusBar barStyle="light-content" />
            <MaterialCommunityIcons name="timer-cog" size={24} style={{ marginLeft: "auto", marginBottom: 10 }} color={colors.primary} onPress={() => navigation.navigate("SettingTimer")} />

            <View style={styles.mainContainer}>
                <View style={styles.roundContainer}>
                    <Text style={styles.roundName}>{currentRounds[0].name}</Text>
                    <Text style={styles.timerText}>
                        {formatNumber(Math.floor(currentRounds[0].timeInSec / 60))}:{formatNumber(currentRounds[0].timeInSec % 60)}
                    </Text>
                </View>

                <View style={[styles.roundContainer, styles.nextRoundContainer]}>
                    {currentRounds[1] ? (
                        <>
                            <Text style={styles.nextRoundName}>{currentRounds[1].name}</Text>
                            <Text style={styles.nextRoundTimer}>
                                {formatNumber(Math.floor(currentRounds[1].timeInSec / 60))}:{formatNumber(currentRounds[1].timeInSec % 60)}
                            </Text>
                        </>
                    ) : <Text style={styles.nextRoundName}>Terminé</Text>}

                </View>
            </View>

            {isRunning ? (
                <TouchableOpacity
                    onPress={stop}
                    style={[styles.button, styles.buttonStop]}
                >
                    <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={start}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    button: {
        borderWidth: 10,
        borderColor: "#89AAFF",
        width: 100,
        height: 100,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginHorizontal: "auto"
    },
    buttonStop: {
        borderColor: "#FF851B"
    },
    buttonText: {
        fontSize: 25,
        color: "#89AAFF"
    },
    buttonTextStop: {
        color: "#FF851B"
    },
    roundContainer: {
        backgroundColor: colors.primaryContainer,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        gap: 10
    },
    roundName: {
        color: "#fff",
        fontSize: 20
    },
    timerText: {
        color: "#fff",
        fontSize: 90,
        fontWeight: "bold"
    },
    nextRoundContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        gap: 10,
        opacity: 0.5
    },
    nextRoundName: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold"
    },
    nextRoundTimer: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default TimerScreen;
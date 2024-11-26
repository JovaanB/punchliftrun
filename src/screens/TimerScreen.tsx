import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, StatusBar, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import Layout from '../components/Layout';
import { Text } from 'react-native-paper';

type TimerScreenProps = StackScreenProps<RootStackParamList, 'Timer'>;

interface Rounds {
  name: string;
  timeInSec: number;
}

const defaultRounds: Rounds[] = [
  {
    name: 'Préparation',
    timeInSec: 5,
  },
];

const formatNumber = (number: number): string => `0${number}`.slice(-2);

const TimerScreen = ({ navigation, route }: TimerScreenProps) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentRounds, setCurrentRounds] = useState<Rounds[]>(defaultRounds);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (route.params) {
      const {
        preparation = 5,
        exercice = 30,
        repos = 10,
        numberOfRounds = 4,
      } = route.params;

      setCurrentRounds(() => {
        const rounds = [];
        rounds.push({
          name: 'Préparation',
          timeInSec: preparation,
        });

        for (let i = 0; i < numberOfRounds; i++) {
          rounds.push(
            {
              name: 'Exercice',
              timeInSec: exercice,
            },
            {
              name: 'Repos',
              timeInSec: repos,
            }
          );
        }

        return rounds;
      });
    }
  }, [route.params]);

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
      setCurrentRounds((prevRounds) => {
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
          ...remainingRounds,
        ];
      });
    }, ONE_SECOND);
  }, []);

  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <MaterialCommunityIcons
        name="timer-cog"
        size={24}
        style={{ marginLeft: 'auto', marginBottom: 10 }}
        color={colors.primary}
        onPress={() => navigation.navigate('SettingTimer')}
      />

      <View style={styles.mainContainer}>
        <View style={styles.roundContainer}>
          <Text style={styles.roundName}>{currentRounds[0].name}</Text>
          <Text style={styles.timerText}>
            {formatNumber(Math.floor(currentRounds[0].timeInSec / 60))}:
            {formatNumber(currentRounds[0].timeInSec % 60)}
          </Text>
        </View>

        <View style={styles.nextRoundContainer}>
          {currentRounds[1] ? (
            <>
              <Text style={styles.nextRoundName}>{currentRounds[1].name}</Text>
              <Text style={styles.nextRoundTimer}>
                {formatNumber(Math.floor(currentRounds[1].timeInSec / 60))}:
                {formatNumber(currentRounds[1].timeInSec % 60)}
              </Text>
            </>
          ) : (
            <Text style={styles.nextRoundName}>Terminé</Text>
          )}
        </View>

        <Text variant="titleMedium">
          {Math.round((currentRounds.length - 1) / 2)} rounds restants
        </Text>
      </View>

      {isRunning ? (
        <TouchableOpacity
          onPress={stop}
          style={[styles.button, styles.buttonStop]}
        >
          <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={start} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  button: {
    borderWidth: 10,
    borderColor: '#89AAFF',
    width: 120,
    height: 120,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginHorizontal: 'auto',
  },
  buttonStop: {
    borderColor: '#FF851B',
  },
  buttonText: {
    fontSize: 30,
    color: '#89AAFF',
  },
  buttonTextStop: {
    color: '#FF851B',
  },
  roundContainer: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    gap: 5,
  },
  roundName: {
    color: '#fff',
    fontSize: 50,
  },
  timerText: {
    color: '#fff',
    fontSize: 120,
    fontWeight: 'bold',
  },
  nextRoundContainer: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    opacity: 0.6,
  },
  nextRoundName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  nextRoundTimer: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  remainingRounds: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: '400',
  },
});

export default TimerScreen;

import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';

const Game = props => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [remainingSeconds, setRemainingSeconds] = useState(
    props.initialSeconds,
  );
  const [gameState, setGameState] = useState('Playing');
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setRemainingSeconds(remainingSeconds => {
        if (remainingSeconds === 0) {
          clearInterval(interval.current);
          return remainingSeconds;
        } else {
          return remainingSeconds - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  useEffect(() => {
    if (remainingSeconds === 0) {
      setGameState('Lost');
    }
  }, [remainingSeconds]);

  useEffect(() => {
    const sum = selectedNumbers.reduce((acc, current) => {
      return acc + props.randomNumber[current];
    }, 0);

    if (sum > props.numbers || remainingSeconds === 0) {
      setGameState('Lost');
      clearInterval(interval.current);
    }
    if (sum === props.numbers) {
      setGameState('Win');
      clearInterval(interval.current);
    }
  }, [selectedNumbers]);

  function isNumberSelected(numberIndex) {
    return selectedNumbers.indexOf(numberIndex) >= 0;
  }

  const addSelectedNumber = value => {
    setSelectedNumbers([...selectedNumbers, value]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.textColor, styles[`status_${gameState}`]]}>
        {props.numbers}
      </Text>
      <View style={styles.randomContainer}>
        {props.randomNumber.map((number, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={number}
            numberSelected={isNumberSelected(index) || gameState !== 'Playing'}
            addSelectedNumber={addSelectedNumber}
          />
        ))}
      </View>
      <Text style={styles.playStyle}>{remainingSeconds}</Text>
      <Text style={styles.playStyle}>{gameState}</Text>
      <Button title="Play Again" onPress={props.resetGame} />
    </View>
  );
};

Game.prototype = {
  numbersCount: PropTypes.number.isRequired,
  randomNumber: PropTypes.array.isRequired,
  numbers: PropTypes.number.isRequired,
  initialSeconds: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    padding: 30,
  },
  textColor: {
    backgroundColor: 'grey',
    fontSize: 50,
    color: 'black',
    textAlign: 'center',
    marginHorizontal: 30,
  },
  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  playStyle: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  status_Playing: {
    backgroundColor: 'grey',
  },
  status_Lost: {
    backgroundColor: 'red',
  },
  status_Win: {
    backgroundColor: 'green',
  },
});

export default Game;

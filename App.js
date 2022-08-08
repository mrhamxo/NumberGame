import React, {useState} from 'react';
import Game from './src/components/Game';
import shuffle from 'lodash.shuffle';

const App = () => {
  const [gameId, setGameId] = useState(1);

  const resetGame = () => {
    setGameId(gameId + 1);
  };

  const numbersCount = 8;
  const initialSeconds = 30;
  let randomNumber = Array.from({length: numbersCount}).map(() =>
    Math.floor(Math.random() * 10 + 1),
  );

  const numbers = randomNumber
    .slice(0, numbersCount - 2)
    .reduce((acc, current) => acc + current, 0);

  randomNumber = shuffle(randomNumber);
  return (
    <Game
      key={gameId}
      numbersCount={numbersCount}
      randomNumber={randomNumber}
      numbers={numbers}
      initialSeconds={initialSeconds}
      resetGame={resetGame}
    />
  );
};

export default App;

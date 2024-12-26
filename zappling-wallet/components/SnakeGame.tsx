// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import FontAwesome from '@expo/vector-icons/FontAwesome';

// // Define the grid size and initial game state
// const GRID_SIZE = 10;
// const INITIAL_SNAKE = [{ x: 5, y: 5 }];
// const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving up initially

// interface Position {
//   x: number;
//   y: number;
// }

// const generateFood = (snake: Position[]): Position => {
//     let newFood:Position;
//     do {
//       newFood = {
//         x: Math.floor(Math.random() * GRID_SIZE),
//         y: Math.floor(Math.random() * GRID_SIZE),
//       };
//     } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
//     return newFood;
//   };
  
// const SnakeGame: React.FC = () => {
//   const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
//   const [food, setFood] = useState<Position>(generateFood(INITIAL_SNAKE));
//   const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
//   const [isGameOver, setIsGameOver] = useState(false);

//   useEffect(() => {
//     const intervalId = setInterval(moveSnake, 300); // Snake speed
//     return () => clearInterval(intervalId);
//   }, [snake, direction]);

//   useEffect(() => {
//     if (isGameOver) {
//       Alert.alert('Game Over', 'You lost! Tap to restart.', [
//         { text: 'Restart', onPress: resetGame },
//       ]);
//     }
//   }, [isGameOver]);

//   const moveSnake = () => {
//     if (isGameOver) return;

//     const newHead = {
//       x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
//       y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
//     };

//     if (isCollision(newHead)) {
//       setIsGameOver(true);
//       return;
//     }

//     const newSnake = [newHead, ...snake];

//     if (newHead.x === food.x && newHead.y === food.y) {
//       setFood(generateFood(newSnake));
//     } else {
//       newSnake.pop();
//     }

//     setSnake(newSnake);
//   };

//   const isCollision = (head: Position) => {
//     return snake.some(segment => segment.x === head.x && segment.y === head.y);
//   };

  

//   const resetGame = () => {
//     setSnake(INITIAL_SNAKE);
//     setFood(generateFood(INITIAL_SNAKE));
//     setDirection(INITIAL_DIRECTION);
//     setIsGameOver(false);
//   };

//   const changeDirection = (newDirection: Position) => {
//     if (
//       direction.x + newDirection.x !== 0 ||
//       direction.y + newDirection.y !== 0
//     ) {
//       setDirection(newDirection);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.grid}>
//         {Array.from({ length: GRID_SIZE }).map((_, row) => (
//           <View key={row} style={styles.row}>
//             {Array.from({ length: GRID_SIZE }).map((_, col) => (
//               <View
//                 key={`${row}-${col}`}
//                 style={[
//                   styles.cell,
//                   snake.some(seg => seg.x === col && seg.y === row) && styles.snake,
//                   food.x === col && food.y === row && styles.food,
//                 ]}
//               />
//             ))}
//           </View>
//         ))}
//       </View>
//       <View style={styles.controls}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => changeDirection({ x: 0, y: -1 })}>
//             <AntDesign name="upcircle" size={24} color="black" />
//           {/*<Text style={styles.buttonText}>Up</Text>*/}
//         </TouchableOpacity>
//         <View style={styles.horizontalControls}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => changeDirection({ x: -1, y: 0 })}>
//               <AntDesign name="leftcircle" size={24} color="black" />
//             {/*<Text style={styles.buttonText}>Left</Text>*/}
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => changeDirection({ x: 1, y: 0 })}>
//               <AntDesign name="rightcircle" size={24} color="black" />
//             {/*<Text style={styles.buttonText}>Right</Text>*/}
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => changeDirection({ x: 0, y: 1 })}>
//             <AntDesign name="downcircle" size={24} color="black" />
//           {/*<Text style={styles.buttonText}>Down</Text>*/}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'transparent',
//   },
//   grid: {
//     width: 300,
//     height: 300,
//     backgroundColor: '#111',
//   },
//   row: {
//     flexDirection: 'row',
//     flex: 1,
//   },
//   cell: {
//     flex: 1,
//     borderWidth: 0.5,
//     borderColor: '#222',
//   },
//   snake: {
//     backgroundColor: '#0f0',
//   },
//   food: {
//     backgroundColor: '#f00',
//   },
//   controls: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   horizontalControls: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '50%',
//   },
//   button: {
//     backgroundColor: '#444',
//     padding: 10,
//     margin: 5,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default SnakeGame;
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

// Define the grid size and initial game state
const GRID_SIZE = 10;
const INITIAL_SNAKE = [{ x: 5, y: 5 }];
const INITIAL_DIRECTION = { x: 0, y: -1 }; // Moving up initially

interface Position {
  x: number;
  y: number;
}
const generateFood = (snake: Position[]): Position => {
    let newFood:Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  };

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || isGameOver) return;
    const intervalId = setInterval(moveSnake, 300); // Snake speed
    return () => clearInterval(intervalId);
  }, [snake, direction, isPaused]);

  useEffect(() => {
    if (isGameOver) {
      Alert.alert('Game Over', 'You lost! Tap to restart.', [
        { text: 'Restart', onPress: resetGame },
      ]);
    }
  }, [isGameOver]);

  const moveSnake = () => {
    if (isGameOver) return;

    const newHead = {
      x: (snake[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
      y: (snake[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
    };

    if (isCollision(newHead)) {
      setIsGameOver(true);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const isCollision = (head: Position) => {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  };

  

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setIsPaused(false);
  };

  const changeDirection = (newDirection: Position) => {
    if (
      direction.x + newDirection.x !== 0 ||
      direction.y + newDirection.y !== 0
    ) {
      setDirection(newDirection);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {Array.from({ length: GRID_SIZE }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: GRID_SIZE }).map((_, col) => (
              <View
                key={`${row}-${col}`}
                style={[
                  styles.cell,
                  snake.some((seg, idx) => seg.x === col && seg.y === row && idx === 0) && styles.snakeHead,
                  snake.some((seg, idx) => seg.x === col && seg.y === row && idx !== 0) && styles.snake,
                  food.x === col && food.y === row && styles.food,
                ]}
              />
            ))}
          </View>
        ))}
      </View>
      <View style={styles.dPadContainer}>
        <View style={styles.rowSpacer} />
        <TouchableOpacity
          style={styles.dPadButton}
          onPress={() => changeDirection({ x: 0, y: -1 })}>
          <Text style={styles.dPadText}>↑</Text>
        </TouchableOpacity>
        <View style={styles.rowSpacer} />
        <View style={styles.dPadRow}>
          <TouchableOpacity
            style={styles.dPadButton}
            onPress={() => changeDirection({ x: -1, y: 0 })}>
            <Text style={styles.dPadText}>←</Text>
          </TouchableOpacity>
          <View style={styles.dPadCenter} />
          <TouchableOpacity
            style={styles.dPadButton}
            onPress={() => changeDirection({ x: 1, y: 0 })}>
            <Text style={styles.dPadText}>→</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowSpacer} />
        <TouchableOpacity
          style={styles.dPadButton}
          onPress={() => changeDirection({ x: 0, y: 1 })}>
          <Text style={styles.dPadText}>↓</Text>
        </TouchableOpacity>
        <View style={styles.rowSpacer} />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.pauseButton]}
        onPress={togglePause}>
        <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  grid: {
    width: 300,
    height: 300,
    backgroundColor: '#111',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  button: {
        backgroundColor: '#444',
        padding: 10,
        margin: 5,
        borderRadius: 5,
      },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#222',
  },
  snake: {
    backgroundColor: '#0f0',
  },
  snakeHead: {
    backgroundColor: '#0ff',
  },
  food: {
    backgroundColor: '#f00',
  },
  dPadContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  dPadRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dPadButton: {
    backgroundColor: '#444',
    padding: 20,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dPadCenter: {
    width: 50,
    height: 50,
  },
  dPadText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowSpacer: {
    height: 20,
  },
  pauseButton: {
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SnakeGame;

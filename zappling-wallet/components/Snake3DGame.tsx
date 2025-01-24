import React, { useEffect, useRef, useState } from 'react';
import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import * as THREE from 'three';
import { Button, View, StyleSheet } from 'react-native';

interface Position {
  x: number;
  y: number;
}

const GRID_SIZE = 10;
const INITIAL_SNAKE: Position[] = [{ x: 0, y: 0 }];
const INITIAL_DIRECTION: Position = { x: 1, y: 0 };

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * GRID_SIZE * 2 - GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE * 2 - GRID_SIZE),
    };
  } while (
    snake.some(
      (segment) => segment.x === newFood.x && segment.y === newFood.y
    )
  );
  return newFood;
};

const Snake3DGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(generateFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState<Position>(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const rendererRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const snakeCubesRef = useRef<THREE.Mesh[]>([]);
  const foodCubeRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number>();

  const moveSnake = () => {
    if (isGameOver || isPaused) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (isCollision(newHead)) {
      setIsGameOver(true);
      alert('Game Over! Tap to restart.');
      resetGame();
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(generateFood(newSnake));
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
    updateCubes(newSnake);
  };

  const isCollision = (head: Position) => {
    return (
      snake.some(
        (segment) => segment.x === head.x && segment.y === head.y
      ) ||
      head.x < -GRID_SIZE ||
      head.x > GRID_SIZE ||
      head.y < -GRID_SIZE ||
      head.y > GRID_SIZE
    );
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setIsGameOver(false);
    setIsPaused(false);
    
    // Limpiar la escena
    if (sceneRef.current) {
      snakeCubesRef.current.forEach(cube => sceneRef.current!.remove(cube));
      snakeCubesRef.current = [];
      if (foodCubeRef.current) {
        sceneRef.current.remove(foodCubeRef.current);
      }
    }
    
    // Recrear cubos iniciales
    if (sceneRef.current) {
      snakeCubesRef.current = INITIAL_SNAKE.map(segment => createCube(segment, 0x00ff00));
      snakeCubesRef.current.forEach(cube => sceneRef.current!.add(cube));
      
      foodCubeRef.current = createCube(generateFood(INITIAL_SNAKE), 0xff0000);
      sceneRef.current.add(foodCubeRef.current);
    }
  };

  const createCube = (position: Position, color: number): THREE.Mesh => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, 0);
    return cube;
  };

  const updateCubes = (currentSnake: Position[]) => {
    // Asegurarse de que tenemos suficientes cubos
    while (snakeCubesRef.current.length < currentSnake.length && sceneRef.current) {
      const newCube = createCube(currentSnake[snakeCubesRef.current.length], 0x00ff00);
      snakeCubesRef.current.push(newCube);
      sceneRef.current.add(newCube);
    }

    // Actualizar posiciones
    currentSnake.forEach((segment, index) => {
      if (snakeCubesRef.current[index]) {
        snakeCubesRef.current[index].position.set(segment.x, segment.y, 0);
      }
    });

    // Remover cubos extras si la serpiente se hizo más corta
    while (snakeCubesRef.current.length > currentSnake.length && sceneRef.current) {
      const cube = snakeCubesRef.current.pop();
      if (cube) {
        sceneRef.current.remove(cube);
      }
    }

    // Actualizar posición de la comida
    if (foodCubeRef.current) {
      foodCubeRef.current.position.set(food.x, food.y, 0);
    }
  };

  const onContextCreate = async (gl: any) => {
    rendererRef.current = new Renderer({ gl });
    rendererRef.current.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    sceneRef.current = new THREE.Scene();

    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    cameraRef.current.position.set(0, -15, 30);
    cameraRef.current.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    sceneRef.current.add(directionalLight);

    // Crear cubos iniciales
    snakeCubesRef.current = snake.map((segment) => createCube(segment, 0x00ff00));
    snakeCubesRef.current.forEach((cube) => sceneRef.current!.add(cube));

    foodCubeRef.current = createCube(food, 0xff0000);
    sceneRef.current.add(foodCubeRef.current);

    const grid = createGridPlane();
    sceneRef.current.add(grid);

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      gl.endFrameEXP();
    };
    animate();
  };

  useEffect(() => {
    if (isGameOver || isPaused) return;
    const interval = setInterval(moveSnake, 300);
    return () => {
      clearInterval(interval);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [snake, direction, isGameOver, isPaused]);

  const createGridPlane = (): THREE.Group => {
    const group = new THREE.Group();
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x444444 });

    for (let i = -GRID_SIZE; i <= GRID_SIZE; i++) {
      const geometryX = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-GRID_SIZE, i, 0),
        new THREE.Vector3(GRID_SIZE, i, 0),
      ]);
      const lineX = new THREE.Line(geometryX, gridMaterial);
      group.add(lineX);

      const geometryY = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(i, -GRID_SIZE, 0),
        new THREE.Vector3(i, GRID_SIZE, 0),
      ]);
      const lineY = new THREE.Line(geometryY, gridMaterial);
      group.add(lineY);
    }

    return group;
  };

  const handleDirectionChange = (newDirection: Position) => {
    // Prevenir movimientos en la dirección opuesta
    if (
      (direction.x !== -newDirection.x || direction.x === 0) &&
      (direction.y !== -newDirection.y || direction.y === 0)
    ) {
      setDirection(newDirection);
    }
  };

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
      <View style={styles.controls}>
        <Button title="↑" onPress={() => handleDirectionChange({ x: 0, y: 1 })} />
        <Button title="↓" onPress={() => handleDirectionChange({ x: 0, y: -1 })} />
        <Button title="←" onPress={() => handleDirectionChange({ x: -1, y: 0 })} />
        <Button title="→" onPress={() => handleDirectionChange({ x: 1, y: 0 })} />
        <Button title={isPaused ? "▶" : "⏸"} onPress={() => setIsPaused(!isPaused)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth:300,
    minHeight:300
  },
  glView: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#333',
  },
});

export default Snake3DGame;

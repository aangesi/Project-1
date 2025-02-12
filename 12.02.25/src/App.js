import React, { useEffect, useRef, useState } from 'react';

const DragAndDropGame = () => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([
    { id: 1, type: 'circle', x: 50, y: 50, radius: 30, isDragging: false },
    { id: 2, type: 'square', x: 200, y: 50, size: 50, isDragging: false },
    { id: 3, type: 'hexagon', x: 350, y: 50, size: 40, isDragging: false },
    { id: 4, type: 'star', x: 500, y: 50, size: 40, isDragging: false },
  ]);
  const [draggedShape, setDraggedShape] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Функция рисования фигур
    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach((shape) => {
        ctx.beginPath();
        switch (shape.type) {
          case 'circle':
            ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'blue';
            ctx.fill();
            break;
          case 'square':
            ctx.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size);
            ctx.fillStyle = 'green';
            ctx.fill();
            break;
          case 'hexagon':
            ctx.moveTo(
              shape.x + shape.size * Math.cos(0),
              shape.y + shape.size * Math.sin(0)
            );
            for (let i = 1; i < 6; i++) {
              ctx.lineTo(
                shape.x + shape.size * Math.cos((i * Math.PI) / 3),
                shape.y + shape.size * Math.sin((i * Math.PI) / 3)
              );
            }
            ctx.closePath();
            ctx.fillStyle = 'purple';
            ctx.fill();
            break;
          case 'star':
            const angle = (2 * Math.PI) / 5;
            const radius = shape.size;
            ctx.moveTo(
              shape.x + radius * Math.cos(-Math.PI / 2),
              shape.y + radius * Math.sin(-Math.PI / 2)
            );
            for (let i = 1; i < 5; i++) {
              ctx.lineTo(
                shape.x + radius * Math.cos(-Math.PI / 2 + i * angle),
                shape.y + radius * Math.sin(-Math.PI / 2 + i * angle)
              );
            }
            ctx.closePath();
            ctx.fillStyle = 'orange';
            ctx.fill();
            break;
          case 'octagon':
            ctx.moveTo(
              shape.x + shape.size * Math.cos(0),
              shape.y + shape.size * Math.sin(0)
            );
            for (let i = 1; i < 8; i++) {
              ctx.lineTo(
                shape.x + shape.size * Math.cos((i * Math.PI) / 4),
                shape.y + shape.size * Math.sin((i * Math.PI) / 4)
              );
            }
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
            break;
          default:
            break;
        }
      });
    };

    // Рисуем фигуры
    drawShapes();
  }, [shapes]);

  // Функция для проверки близости фигур
  const areShapesClose = (shape1, shape2) => {
    const dx = shape1.x - shape2.x;
    const dy = shape1.y - shape2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 60; // Порог близости для слияния
  };

  // Функция для слияния двух фигур в новую
  const mergeShapes = (shape1, shape2) => {
    // Создаем новую фигуру на основе центра двух фигур
    const centerX = (shape1.x + shape2.x) / 2;
    const centerY = (shape1.y + shape2.y) / 2;

    // Новый случайный тип фигуры
    const randomShapeTypes = ['circle', 'square', 'hexagon', 'star', 'octagon'];
    const randomType = randomShapeTypes[Math.floor(Math.random() * randomShapeTypes.length)];

    const newShape = {
      id: Date.now(),
      type: randomType, // Новый случайный тип
      x: centerX,
      y: centerY,
      size: Math.max(shape1.size || shape1.radius, shape2.size || shape2.radius) * 1.5, // Размер увеличен
      isDragging: false,
    };

    // Удаляем старые фигуры и добавляем новую
    setShapes((prevShapes) =>
      prevShapes.filter((shape) => shape.id !== shape1.id && shape.id !== shape2.id).concat(newShape)
    );
  };

  // Обработка начала перетаскивания
  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const shape = shapes.find((shape) => {
      if (shape.type === 'circle') {
        const dx = offsetX - shape.x;
        const dy = offsetY - shape.y;
        return dx * dx + dy * dy <= shape.radius * shape.radius;
      } else if (shape.type === 'square') {
        const dx = Math.abs(offsetX - shape.x);
        const dy = Math.abs(offsetY - shape.y);
        return dx <= shape.size / 2 && dy <= shape.size / 2;
      } else if (shape.type === 'hexagon' || shape.type === 'octagon' || shape.type === 'star') {
        const dx = offsetX - shape.x;
        const dy = offsetY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= shape.size * 1.5; // Rough detection
      }
      return false;
    });

    if (shape) {
      setDraggedShape(shape);
      setStartPos({ x: offsetX - shape.x, y: offsetY - shape.y });
    }
  };

  // Обработка перемещения фигуры
  const handleMouseMove = (e) => {
    if (draggedShape) {
      const { offsetX, offsetY } = e.nativeEvent;
      const newShapes = shapes.map((shape) =>
        shape.id === draggedShape.id
          ? { ...shape, x: offsetX - startPos.x, y: offsetY - startPos.y }
          : shape
      );
      setShapes(newShapes);

      // Проверка на слияние
      newShapes.forEach((shape) => {
        if (shape.id !== draggedShape.id) {
          if (areShapesClose(shape, draggedShape)) {
            mergeShapes(shape, draggedShape);
            setDraggedShape(null); // Останавливаем перетаскивание
          }
        }
      });
    }
  };

  // Обработка завершения перетаскивания
  const handleMouseUp = () => {
    setDraggedShape(null);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

const App = () => (
  <div>
    <h1>Игра с объединением фигур</h1>
    <DragAndDropGame />
  </div>
);

export default App;




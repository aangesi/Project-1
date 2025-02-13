import React, { useEffect, useState, useRef } from 'react';

const ShapeNinja = () => {
  const canvasRef = useRef(null);
  const [shapes, setShapes] = useState([]);

  // Функция для генерации случайного цвета в формате HEX.
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Функция для отрисовки фигуры с учетом её типа и цвета.
    const drawShape = (shape) => {
      ctx.beginPath();
      switch (shape.type) {
        case 'rectangle':
          ctx.rect(
            shape.x - shape.size / 2,
            shape.y - shape.size / 2,
            shape.size,
            shape.size
          );
          break;
        case 'circle':
          ctx.arc(shape.x, shape.y, shape.size / 2, 0, 2 * Math.PI);
          break;
        case 'triangle': {
          const angle = -Math.PI / 2;
          const angleOffset = (2 * Math.PI) / 3;
          const r = shape.size / 2;
          const x1 = shape.x + r * Math.cos(angle);
          const y1 = shape.y + r * Math.sin(angle);
          const x2 = shape.x + r * Math.cos(angle + angleOffset);
          const y2 = shape.y + r * Math.sin(angle + angleOffset);
          const x3 = shape.x + r * Math.cos(angle + 2 * angleOffset);
          const y3 = shape.y + r * Math.sin(angle + 2 * angleOffset);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineTo(x3, y3);
          ctx.closePath();
          break;
        }
        default:
          break;
      }
      ctx.fillStyle = shape.color;
      ctx.fill();
    };

    // Функция обновления позиций фигур и перерисовки канвы.
    const update = () => {
      setShapes((prevShapes) => {
        const newShapes = prevShapes.map((shape) => ({
          ...shape,
          x: shape.x + shape.vx,
          y: shape.y + shape.vy,
        }));
        // Очистка канвы и заливка белым фоном.
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        newShapes.forEach(drawShape);
        return newShapes;
      });
      requestAnimationFrame(update);
    };

    // Функция создания новой фигуры с случайным типом и цветом.
    const spawnShape = () => {
      const types = ['rectangle', 'circle', 'triangle'];
      const type = types[Math.floor(Math.random() * types.length)];
      setShapes((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          type,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 80,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          color: getRandomColor(),
        },
      ]);
    };

    const intervalId = setInterval(spawnShape, 1000);
    update();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Функция проверки попадания курсора в фигуру.
  const hitTest = (shape, mouseX, mouseY) => {
    const half = shape.size / 2;
    if (shape.type === 'circle') {
      const dx = mouseX - shape.x;
      const dy = mouseY - shape.y;
      return dx * dx + dy * dy <= half * half;
    } else {
      return (
        mouseX > shape.x - half &&
        mouseX < shape.x + half &&
        mouseY > shape.y - half &&
        mouseY < shape.y + half
      );
    }
  };

  // При движении мыши проверяем попадание по фигурам и "разрезаем" их, если размер достаточно велик.
  const handleCut = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setShapes((prevShapes) =>
      prevShapes.flatMap((shape) =>
        hitTest(shape, offsetX, offsetY) && shape.size > 20
          ? [
              { ...shape, size: shape.size / 2, x: shape.x - 10 },
              { ...shape, size: shape.size / 2, x: shape.x + 10 },
            ]
          : shape
      )
    );
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseMove={handleCut}
      style={{ background: 'white', border: '1px solid #ccc' }}
    />
  );
};

export default ShapeNinja;
import React, { useState, useEffect } from 'react';

const Game = () => {
  const [squareY, setSquareY] = useState(300);
  const [obstacleX, setObstacleX] = useState(600);
  const [obstacleY, setObstacleY] = useState(300);
  const [obstacleType, setObstacleType] = useState('square');
  const [isFlying, setIsFlying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameOver) return;
    const obstacleInterval = setInterval(() => {
      setObstacleX(prev => (prev > -40 ? prev - 5 : 600));
      if (obstacleX <= -40) {
        const types = ['square', 'circle', 'rectangle'];
        setObstacleType(types[Math.floor(Math.random() * types.length)]);
        setObstacleY(Math.random() > 0.5 ? 100 : 300);
      }
    }, 30);
    return () => clearInterval(obstacleInterval);
  }, [obstacleX, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const gravityInterval = setInterval(() => {
      setSquareY(prev => (isFlying ? Math.max(prev - 5, 100) : Math.min(prev + 5, 300)));
    }, 30);
    return () => clearInterval(gravityInterval);
  }, [isFlying, gameOver]);

  useEffect(() => {
    if (obstacleX < 70 && obstacleX > 50 && Math.abs(squareY - obstacleY) < 40) {
      setGameOver(true);
    }
  }, [obstacleX, squareY, obstacleY]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setIsFlying(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === ' ') {
        setIsFlying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{
      width: '600px', height: '400px', border: '2px solid black', position: 'relative', overflow: 'hidden', background: '#87CEEB'
    }}>
      {!gameOver ? (
        <>
          <div style={{
            width: '70px', height: '70px', background: 'yellow', borderRadius: '50%', position: 'absolute', right: '10px', top: '10px'
          }} />
          <div style={{
            width: '40px', height: '40px', background: 'blue', position: 'absolute', left: '50px', top: `${squareY}px`
          }} />
          <div style={{
            width: obstacleType === 'rectangle' ? '60px' : '50px',
            height: obstacleType === 'circle' ? '50px' : '60px',
            background: 'red',
            borderRadius: obstacleType === 'circle' ? '50%' : '0',
            position: 'absolute', left: `${obstacleX}px`, top: `${obstacleY}px`
          }} />
          <div style={{
            width: '100%', height: '30px', background: 'green', position: 'absolute', bottom: '0'
          }} />
        </>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '180px' }}>
          <h2>Game Over</h2>
          <button onClick={() => { setGameOver(false); setObstacleX(600); setSquareY(300); setObstacleType('square'); setObstacleY(300); }}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Game;

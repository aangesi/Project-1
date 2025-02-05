import React, { useState, useEffect, useMemo } from 'react';

const symbols = ['♥', '♦', '♣', '♠', '★', '☆', '■', '□'];

function MemoryGame() {
  // Дублируем символы, чтобы создать пары
  const shuffledSymbols = useMemo(() => {
    const allSymbols = [...symbols, ...symbols]; // Дублируем для создания пар
    return allSymbols.sort(() => Math.random() - 0.5); // Перемешиваем
  }, []);

  const [cards, setCards] = useState(shuffledSymbols.map((symbol, index) => ({
    id: index,
    symbol,
    isOpen: false,
    isMatched: false,
  })));

  const [openCards, setOpenCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (openCards.length === 2) {
      const [firstCard, secondCard] = openCards;
      if (firstCard.symbol === secondCard.symbol) {
        setCards(prevCards =>
          prevCards.map(card =>
            card.symbol === firstCard.symbol
              ? { ...card, isMatched: true }
              : card
          )
        );
      } else {
        setTimeout(() => {
          setCards(prevCards =>
            prevCards.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, isOpen: false }
                : card
            )
          );
        }, 1000);
      }
      setOpenCards([]);
      setMoves(moves + 1);
    }
  }, [openCards, moves]);

  const handleCardClick = (index) => {
    if (openCards.length < 2 && !cards[index].isOpen && !cards[index].isMatched) {
      setCards(prevCards =>
        prevCards.map((card, i) =>
          i === index ? { ...card, isOpen: true } : card
        )
      );
      setOpenCards(prev => [...prev, cards[index]]);
    }
  };

  const isGameWon = cards.filter(card => card.isMatched).length === symbols.length;

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ color: 'purple' }}>Memory Game</h1>
      <div>
        <h2>Moves: {moves}</h2>
        {isGameWon && <h2 style={{ color: 'green' }}>You Win!</h2>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 100px)', gap: '10px', marginTop: '20px' }}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            style={{
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid purple',
              backgroundColor: card.isOpen || card.isMatched ? 'white' : 'gray',
              fontSize: '24px',
              cursor: 'pointer',
              color: 'purple',
              boxSizing: 'border-box',
            }}
            onClick={() => handleCardClick(index)}
          >
            {card.isOpen || card.isMatched ? card.symbol : ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;

import React, { useState, useEffect } from "react";

function App() {
  const [coins, setCoins] = useState(0);
  const [clickValue, setClickValue] = useState(1);
  const [autoMining, setAutoMining] = useState(0);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const [background, setBackground] = useState([]);

  // Цена улучшений
  const [clickUpgradeCost, setClickUpgradeCost] = useState(10);
  const [autoMiningUpgradeCost, setAutoMiningUpgradeCost] = useState(20);
  const [environmentUpgradeCost, setEnvironmentUpgradeCost] = useState(100);

  // Функция для обновления UI
  useEffect(() => {
    document.title = `Монеты: ${coins}`;
  }, [coins]);

  // Добыча монет по клику
  const handleClick = () => {
    setCoins(coins + clickValue);
  };

  // Улучшение клика
  const improveClick = () => {
    if (coins >= clickUpgradeCost) {
      setCoins(coins - clickUpgradeCost);
      setClickValue(clickValue + 1);
      setClickUpgradeCost(Math.floor(clickUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Улучшение автодобычи
  const improveAutoMining = () => {
    if (coins >= autoMiningUpgradeCost) {
      setCoins(coins - autoMiningUpgradeCost);
      setAutoMining(autoMining + 2);
      setAutoMiningUpgradeCost(Math.floor(autoMiningUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Улучшение окружения
  const improveEnvironment = () => {
    if (coins >= environmentUpgradeCost) {
      setCoins(coins - environmentUpgradeCost);
      setBackground([...background, 'forest']);  // Добавим элемент окружения
      setEnvironmentUpgradeCost(Math.floor(environmentUpgradeCost * 1.5));
    } else {
      alert("Недостаточно монет!");
    }
  };

  // Автодобыча
  useEffect(() => {
    if (autoMining > 0) {
      const interval = setInterval(() => {
        setCoins((prevCoins) => prevCoins + autoMining);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoMining]);

  return (
    <div style={containerStyles}>
      {/* Header */}
      <h1 style={headerStyles}>Кликер с улучшениями</h1>
      
      <div style={statusStyles}>
        <strong>Монеты:</strong> {coins} <br />
        <strong>Автодобыча:</strong> {autoMining} монет/сек
      </div>
      
      {/* Main Mining Button */}
      <div style={buttonContainerStyles}>
        <button
          onClick={handleClick}
          style={miningButtonStyles}
        >
          Добыть монету
        </button>
      </div>

      {/* Upgrade Button */}
      <div style={upgradeButtonContainerStyles}>
        <button
          onClick={() => setShowUpgradeDialog(true)}
          style={upgradeButtonStyles}
        >
          Улучшения
        </button>
      </div>

      {/* Modal for Upgrades */}
      {showUpgradeDialog && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <button onClick={() => setShowUpgradeDialog(false)} style={closeButtonStyles}>Закрыть</button>
            <h2 style={{ color: "#333", fontSize: "28px", marginBottom: "20px" }}>Улучшения</h2>
            <button onClick={improveClick} style={upgradeButtonStyles}>
              Улучшить клик ({clickUpgradeCost} монет)
            </button>
            <button onClick={improveAutoMining} style={upgradeButtonStyles}>
              Улучшить автодобычу ({autoMiningUpgradeCost} монет)
            </button>
            <button onClick={improveEnvironment} style={upgradeButtonStyles}>
              Улучшить окружение ({environmentUpgradeCost} монет)
            </button>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="background" style={backgroundStyles}></div>
    </div>
  );
}

// Container style to center everything
const containerStyles = {
  fontFamily: "Arial, sans-serif",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  height: "100vh",
  background: "#ececec",
  padding: "20px",
  position: "relative",
};

// Header styles
const headerStyles = {
  fontSize: "36px",
  color: "#333",
  marginBottom: "20px",
};

// Status section styles
const statusStyles = {
  fontSize: "18px",
  color: "#555",
  marginBottom: "40px",
};

// Button container styles
const buttonContainerStyles = {
  marginBottom: "30px",
};

// Mining button styles
const miningButtonStyles = {
  padding: "18px 40px",
  fontSize: "24px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

// Upgrade button container styles
const upgradeButtonContainerStyles = {
  marginTop: "20px",
};

// Upgrade button styles
const upgradeButtonStyles = {
  padding: "12px 25px",
  fontSize: "16px",
  backgroundColor: "#ff6200",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

// Modal styles
const modalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.7)",
  zIndex: "9999",
};

const modalContentStyles = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  maxWidth: "400px",
  width: "100%",
};

const closeButtonStyles = {
  backgroundColor: "red",
  color: "white",
  padding: "12px 20px",
  fontSize: "18px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
};

const backgroundStyles = {
  position: "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  background: "url('/forest.background.png') center/cover no-repeat",
  zIndex: -1,
};

export default App;

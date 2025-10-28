import React from "react";
import "./playersStyle.css";

function PlayersData({
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  handleStartGame,
}) {
  const handleNameChange = (e, setPlayer) => {
    const value = e.target.value;
    const validPattern = /^[a-zA-Z0-9\s]*$/;
    if (validPattern.test(value)) {
      setPlayer(value);
    }
  };

  const isDisabled = () => {
    return player1.trim() === "" || player2.trim() === "";
  };

  return (
    <div className="container">
      <h2 className="subtitle">Enter Player Details</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) => handleNameChange(e, setPlayer1)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2}
          onChange={(e) => handleNameChange(e, setPlayer2)}
          className="input"
        />
        <button
          className="start-button"
          onClick={handleStartGame}
          disabled={isDisabled()}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default PlayersData;

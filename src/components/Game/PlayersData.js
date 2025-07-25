import React, { useEffect, useRef, useState } from "react";
import "./playersStyle.css";

function PlayersData({
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  handleStartGame,
}) {
  const isDisabled = () => {
    return player1 === "" || player2 === "";
  };

  return (
    <div className="container">
      <h2 className="subtitle">Enter Player Details</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
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

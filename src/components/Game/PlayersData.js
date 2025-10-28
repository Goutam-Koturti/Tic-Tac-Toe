import React, { useState } from "react";
import "./playersStyle.css";

function PlayersData({
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  handleStartGame,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles player name input with validation
   * Allows only letters, numbers, and spaces
   */
  const handleNameChange = (e, setPlayer) => {
    const value = e.target.value;
    const validPattern = /^[a-zA-Z0-9\s]*$/; // Only letters, numbers, spaces

    if (validPattern.test(value)) {
      setPlayer(value);
      setErrorMessage(""); // clear any prior errors
    } else {
      setErrorMessage("Only letters and numbers are allowed.");
    }
  };

  /**
   * Validation before starting game
   */
  const isStartDisabled = () => {
    if (player1.trim() === "" || player2.trim() === "") return true;
    if (player1.trim().toLowerCase() === player2.trim().toLowerCase())
      return true;
    return false;
  };

  /**
   * Render error if both names are the same
   */
  const renderDuplicateNameError = () => {
    if (
      player1.trim() !== "" &&
      player2.trim() !== "" &&
      player1.trim().toLowerCase() === player2.trim().toLowerCase()
    ) {
      return <p className="error-text">Player names must be different.</p>;
    }
    return null;
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

        {/* Error messages */}
        {errorMessage && <p className="error-text">{errorMessage}</p>}
        {renderDuplicateNameError()}

        <button
          className="start-button"
          onClick={handleStartGame}
          disabled={isStartDisabled()}
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default PlayersData;

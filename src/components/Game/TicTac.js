import { useEffect, useState } from "react";
import "./styles.css";
import {
  renderWishes,
  isRematchDisabled,
  renderWinCount,
  currentSymbol,
  renderStatus,
} from "./helper";

function TicTacToe({ player1, player2, setStartGame }) {
  const [showIntro, setShowIntro] = useState(true);
  const [activePlayer, setActivePlayer] = useState(player1);

  //Randomly decides who will be the first to click
  const [isFirstPlayerClick, setIsFirstPlayerClick] = useState(
    Math.random() < 0.5
  );

  const [winsPlayerOne, setWinsPlayerOne] = useState(0);
  const [winsPlayerTwo, setWinsPlayerTwo] = useState(0);

  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const [winningIndices, setWinningIndices] = useState([]);

  const EMPTY_BOARD = ["", "", "", "", "", "", "", "", ""];
  const [boardState, setBoardState] = useState(EMPTY_BOARD);

  const [moveHistory, setMoveHistory] = useState([]);

  // --- Effects ---

  // Hide the wishes/intro after 2 seconds (exactly same as original behavior)
  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
    }, 2000);
  }, []);

  // Check winning combinations and draw on every boardState update
  useEffect(() => {
    const winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winCombinations) {
      const [a, b, c] = combo;
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[b] === boardState[c]
      ) {
        // Set winner to the currently tracked player name
        setWinner(activePlayer);
        setWinningIndices([a, b, c]);

        // Update scoreboard counts exactly as original
        activePlayer === player1
          ? setWinsPlayerOne((prev) => prev + 1)
          : setWinsPlayerTwo((prev) => prev + 1);

        return;
      }
    }

    // If all cells are filled and no winner -> draw
    if (boardState.every((cell) => cell !== "")) {
      setIsDraw(true);
    }

    // Keep activePlayer in sync with isFirstPlayerClick as original
    isFirstPlayerClick ? setActivePlayer(player1) : setActivePlayer(player2);
  }, [boardState, activePlayer, player1, player2, isFirstPlayerClick]);

  const handleCellClick = (index) => {
    let nextToggle = isFirstPlayerClick;
    setIsFirstPlayerClick(!nextToggle);

    let boardCopy = [...boardState];
    boardCopy[index] = currentSymbol(isFirstPlayerClick);
    setBoardState(boardCopy);

    let historyCopy = moveHistory;
    historyCopy.push(index);
    setMoveHistory(historyCopy);
  };

  const handleBack = () => {
    setStartGame(false);
  };

  const clearFields = () => {
    setShowIntro("");
    setActivePlayer(player1);
    setIsFirstPlayerClick(true);
    setIsDraw(false);
    setWinner("");
    setWinningIndices([]);
    setBoardState(EMPTY_BOARD);
  };

  const handleReset = () => {
    clearFields();
    setWinsPlayerOne(0);
    setWinsPlayerTwo(0);
    setMoveHistory([]);
  };

  const handleReMatch = () => {
    clearFields();
    setMoveHistory([]);
    setIsFirstPlayerClick(Math.random() < 0.5);
  };

  // Main game UI renderer
  const renderGame = () => {
    return (
      <div>
        {renderWinCount(player1, player2, winsPlayerOne, winsPlayerTwo)}
        <div className="statusDiv">
          {renderStatus(winner, isDraw, activePlayer)}
        </div>

        <div className="gameContainer">
          {boardState.map((item, index) => {
            return (
              <button
                key={index}
                className={`playerValueBox ${
                  winningIndices.includes(index) ? "winCells" : ""
                }`}
                onClick={() => handleCellClick(index)}
                disabled={item !== "" || winner}
              >
                <span className={item === "X" ? "xMark" : "oMark"}>{item}</span>
              </button>
            );
          })}
        </div>
        <div className="buttonsContainer">
          <button className="backButton" onClick={handleBack}>
            Back
          </button>
          <button className="resetButton" onClick={handleReset}>
            Reset Game
          </button>
          <button
            className="rematchButton"
            onClick={handleReMatch}
            disabled={isRematchDisabled(isDraw, winner)}
          >
            Re-Match
          </button>
        </div>
      </div>
    );
  };

  // Rendering decision
  return <div>{showIntro ? renderWishes() : renderGame()}</div>;
}

export default TicTacToe;

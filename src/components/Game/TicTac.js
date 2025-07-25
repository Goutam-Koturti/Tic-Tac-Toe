import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

function TicTacToe({ player1, player2, setStartGame }) {
  const [showWishes, setShowWishes] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState(player1);
  const [firstPlayerClick, setFirstPlayerClick] = useState(true);

  const [playerOneWinCount, setPlayerOneWinCount] = useState(0);
  const [playerTwoWinCount, setPlayerTwoWinCount] = useState(0);

  const [isDraw, setIsDraw] = useState(false);
  const [winner, setWinner] = useState("");
  const [winCells, setWinCells] = useState([]);

  let initialGameInfo = ["", "", "", "", "", "", "", "", ""];

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

  const [gameInfo, setGameInfo] = useState(initialGameInfo);
  const [dataForReview, setDataForReview] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setShowWishes(false);
    }, 200000);
  }, []);

  useEffect(() => {
    for (let combo of winCombinations) {
      const [a, b, c] = combo;
      if (
        gameInfo[a] &&
        gameInfo[a] === gameInfo[b] &&
        gameInfo[b] === gameInfo[c]
      ) {
        setWinner(currentPlayer);
        setWinCells([a, b, c]);
        currentPlayer === player1
          ? setPlayerOneWinCount((prev) => prev + 1)
          : setPlayerTwoWinCount((prev) => prev + 1);
      }
    }

    if (gameInfo.every((cell) => cell !== "")) {
      setIsDraw(true);
    }

    getCurrentPlayer();
  }, [gameInfo]);

  const displayWishes = () => {
    return (
      <div className="wishesBox">
        <h2 className="letsBeginText">Let's Begin the game </h2>
        <h2 className="wishes">All the Best !! </h2>
      </div>
    );
  };

  const getValue = () => {
    return firstPlayerClick ? "O" : "X";
  };
  const getCurrentPlayer = () => {
    firstPlayerClick ? setCurrentPlayer(player1) : setCurrentPlayer(player2);
  };

  const handlePlayerclick = (index) => {
    let newPlayer = firstPlayerClick;
    setFirstPlayerClick(!newPlayer);

    let gameInfoCopy = [...gameInfo];
    gameInfoCopy[index] = getValue();
    setGameInfo(gameInfoCopy);

    let dataForReviewCopy = dataForReview;
    dataForReviewCopy.push(index);
    console.log("dataForReviewCopy", dataForReviewCopy);
    setDataForReview(dataForReviewCopy);
  };

  const handleBack = () => {
    setStartGame(false);
  };

  const clearFields = () => {
    setShowWishes("");
    setCurrentPlayer(player1);
    setFirstPlayerClick(true);
    setIsDraw(false);
    setWinner("");
    setWinCells([]);
    setGameInfo(initialGameInfo);
  };

  const handleReset = () => {
    clearFields();
    setPlayerOneWinCount(0);
    setPlayerTwoWinCount(0);
    setDataForReview([]);
  };
  const handleReMatch = () => {
    clearFields();
    setDataForReview([]);
  };
  const handleReview = () => {
    console.log("review");
  };

  const renderStatus = () => {
    if (winner) {
      return (
        <h2 className="winnerText">
          Hurray, Congratulations - {winner} WON !!!
        </h2>
      );
    } else if (isDraw) {
      return <h2 className="drawText">DRAW </h2>;
    } else {
      return <h2>{currentPlayer}'s Turn</h2>;
    }
  };

  const renderWinCount = () => {
    return (
      <div className="winStatusContainer">
        <h3>
          {player1} : {playerOneWinCount}
        </h3>
        <h3>
          {player2} : {playerTwoWinCount}
        </h3>
      </div>
    );
  };

  const setDisabled = () => {
    if (isDraw) {
      return false;
    }
    if (winner) {
      return false;
    }
    return true;
  };

  const displayGame = () => {
    return (
      <div>
        {renderWinCount()}
        <div className="statusDiv">{renderStatus()}</div>

        <div className="gameContainer">
          {gameInfo.map((item, index) => {
            return (
              <button
                key={index}
                className={`playerValueBox ${
                  winCells.includes(index) ? "winCells" : ""
                }`}
                onClick={() => handlePlayerclick(index)}
                disabled={item !== "" || winner}
              >
                {item}
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
            disabled={setDisabled()}
          >
            Re-Match
          </button>
          <button
            className="reviewButton"
            onClick={handleReview}
            disabled={setDisabled()}
          >
            Review Game
          </button>
        </div>
      </div>
    );
  };

  return <div>{showWishes ? displayWishes() : displayGame()}</div>;
}

export default TicTacToe;

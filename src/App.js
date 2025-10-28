import { useState } from "react";
import "./App.css";
import PlayersData from "./components/Game/PlayersData";
import TicTacToe from "./components/Game/TicTac";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleStartGame = () => {
    setStartGame(true);
  };
  return (
    <div className="App">
      <h1 className="title"> Tic Tac Toe</h1>
      {!startGame ? (
        <div className="playersComp">
          <PlayersData
            player1={player1}
            player2={player2}
            setPlayer1={setPlayer1}
            setPlayer2={setPlayer2}
            handleStartGame={handleStartGame}
          />
        </div>
      ) : (
        <div className="ticTacComp">
          <TicTacToe
            player1={player1}
            player2={player2}
            setStartGame={setStartGame}
          />
        </div>
      )}
    </div>
  );
}

export default App;

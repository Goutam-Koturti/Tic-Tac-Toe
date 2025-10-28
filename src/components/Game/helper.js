export const renderWishes = () => {
  return (
    <div className="wishesBox">
      <h2 className="letsBeginText">Let's Begin the Game </h2>
      <h2 className="wishes">All the Best !! </h2>
    </div>
  );
};

// Display-friendly truncation of player name (keeps original logic)
export const getDisplayName = (fullName, requiredLength) => {
  let firstName = fullName.split(" ")[0];
  return firstName.length < requiredLength
    ? firstName
    : `${firstName.substring(0, requiredLength)}...`;
};

// Decide whether rematch button should be disabled (keeps original truth table)
export const isRematchDisabled = (isDraw, winner) => {
  if (isDraw) {
    return false;
  }
  if (winner) {
    return false;
  }
  return true;
};

// Scoreboard render - same markup and classNames
export const renderWinCount = (
  player1,
  player2,
  winsPlayerOne,
  winsPlayerTwo
) => {
  return (
    <>
      <div className="winStatusContainer">
        <h3>{getDisplayName(player1, 10)}</h3>
        <h3>{getDisplayName(player2, 10)}</h3>
      </div>
      <div className="winStatusContainer">
        <h3>{winsPlayerOne}</h3>
        <h3>{winsPlayerTwo}</h3>
      </div>
    </>
  );
};

// Status render block
export const renderStatus = (winner, isDraw, activePlayer) => {
  if (winner) {
    return (
      <h2 className="winnerText">
        Hurray, Congratulations - {getDisplayName(winner, 10)} WON !!!
      </h2>
    );
  } else if (isDraw) {
    return <h2 className="drawText">DRAW </h2>;
  } else {
    return <h2>{getDisplayName(activePlayer, 10)}'s Turn</h2>;
  }
};

// Return symbol used for current click (keeps original mapping)
export const currentSymbol = (isFirstPlayerClick) => {
  return isFirstPlayerClick ? "O" : "X";
};

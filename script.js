"use-strict";

//////////////////// Initial Variables ////////////////////

const gameBoxes = document.querySelectorAll(".grid__el");
const btnNewGame = document.querySelector(".btn__newGame");
const btnSaveName = document.querySelectorAll(".save__name");
const inputNameP1 = document.querySelector(".input__name__player1");
const inputNameP2 = document.querySelector(".input__name__player2");
const namePlayer1 = document.querySelector(".name__player1");
const namePlayer2 = document.querySelector(".name__player2");
const inputFieldP1 = document.querySelector(".input__player1");
const inputFieldP2 = document.querySelector(".input__player2");
const gridArea = document.querySelector(".grid__table");
const endGameModal = document.querySelector(".modal");
const resetGameModal = document.querySelector(".modal2");
const blur = document.querySelector(".overlay");
const movesP1 = document.querySelector(".player1__moves");
const movesP2 = document.querySelector(".player2__moves");
const labelCurScoreP1 = document.querySelector(".player1__cur");
const labelCurScoreP2 = document.querySelector(".player2__cur");
const totalScoreP1 = document.querySelector(".player1__score");
const totalScoreP2 = document.querySelector(".player2__score");
const winnerName = document.querySelector(".winner__name");
const bodyBox = document.querySelector(".body__box");
const title = document.querySelector(".game__name");
const resetGame = document.querySelector(".btn__reset__yes");
const noResetGame = document.querySelector(".btn__reset__no");
let grid = [
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " "],
];
gameBoxes.forEach(function (box) {
  box.style.backgroundColor = "white";
  box.classList.remove("shadowed");
});
let move;
let result;
let color = "Yellow";
let player1moves = 0;
let player2moves = 0;
let currentScoreP1 = 21;
let currentScoreP2 = 21;
let totalScore1 = 0;
let totalScore2 = 0;

const showHideElement = function (el, to) {
  if (to === "show") {
    el.classList.remove("hidden");
    setTimeout(function () {
      el.style.opacity = 1;
    }, 50);
  }
  if (to === "hide") {
    el.style.opacity = 0;
    setTimeout(function () {
      el.classList.add("hidden");
    }, 350);
  }
};

//function to start a new game
const startNewGame = function () {
  if (result === "Yellow") {
    totalScoreP1.textContent = `Total score:${(totalScore1 += currentScoreP1)}`;
  } else if (result === "Red") {
    totalScoreP2.textContent = `Total score:${(totalScore2 += currentScoreP2)}`;
  }
  result = "";
  color = "Yellow";
  showHideElement(blur, "hide");
  showHideElement(endGameModal, "hide");
  grid = [
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " "],
  ];
  gameBoxes.forEach(function (box) {
    box.style.backgroundColor = "white";
    box.classList.remove("shadowed");
  });
  player1moves = 0;
  player2moves = 0;
  movesP1.textContent = `Moves: ${player1moves}`;
  movesP2.textContent = `Moves: ${player2moves}`;
  currentScoreP1 = 21;
  currentScoreP2 = 21;
  labelCurScoreP1.textContent = `Current Score: ${currentScoreP1}`;
  labelCurScoreP2.textContent = `Current Score: ${currentScoreP2}`;
};

///////////// Enter n Save Player's Names /////////////////
btnSaveName.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.classList.contains("player1") && inputNameP1.value !== "") {
      saveName1();
    } else if (inputNameP2.value !== "") {
      saveName2();
    }
  });
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (document.activeElement === inputNameP1 && inputNameP1.value !== "") {
      saveName1();
    } else if (inputNameP2.value !== "") {
      saveName2();
    }
  }
});

///////////// One move by a player /////////////////
gridArea.addEventListener("click", function (e) {
  e.preventDefault();
  //Identify the column, where we shall add the color
  const column = e.target.id;
  //Find out, what box in the column can be filled with the color
  let i = 1;
  while (
    i < 7 &&
    document.querySelector(`.box_${column}_${i}`).style.backgroundColor !==
      "white"
  ) {
    i++;
  }
  // If the column is full, ask to choose another column
  if (i === 7) {
    console.log("This column is full! Choose another column");
  } else {
    // Add the color to the UI
    document.querySelector(
      `.box_${column}_${i}`
    ).style.backgroundColor = `${color}`;
    document.querySelector(`.box_${column}_${i}`).classList.add("shadowed");
    // Moves record
    if (color === "Yellow") {
      player1moves += 1;
      movesP1.textContent = `Moves: ${player1moves}`;
      currentScoreP1 -= 1;
      labelCurScoreP1.textContent = `Current Score: ${currentScoreP1}`;
    } else {
      player2moves += 1;
      movesP2.textContent = `Moves: ${player2moves}`;
      currentScoreP2 -= 1;
      labelCurScoreP2.textContent = `Current Score: ${currentScoreP2}`;
    }

    movesP2.textContent = `Moves: ${player2moves}`;
    // Add the color to JS Array
    move = `${column}_${color}`.split("_");
    whoIsWinner(move);
    // Check the result and give turn to another player
    if (result === "Draw") {
      color === "Yellow" ? (color = "Red") : (color = "Yellow");
      // Announce the result and hide the grid, if there is a winner
    } else if (result !== "Draw") {
      winnerName.textContent = `${
        result === "Yellow"
          ? `${namePlayer1.textContent} is the winner!`
          : `${namePlayer2.textContent} is the winner!`
      }`;
      console.log(`The Winner is ${result}`);
      showHideElement(blur, "show");
      showHideElement(endGameModal, "show");
    }
  }
});

//Start the new game / Cancel gameReset
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape" && !blur.classList.contains("hidden")) {
    startNewGame();
  }
  if (e.key === "Escape" && !resetGameModal.classList.contains("hidden")) {
    // resetGameModal.classList.add("hidden");
    showHideElement(resetGameModal, "hide");
  }
});
btnNewGame.addEventListener("click", function (e) {
  e.preventDefault;
  startNewGame();
});

// //Reset the Game / Cancel gameReset
// title.addEventListener("click", function () {
//   // blur.classList.remove("hidden");
//   // resetGameModal.classList.remove("hidden");
//   showHideElement(blur, "show");
//   showHideElement(resetGameModal, "show");
// });
// resetGame.addEventListener("click", function () {
//   location.reload();
// });

// noResetGame.addEventListener("click", function () {
//   // resetGameModal.classList.add("hidden");
//   showHideElement(resetGameModal, "hide");
//   // blur.classList.add("hidden");
//   showHideElement(blur, "hide");
// });
/////////////////////// Game Mechanics //////////////////////
function whoIsWinner(move) {
  const moveMec = function (gr, move) {
    let j = 0;
    while (grid[gr][j] !== " ") {
      j++;
    }
    grid[gr][j] = move[1].slice(0, 1);
    return j;
  };

  const checkHorizontal = (grid, x, a) => {
    let arr = [];
    for (let i = 0; i <= 6; i++) {
      arr.push(grid[i][a]);
    }
    return arr.join("").includes(grid[x][a].repeat(4)) ? grid[x][a] : false;
  };

  const checkVertical = (grid, x, a) => {
    return (
      grid[x][a] === grid[x][a - 1] &&
      grid[x][a] === grid[x][a - 2] &&
      grid[x][a] === grid[x][a - 3] &&
      grid[x][a]
    );
  };

  const checkDiagonal = (grid, x, a) => {
    let arr = [];

    let j = x >= a ? 0 : Math.abs(x - a);
    for (let i = x >= a ? Math.abs(x - a) : 0; i <= 6; i++) {
      if (grid[i] && grid[i][j] !== undefined) arr.push(grid[i][j]);
      j++;
    }
    return arr.join("").includes(grid[x][a].repeat(4)) ? grid[x][a] : false;
  };

  const checkDiagonal1 = (grid, x, a) => {
    let arr = [];
    let j = a + x > 6 ? 6 : a + x;
    for (let i = a - (6 - x) > 0 ? a - (6 - x) : 0; i < 5; i++) {
      if (grid[j] && grid[j][i] !== undefined) arr.push(grid[j][i]);
      j--;
    }
    return arr.join("").includes(grid[x][a].repeat(4)) ? grid[x][a] : false;
  };

  function moveCheck() {
    temp = checkHorizontal(grid, x, a);
    if (temp) winner = temp;
    if (a >= 3) {
      temp = checkVertical(grid, x, a);
      if (temp) winner = temp;
    }
    temp = checkDiagonal(grid, x, a);
    if (temp) winner = temp;
    temp = checkDiagonal1(grid, x, a);
    if (temp) winner = temp;
  }

  let temp;
  let winner;
  let x;
  let a = 0;
  switch (move[0]) {
    case "A":
      x = 0;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "B":
      x = 1;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "C":
      x = 2;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "D":
      x = 3;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "E":
      x = 4;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "F":
      x = 5;
      a = moveMec(x, move);
      moveCheck();
      break;
    case "G":
      x = 6;
      a = moveMec(x, move);
      moveCheck();
      break;
  }
  if (winner === "Y") {
    return (result = "Yellow");
  } else if (winner === "R") {
    return (result = "Red");
  } else return (result = "Draw");
}

function saveName1() {
  namePlayer1.textContent = `${inputNameP1.value.toUpperCase()}`;
  inputNameP1.value = "";
  inputFieldP1.classList.add("hidden1");
  if (namePlayer2.textContent !== "Name") {
    //  blur.classList.add("hidden");
    showHideElement(blur, "hide");
    document.querySelector(".instructions").classList.add("hidden");
  }
}

function saveName2() {
  namePlayer2.textContent = `${inputNameP2.value.toUpperCase()}`;
  inputNameP2.value = "";
  inputFieldP2.classList.add("hidden1");
  if (namePlayer1.textContent !== "Name") {
    // blur.classList.add("hidden");
    showHideElement(blur, "hide");
    document.querySelector(".instructions").classList.add("hidden");
  }
}

// CHANGING COLORS OF THE GRID SHADOW
// function randomShadow() {
//   const randomInt = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1) + min);

//   setInterval(function () {
//     const top = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(
//       0,
//       255
//     )})`;
//     gridArea.style.boxShadow = `0px 0px 20px ${top}`;
//   }, 750);
// }
// randomShadow();

"use-strict";

//////////////////// Initial Variables and Parameters ////////////////////
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
const modalMessage = document.querySelector(".modal-message");
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

/**
 * supporting function that hides/shows elements (вспомогательная функция для отображения/скрытия элементов)
 * @param {DOM-element, string}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
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

/**
 * save the earned points and make variables return to default parameters to start a new round (сохраняет заработанные очки и возвращает изначальные значения переменных чтобы начать новый раунд)
 * @param {}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
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

/**
 * these two functions save players' names (две функции ниже сохраняют имена игроков)
 * @param {DOM-element}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
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

/**
 * processes the player's move (обрабатывает ход игрока)
 * @param {event object}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
gridArea.addEventListener("click", function (e) {
  e.preventDefault();
  // identify the column and the row, where the move has been done (определяет место, куда был сделан ход)
  const column = e.target.id;
  let i = 1;
  while (
    i < 7 &&
    document.querySelector(`.box_${column}_${i}`).style.backgroundColor !==
      "white"
  ) {
    i++;
  }
  // If the column is full, ask to choose another column (если колонка уже заполнена, показывает предупреждение игроку)
  if (i === 7) {
    modalMessage.style.opacity = 1;
    setTimeout(() => {
      modalMessage.style.opacity = 0;
    }, 2000);
  } else {
    // Adds the color to the UI (добавленный цвет отображается для игрока)
    document.querySelector(
      `.box_${column}_${i}`
    ).style.backgroundColor = `${color}`;
    document.querySelector(`.box_${column}_${i}`).classList.add("shadowed");
    // Moves record (сохраняет ход в UI)
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
    // adds the color to Array to check the result (добавляет ход в массив для проверки результата хода)
    move = `${column}_${color}`.split("_");
    whoIsWinner(move);
    // checks the result and give turn to another player (проверяет результат и передает ход другому игроку)
    if (result === "Draw") {
      color === "Yellow" ? (color = "Red") : (color = "Yellow");
      // Announce the result and hide the grid, if there is a winner
    } else if (result !== "Draw") {
      winnerName.textContent = `${
        result === "Yellow"
          ? `${namePlayer1.textContent} is the winner!`
          : `${namePlayer2.textContent} is the winner!`
      }`;
      // announces the winner (Анонсирует победителя)
      showHideElement(blur, "show");
      showHideElement(endGameModal, "show");
    }
  }
});

// adding event listeners (добавляет приемники событий)
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape" && !blur.classList.contains("hidden")) {
    startNewGame();
  }
});
btnNewGame.addEventListener("click", function (e) {
  e.preventDefault;
  startNewGame();
});

/**
 * checks the results of the move through the algorithm (проверяет ход игрока с помощью алгоритма)
 * @param {array}
 * @returns {string}
 * @author Dmitriy Vnuchkov
 */
function whoIsWinner(move) {
  // supporting function that etrieves move data and formats it for the algorithm (вспомогательная функция, которая обрабатыват и реформатирует информацию о ходе игрока)
  const moveMec = function (gr, move) {
    let j = 0;
    while (grid[gr][j] !== " ") {
      j++;
    }
    grid[gr][j] = move[1].slice(0, 1);
    return j;
  };

  // four supporting functions for the algorithm (четыре вспомогательные функции для алгоритма)
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

  // supporting function that checks the move through all axes to determine if it was a winning move (вспомогательная функция которая проверяет ход по всем направлениям с помощью алгоритма, чтобы выяснить, был ли ход результативным)
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
  // triggers move check depending on the player's move (запускает проверку хода в зависимости от хода игрока)
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

/**
 * saves the player's name (сохраняет имя игрока)
 * @param {}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
function saveName1() {
  namePlayer1.textContent = `${inputNameP1.value.toUpperCase()}`;
  inputNameP1.value = "";
  inputFieldP1.classList.add("hidden1");
  if (namePlayer2.textContent !== "Name") {
    showHideElement(blur, "hide");
    document.querySelector(".instructions").classList.add("hidden");
  }
}

/**
 * saves the player's name (сохраняет имя игрока)
 * @param {}
 * @returns {undefined}
 * @author Dmitriy Vnuchkov
 */
function saveName2() {
  namePlayer2.textContent = `${inputNameP2.value.toUpperCase()}`;
  inputNameP2.value = "";
  inputFieldP2.classList.add("hidden1");
  if (namePlayer1.textContent !== "Name") {
    showHideElement(blur, "hide");
    document.querySelector(".instructions").classList.add("hidden");
  }
}

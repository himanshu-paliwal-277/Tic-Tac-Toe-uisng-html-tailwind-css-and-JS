let buttons = document.querySelectorAll(".buttons");
let Reset_button = document.getElementById("Reset_button");
let newGame_button = document.getElementById("newGame_button");
let congratulations_window = document.getElementById("congratulations_window");
let showing_which_player_turn = document.getElementById(
  "showing_which_player_turn"
);
let easy_level_button = document.getElementById("easy_level_button");
let advance_level_button = document.getElementById("advance_level_button");

let disable_div = document.getElementById("disable_div");
let click_sound = new Audio("./Assets/click-button-sound.wav");
let button_click_sound = new Audio("./Assets/click-button-sound-3.wav");
let congratulations_sound = new Audio("./Assets/congratulations-deep-voice.mp3");

// Play mode
let player_1_button = document.getElementById("player_1_button");
let player_2_button = document.getElementById("player_2_button");
let start_window = document.getElementById("start_window");

let player_turn = "X";
let computer_mode = false;
let already_win = false;
let plater_1_click_in_computer_mode = "X";

// Game Level:
let advance_level = false;

buttons.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.innerHTML === "") {
      if (computer_mode) {
        click_sound.play();
        element.innerText = plater_1_click_in_computer_mode;
        plater_1_click_in_computer_mode = "";
        setTimeout(() => {
          plater_1_click_in_computer_mode = "X";
        }, 400);
        change_player_turn();
        showing_which_player_turn.innerText = `${player_turn}`;
        check_winner();

        if (already_win === false) {
          // Logic for playing with computer
          if (showing_which_player_turn.innerText === "O") {
            computer_move();
          }
          setTimeout(() => {
            check_winner();
          }, 400);
        }
      } else {
        click_sound.play();
        element.innerText = player_turn;
        change_player_turn();
        check_winner();
        showing_which_player_turn.innerText = `${player_turn}`;
      }
    }
  });
});

// change player turn
function change_player_turn() {
  if (player_turn === "X") {
    player_turn = "O";
  } else {
    player_turn = "X";
  }
}

// Function to checking for winner
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function check_winner() {
  board = [
    [buttons[0].innerText, buttons[1].innerText, buttons[2].innerText],
    [buttons[3].innerText, buttons[4].innerText, buttons[5].innerText],
    [buttons[6].innerText, buttons[7].innerText, buttons[8].innerText],
  ];

  // checking for winner
  for (let i = 0; i <= 2; i++) {
    // checking in rows
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      disable_div.classList.remove("hidden");
      let horizontal_line = document.querySelector(".horizontal_line");
      if (i === 0) {
        horizontal_line.style.top = "52px";
      } else if (i === 1) {
        horizontal_line.style.top = "165px";
      } else if (i === 2) {
        horizontal_line.style.top = "278px";
      }
      setTimeout(() => {
        horizontal_line.style.width = "80%";
      }, 400);
      winner(board[i][0]);
    }
    // checking in columns
    else if (
      board[0][i] !== "" &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    ) {
      disable_div.classList.remove("hidden");
      let vertical_line = document.querySelector(".vertical_line");
      if (i === 0) {
        vertical_line.style.left = "52px";
      } else if (i === 1) {
        vertical_line.style.left = "165px";
      } else if (i === 2) {
        vertical_line.style.left = "278px";
      }
      setTimeout(() => {
        vertical_line.style.height = "80%";
      }, 400);
      winner(board[0][i]);
    }
  }
  // checking in diagonal
  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    disable_div.classList.remove("hidden");
    let diagonal_line_one = document.querySelector(".diagonal_line_one");
    setTimeout(() => {
      diagonal_line_one.style.height = "100%";
    }, 400);
    winner(board[0][0]);
  } else if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    disable_div.classList.remove("hidden");
    let diagonal_line_two = document.querySelector(".diagonal_line_two");
    setTimeout(() => {
      diagonal_line_two.style.height = "100%";
    }, 400);
    winner(board[0][2]);
  }
}

// reset function
function reset() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = "";
    }
  }
  buttons.forEach((element) => {
    element.innerText = "";
  });
  player_turn = "X";
  showing_which_player_turn.innerText = `${player_turn}`;
  document.querySelector(".horizontal_line").style.width = "0%";
  document.querySelector(".vertical_line").style.height = "0%";
  document.querySelector(".diagonal_line_one").style.height = "0%";
  document.querySelector(".diagonal_line_two").style.height = "0%";
  already_win = false;
}

// reset button
Reset_button.addEventListener("click", reset);

Reset_button.addEventListener("click", () => {
  button_click_sound.play();
});

// newGame_button button
newGame_button.addEventListener("click", () => {
  congratulations_window.classList.add("hidden");
  reset();
  disable_div.classList.add("hidden");
  button_click_sound.play();
});

// winner function (this function execute when player win)
function winner(player) {
  let winner_player = document.getElementById("winner_player");
  winner_player.innerText = player;
  setTimeout(() => {
    congratulations_window.classList.remove("hidden");
  }, 1200);
  already_win = true;
  if(computer_mode === true && player === "X"){
    congratulations_sound.play();
  }
  else if(computer_mode === false){
    congratulations_sound.play();
  }
}

// Logic if player 1 button is clicked
player_1_button.addEventListener("click", () => {
  start_window.style.height = `0vh`;
  document.querySelector(".start_window_div").classList.add("hidden");
  computer_mode = true;
  easy_level_button.classList.remove("hidden");
  advance_level_button.classList.remove("hidden");
  reset();
  button_click_sound.play();
});

// Logic if player 2 button is clicked
player_2_button.addEventListener("click", () => {
  start_window.style.height = `0vh`;
  document.querySelector(".start_window_div").classList.add("hidden");
  easy_level_button.classList.add("hidden");
  advance_level_button.classList.add("hidden");
  reset();
  computer_mode = false;
  button_click_sound.play();
});

// Function which automatic play moves (play with computer mode)
function computer_move() {
  let move = Math.floor(Math.random() * 9);
  // console.log("Move = ",move);
  if (advance_level) {
    advance_level_move();
  } else if (buttons[move].innerText === "") {
    setTimeout(() => {
      buttons[move].innerText = "O";
      player_turn = "X";
      showing_which_player_turn.innerText = `${player_turn}`;
    }, 400);
  } else {
    let is_atleast_one_empty = false;
    buttons.forEach((element) => {
      if (element.innerText === "") {
        is_atleast_one_empty = true;
      }
    });
    if (is_atleast_one_empty) {
      while (buttons[move].innerText !== "") {
        move = Math.floor(Math.random() * 9);
      }
      // console.log("Move regenerate = ",move);
      setTimeout(() => {
        buttons[move].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
    }
  }
}

// Game levels logic
// easy level button click logic
easy_level_button.addEventListener("click", () => {
  easy_level_button.classList.remove("bg-blue-600");
  easy_level_button.classList.add("bg-green-600");
  advance_level_button.classList.add("bg-blue-600");
  advance_level_button.classList.remove("bg-red-600");
  advance_level = false;
  reset();
  button_click_sound.play();
});

// advance level button click logic
advance_level_button.addEventListener("click", () => {
  advance_level_button.classList.remove("bg-blue-600");
  advance_level_button.classList.add("bg-red-600");
  easy_level_button.classList.add("bg-blue-600");
  easy_level_button.classList.remove("bg-green-600");
  advance_level = true;
  reset();
  button_click_sound.play();
});

// advance level logic
function advance_level_move() {
  let move = Math.floor(Math.random() * 9);
  let j = 0;
  for (let i = 0; i < 9; i += 3) {
    // For Row
    if (
      buttons[i].innerText === "X" &&
      buttons[i + 1].innerText === "X" &&
      buttons[i + 2].innerText === ""
    ) {
      setTimeout(() => {
        buttons[i + 2].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Row
    else if (
      buttons[i].innerText === "X" &&
      buttons[i + 1].innerText === "" &&
      buttons[i + 2].innerText === "X"
    ) {
      setTimeout(() => {
        buttons[i + 1].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Row
    else if (
      buttons[i].innerText === "" &&
      buttons[i + 1].innerText === "X" &&
      buttons[i + 2].innerText === "X"
    ) {
      setTimeout(() => {
        buttons[i].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Column
    else if (
      buttons[j].innerText === "X" &&
      buttons[j + 3].innerText === "X" &&
      buttons[j + 6].innerText === ""
    ) {
      setTimeout(() => {
        buttons[j + 6].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Column
    else if (
      buttons[j].innerText === "X" &&
      buttons[j + 3].innerText === "" &&
      buttons[j + 6].innerText === "X"
    ) {
      setTimeout(() => {
        buttons[j + 3].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Column
    else if (
      buttons[j].innerText === "" &&
      buttons[j + 3].innerText === "X" &&
      buttons[j + 6].innerText === "X"
    ) {
      setTimeout(() => {
        buttons[j].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
      return;
    }
    // For Diagonal 1
    else if (i === 0) {
      if (
        buttons[i].innerText === "X" &&
        buttons[i + 4].innerText === "X" &&
        buttons[i + 8].innerText === ""
      ) {
        setTimeout(() => {
          buttons[i + 8].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      } else if (
        buttons[i].innerText === "X" &&
        buttons[i + 4].innerText === "" &&
        buttons[i + 8].innerText === "X"
      ) {
        setTimeout(() => {
          buttons[i + 4].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      } else if (
        buttons[i].innerText === "" &&
        buttons[i + 4].innerText === "X" &&
        buttons[i + 8].innerText === "X"
      ) {
        setTimeout(() => {
          buttons[i].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      }
    }
    // For Diagonal 2
    else if (j === 2) {
      if (
        buttons[j].innerText === "" &&
        buttons[j + 2].innerText === "X" &&
        buttons[j + 4].innerText === "X"
      ) {
        setTimeout(() => {
          buttons[j].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      } else if (
        buttons[j].innerText === "X" &&
        buttons[j + 2].innerText === "X" &&
        buttons[j + 4].innerText === ""
      ) {
        setTimeout(() => {
          // alert()
          buttons[j + 4].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      } else if (
        buttons[j].innerText === "X" &&
        buttons[j + 2].innerText === "" &&
        buttons[j + 4].innerText === "X"
      ) {
        setTimeout(() => {
          buttons[j + 2].innerText = "O";
          player_turn = "X";
          showing_which_player_turn.innerText = `${player_turn}`;
        }, 400);
        return;
      }
    }
    j++;
  }
  if (buttons[move].innerText === "") {
    setTimeout(() => {
      buttons[move].innerText = "O";
      player_turn = "X";
      showing_which_player_turn.innerText = `${player_turn}`;
    }, 400);
  } else {
    let is_atleast_one_empty = false;
    buttons.forEach((element) => {
      if (element.innerText === "") {
        is_atleast_one_empty = true;
      }
    });
    if (is_atleast_one_empty) {
      while (buttons[move].innerText !== "") {
        move = Math.floor(Math.random() * 9);
      }
      // console.log("Move regenerate = ",move);
      setTimeout(() => {
        buttons[move].innerText = "O";
        player_turn = "X";
        showing_which_player_turn.innerText = `${player_turn}`;
      }, 400);
    }
  }
}

// Exit button logic
let exit_button = document.getElementById("exit_button");

exit_button.addEventListener("click", () => {
  start_window.style.height = "100vh";
  congratulations_window.classList.add("hidden");
  setTimeout(() => {
    document.querySelector(".start_window_div").classList.remove("hidden");
  }, 400);
  disable_div.classList.add("hidden");
  button_click_sound.play();
});

let buttons = document.querySelectorAll(".buttons");
let Reset_button = document.getElementById("Reset_button");
let newGame_button = document.getElementById("newGame_button");
let congratulations_window = document.getElementById("congratulations_window");
let showing_which_player_turn = document.getElementById("showing_which_player_turn");
let disable_div = document.getElementById("disable_div");
let click_sound = new Audio("./Assets/click-button.mp3");

let player_turn = "X";

buttons.forEach((element) => {
    element.addEventListener("click", () => {
        if(element.innerHTML === ""){
            click_sound.play();
            element.innerText = player_turn;
            change_player_turn();
            check_winner();
            showing_which_player_turn.innerText = `${player_turn}`;
        }
    })
})

// change player turn
function change_player_turn(){
    if(player_turn === "X") {
        player_turn = "0";
    }
    else {
        player_turn = "X";
    }
}

// Function to checking for winner
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]

function check_winner() {
    board = [
        [buttons[0].innerText, buttons[1].innerText, buttons[2].innerText],
        [buttons[3].innerText, buttons[4].innerText, buttons[5].innerText],
        [buttons[6].innerText, buttons[7].innerText, buttons[8].innerText],
    ]
    
    // checking for winner
    for(let i = 0; i <= 2; i++){
        // checking in rows
        if( board[i][0] !== "" && board[i][0] === board[i][1] && board[i][1]  === board[i][2]){
            disable_div.classList.remove("hidden");
            let horizontal_line = document.querySelector(".horizontal_line");
            if(i === 0){
                horizontal_line.style.top = "52px";
            }
            else if(i === 1){
                horizontal_line.style.top = "165px";
            }
            else if(i === 2){
                horizontal_line.style.top = "278px";
            }
            setTimeout(() => {
                horizontal_line.style.width = "80%";
            }, 500);
            winner(board[i][0]);
        }
        // checking in columns
        else if(board[0][i] !== "" && board[0][i] === board[1][i] && board[1][i] === board[2][i]){
            disable_div.classList.remove("hidden");
            let vertical_line = document.querySelector(".vertical_line");
            if(i === 0){
                vertical_line.style.left = "52px";
            }
            else if(i === 1){
                vertical_line.style.left = "165px";
            }
            else if(i === 2){
                vertical_line.style.left = "278px";
            }
            setTimeout(() => {
                vertical_line.style.height = "80%";
            }, 500);
            winner(board[0][i]);
        }
    }
    // checking in diagonal
    if(board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]){
        disable_div.classList.remove("hidden");
        let diagonal_line_one = document.querySelector(".diagonal_line_one");
        setTimeout(() => {
            diagonal_line_one.style.height = "100%";
        }, 500);
        winner(board[0][0]);
    }
    else if(board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]){
        disable_div.classList.remove("hidden");
        let diagonal_line_two = document.querySelector(".diagonal_line_two");
        setTimeout(() => {
            diagonal_line_two.style.height = "100%";
        }, 500);
        winner(board[0][2]);
    }
    
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
}

// reset function
function reset() {
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            board[i][j] = "";
        }
    }
    buttons.forEach(element => {
        element.innerText = "";
    });
    player_turn = "X";
    showing_which_player_turn.innerText = `${player_turn}`;
    document.querySelector(".horizontal_line").style.width = "0%";
    document.querySelector(".vertical_line").style.height = "0%";
    document.querySelector(".diagonal_line_one").style.height = "0%";
    document.querySelector(".diagonal_line_two").style.height = "0%";
}

// reset button
Reset_button.addEventListener("click", reset)

// newGame_button button
newGame_button.addEventListener("click", () => {
    congratulations_window.classList.add("hidden");
    reset();
    disable_div.classList.add("hidden");
})

// winner function
function winner(player) {
    let winner_player = document.getElementById("winner_player");
    winner_player.innerText = player;
    setTimeout(() => {
        congratulations_window.classList.remove("hidden");
    }, 1200);
}
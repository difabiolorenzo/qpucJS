function FINALE_selectHand(player_id) {
    game.hand_player = player_id
    document.getElementById("finale_hand_player_0").style.display = "block";
    document.getElementById("finale_hand_player_1").style.display = "block";
    document.getElementById("finale_start").style.display = "block";

    playsound("passage_de_main");

    if (player_id == "player_0") {
        document.getElementById("finale_cell_4").className = "finale_cell finale_cell_left";
        document.getElementById("finale_cell_3").className = "finale_cell finale_cell_right";
        document.getElementById("finale_cell_2").className = "finale_cell finale_cell_left";
        document.getElementById("finale_cell_1").className = "finale_cell finale_cell_right";
    } else {
        document.getElementById("finale_cell_4").className = "finale_cell finale_cell_right";
        document.getElementById("finale_cell_3").className = "finale_cell finale_cell_left";
        document.getElementById("finale_cell_2").className = "finale_cell finale_cell_right";
        document.getElementById("finale_cell_1").className = "finale_cell finale_cell_left";
    }
}

function FINALE_start() {
    document.getElementById("finale_start").style.display = "none";
    document.getElementById("finale_hand_player_0").style.display = "none";
    document.getElementById("finale_hand_player_1").style.display = "none";
    document.getElementById("finale_player_0").style.display = "block";
    document.getElementById("finale_player_1").style.display = "block";
    document.getElementById("finale_correct_answer").style.display = "block";
    document.getElementById("finale_wrong_answer").style.display = "block";
    document.getElementById("finale_start_timer").style.display = "block";
}

function FINALE_nextQuestion() {

}

function FINALE_reset() {
    document.getElementById("finale_start").style.display = "none";
    document.getElementById("finale_hand_player_0").style.display = "block";
    document.getElementById("finale_hand_player_1").style.display = "block";
    document.getElementById("finale_player_0").style.display = "none";
    document.getElementById("finale_player_1").style.display = "none";
    document.getElementById("finale_correct_answer").style.display = "none";
    document.getElementById("finale_wrong_answer").style.display = "none";
    document.getElementById("finale_start_timer").style.display = "none";
    
    document.getElementById("finale_cell_4").className = "finale_cell";
    document.getElementById("finale_cell_3").className = "finale_cell";
    document.getElementById("finale_cell_2").className = "finale_cell";
    document.getElementById("finale_cell_1").className = "finale_cell";

    document.getElementById("finale_player_0").innerHTML = "0";
    document.getElementById("finale_player_1").innerHTML = "0";

    game.hand_player = "";
    game.selected_player = "";
    game.player_0_points = 0;
    game.player_1_points = 0;


    


}






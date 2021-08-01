function FOUR_start() {
    document.getElementById("four_in_a_raw_start").style.display = "none"
    document.getElementById("four_in_a_raw_correct_answer").style.display = "block"
    document.getElementById("four_in_a_raw_wrong_answer").style.display = "block"

    var html_selected_cell = document.getElementById("four_in_a_raw_cell_0");
    html_selected_cell.className = "four_in_a_raw_cell selected";
    game.four_in_a_raw.game_state = "started";
    FOUR_timer()
}

function FOUR_validateAnswer() {
    var state = game.four_in_a_raw.state + 1;
    if (state < 5) {
        var html_selected_cell = document.getElementById("four_in_a_raw_cell_" + state);
        html_selected_cell.className = "four_in_a_raw_cell selected";
    }

    if (state > 0 && state <= 5) {
        var previous_cell = document.getElementById("four_in_a_raw_cell_" + (state - 1));
        previous_cell.className = "four_in_a_raw_cell passed";
    }

    game.four_in_a_raw.state++;
    game.four_in_a_raw.record_state = game.four_in_a_raw.state;
    playsound("points")

    if (game.four_in_a_raw.state == 5) {
        FOUR_stopTimer();
        playsound("qualif");
    }
}

function FOUR_addPlayer(qualifier, player_name) {
    var html = document.getElementById("four_in_a_raw_players_score_placeolder")

    var player_amount = html.children.length;
    var player_id = "four_in_a_raw_player_" + player_amount;
    var class_qualifier = "";
    game.player_list.push(player_id);
    game.four_in_a_raw.player_points.push(0);

    if (player_name == undefined) {
        player_name = "Joueur " + (player_amount + 1);
    }

    if (game.four_in_a_raw.game_state == "waiting") {
        class_qualifier = "players_score disabled";
    } else if (game.four_in_a_raw.game_state == "started") {
        class_qualifier = "players_score idle";
    }

    var player_name_html = "<input type=\"text\" class=\"player_name no_margin\" value=\"" + player_name + "\" class=\"no_margin\"></input>";
    var player_score_html = "<p class=\"players_score no_margin\" class=\"no_margin\">0</p>";
    var player_score_div_html = "<div id=\"" + player_id + "\" class=\"" + class_qualifier + "\" onclick=\"NINE_selectPlayer(this.id, true)\">" + player_name_html + player_score_html + "</div>";

    html.innerHTML += player_score_div_html;
}

function FOUR_wrongAnswer() {
    //passed all passed cell
    var state = game.four_in_a_raw.state;
    for (var i = 0; i < state + 1; i++) {
        var html_cell = document.getElementById("four_in_a_raw_cell_" + i);
        html_cell.className = "four_in_a_raw_cell passed";
    }

    game.four_in_a_raw.state = 0;
    state = 0
    document.getElementById("four_in_a_raw_cell_0").className = "four_in_a_raw_cell selected";

    // playsound("wrong_answer")
}

function FOUR_reset() {
    //reset buttons
    document.getElementById("four_in_a_raw_start").style.display = "block"
    document.getElementById("four_in_a_raw_correct_answer").style.display = "none"
    document.getElementById("four_in_a_raw_wrong_answer").style.display = "none"

    //reinit scores
    game.four_in_a_raw.state = 0;
    game.four_in_a_raw.record_state = 0;

    //reinit all cell
    for (var i = 0; i < 5; i++) {
        var html_cell = document.getElementById("four_in_a_raw_cell_" + i);
        html_cell.className = "four_in_a_raw_cell"
    }

    //reinit timer
    game.four_in_a_raw.timer = 40;
    document.getElementById("four_in_a_raw_timer").innerHTML = "40";
    
    game.four_in_a_raw.game_state = "waiting";
    FOUR_stopTimer()
}

function FOUR_timer() {
    var timer = game.four_in_a_raw.timer
    var html_timer = document.getElementById("four_in_a_raw_timer")
    if (timer > -1) {
        playsound("timer");
        game.four_in_a_raw.timer--;
        html_timer.innerHTML = timer
        four_in_a_raw_countdown = setTimeout(function(){ FOUR_timer() }, 980);
    }
    if (timer == -1) {
        FOUR_stopTimer()
        playsound("timeout");
    }
}

function FOUR_stopTimer() {
    if (typeof four_in_a_raw_countdown != 'undefined') {clearTimeout(four_in_a_raw_countdown);}
}


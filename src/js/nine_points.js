function NINE_reinitNinePointsGamemode() {
    NINE_stopTimer()
    document.getElementById("nine_points_players_score_placeolder").innerHTML = ""
    init();
    GLOBAL_gotoNinePointsGamemode();

    game.nine_points.game_state = "waiting"

    document.getElementById("nine_points_start").style.display = "block";
    document.getElementById("nine_points_correct_answer").style.display = "none";
    document.getElementById("nine_points_wrong_answer").style.display = "none";
    document.getElementById("nine_points_next_question").style.display = "none";
    document.getElementById("nine_points_add_player").style.display = "block";
}

function NINE_start() {
    game.nine_points.game_state = "started"

    document.getElementById("nine_points_start").style.display = "none";
    document.getElementById("nine_points_correct_answer").style.display = "block";
    document.getElementById("nine_points_wrong_answer").style.display = "block";
    document.getElementById("nine_points_next_question").style.display = "block";
    document.getElementById("nine_points_add_player").style.display = "none";


    NINE_nextQuestion()
}

function NINE_addPlayer(qualifier, player_name) {
    var html = document.getElementById("nine_points_players_score_placeolder")

    var player_amount = html.children.length;
    var player_id = "nine_points_player_" + player_amount;
    var class_qualifier = "";
    game.player_list.push(player_id);
    game.nine_points.player_points.push(0);

    if (player_name == undefined) {
        player_name = "Joueur " + (player_amount + 1);
    }

    if (game.nine_points.game_state == "waiting") {
        class_qualifier = "players_score disabled";
    } else if (game.nine_points.game_state == "started") {
        class_qualifier = "players_score idle";
    }

    var player_name_html = "<input type=\"text\" class=\"player_name no_margin\" value=\"" + player_name + "\" class=\"no_margin\"></input>";
    var player_score_html = "<p class=\"players_score no_margin\" class=\"no_margin\">0</p>";
    var player_score_div_html = "<div id=\"" + player_id + "\" class=\"" + class_qualifier + "\" onclick=\"NINE_selectPlayer(this.id, true)\">" + player_name_html + player_score_html + "</div>";

    html.innerHTML += player_score_div_html;
}

function NINE_selectPlayer(player_id, play_buzzer_sound) {
    if (game.nine_points.game_state == "started") {
        //prevent multiple player selection
        if (game.nine_points.selected_player == "" && document.getElementById(player_id).classList[1] != "disabled") {
            //prevent timer to interfer
            NINE_stopTimer();
            //change class to selected player
            var html = document.getElementById(player_id);
            html.className = "players_score selected";

            game.nine_points.selected_player = player_id;

            if (play_buzzer_sound == true) { playsound("buzzer"); }

            //prevent to add nothing
            if (game.nine_points.add_point == 0) {
                document.getElementById("1_point_question").checked = true;;
                game.nine_points.add_point = 1;
            }

            if (game.nine_points.dev_disable_timeout_selected_player == true) {
                timeout_timer = setTimeout(function(){ NINE_disablePlayer(); }, game.nine_points.time_to_answer);
            }
        }
    } else if (game.nine_points.game_state == "waiting"){

    }
}

function NINE_disablePlayer() {
    if (game.nine_points.selected_player != "") {
        //prevent timer to interfer
        NINE_stopTimer();

        var player_id = game.nine_points.selected_player;
        document.getElementById(player_id).className = "players_score disabled";
        game.nine_points.disabled_player_list.push(player_id);
        game.nine_points.selected_player = "";
    }
    playsound("wrong_answer")

    //all player disabled
    if (game.nine_points.disabled_player_list.length == game.player_list.length) {
        next_question_timer = setTimeout(function(){ playsound("timeout"); NINE_nextQuestion(); }, 1000);
    } else if (game.nine_points.timer_after_until_player_selected == true){
        timeout_timer = setTimeout(function(){ playsound("timeout"); NINE_nextQuestion(); }, game.nine_points.time_to_answer / 1.25);
    }
}

function NINE_stopTimer() {
    //reset timeout timer
    if (typeof timeout_timer != 'undefined') {clearTimeout(timeout_timer);}
    if (typeof next_question_timer != 'undefined') {clearTimeout(next_question_timer);}
}

function NINE_validateAnswer() {
    if (game.nine_points.selected_player != "") {
        //prevent timer to interfer
        NINE_stopTimer();

        var player_id_html = document.getElementById(game.nine_points.selected_player);
        var player_id = game.nine_points.selected_player;
        var player_id_number = parseInt(player_id.substr(player_id.length - 1))
        var player_score = game.nine_points.player_points[player_id_number]
        player_score = player_score + game.nine_points.add_point;
        game.nine_points.player_points[player_id.substr(player_id.length - 1)] = player_score;
    
        player_id_html.children[1].innerText = player_score;
        NINE_nextQuestion();
    }
    playsound("points")
}

function NINE_nextQuestion() {
    //prevent timer to interfer
    NINE_stopTimer();
    // reinitialize add point
    game.nine_points.add_point = 0;

    document.getElementById("1_point_question").checked = false;
    document.getElementById("2_points_question").checked = false;
    document.getElementById("3_points_question").checked = false;

    //reinit player states
    for (var i = 0 ; i < game.player_list.length; i++) {
        var player_id = "nine_points_player_" + i;
        document.getElementById(player_id).className = "players_score idle";
    }
    
    //reset timeout timer
    NINE_stopTimer()

    game.nine_points.disabled_player_list = [];
    game.nine_points.selected_player = "";
}
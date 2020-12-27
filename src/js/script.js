function initGame() {
    game = {
        gamemode: "nine-points",
        add_point: 0,
        player_list: [],
        disabled_player_list: [],
        selected_player: "",
        time_to_answer: 5000
    }
    global = {
        playsound_enabled: true
    }

    dev()
}

function dev() {
    addPlayer()
    addPlayer()
}

function reinitGame() {
    document.getElementById("player_score_placeolder").innerHTML = ""

    initGame()
}

function addPlayer(player_name) {
    var html = document.getElementById("player_score_placeolder")

    var player_amount = html.children.length
    var player_id = "player_" + player_amount
    game.player_list.push(player_id)

    if (player_name == undefined) {
        player_name = "Joueur " + (player_amount + 1)
    }

    var player_score_html = "<div id=\"" + player_id + "\" class=\"player_score idle\" onclick=\"selectPlayer(this.id)\"><p id=\"player_name\" class=\"no_margin\">" + player_name + "</p><p id=\"player_score\" class=\"no_margin\">0</p></div>";

    html.innerHTML += player_score_html
}

function selectPlayer(player_id) {
    //prevent multiple player selection
    if (game.selected_player == "" && document.getElementById(player_id).classList[1] != "disabled") {
        //prevent timer to interfer
        stopTimer()
        //change class to selected player
        var html = document.getElementById(player_id);
        html.className = "player_score selected";

        game.selected_player = player_id
        playsound("buzzer")

        //prevent to add nothing
        if (game.add_point == 0) {
            document.getElementById("1_point_question").checked = true;
            game.add_point = 1
        }

        timeout_timer = setTimeout(function(){ disablePlayer(); }, 4000);
    }
}

function disablePlayer() {
    if (game.selected_player != "") {
        //prevent timer to interfer
        stopTimer()

        var player_id = game.selected_player
        document.getElementById(player_id).className = "player_score disabled"
        game.disabled_player_list.push(player_id)
        game.selected_player = ""
    }
    playsound("wrong_answer")

    //all player disabled
    if (game.disabled_player_list.length == game.player_list.length) {
        next_question_timer = setTimeout(function(){ playsound("timeout"); nextQuestion(); }, 1000);
    }
}

function stopTimer() {
    //reset timeout timer
    if (typeof timeout_timer != 'undefined') {clearTimeout(timeout_timer);}
    if (typeof next_question_timer != 'undefined') {clearTimeout(next_question_timer);}
}

function validateAnswer() {
    if (game.selected_player != "") {
        //prevent timer to interfer
        stopTimer()

        var player_id = document.getElementById(game.selected_player)
        var player_score = parseInt(player_id.children[1].innerText)
        player_score = player_score + game.add_point
    
        player_id.children[1].innerText = player_score
        next_question_timer = setTimeout(function(){ nextQuestion(); }, 1000);
    }
    playsound("points")
}

function nextQuestion() {
    //prevent timer to interfer
    stopTimer()
    // reinitialize add point
    game.add_point = 0

    document.getElementById("1_point_question").checked = false;
    document.getElementById("2_points_question").checked = false;
    document.getElementById("3_points_question").checked = false;

    //reinit player states
    for (var i = 0 ; i < game.player_list.length ; i++) {
        var player_id = "player_" + i
        document.getElementById(player_id).className = "player_score idle"
    }
    
    //reset timeout timer
    clearTimeout(timeout_timer);

    game.disabled_player_list = [];
    game.selected_player = ""
}

function playsound(sound) {
    if (global.playsound_enabled == true) {
        switch (sound) {
            case "clock_effect":
                $.playsound("src/sounds/clock_effect.mp3");
                break;
            case "jingle_fin":
                $.playsound("src/sounds/jingle_fin.mp3");
                break;
            case "passage_de_main":
                $.playsound("src/sounds/passage_de_main.mp3");
                break;
            case "points":
                $.playsound("src/sounds/points.mp3");
                break;
            case "qualif":
                $.playsound("src/sounds/qualif.mp3");
                break;
            case "sound_110":
                $.playsound("src/sounds/sound_110.mp3");
                break;
            case "buzzer":
                $.playsound("src/sounds/sound_114_buzzer.mp3");
                break;
            case "timeout":
                $.playsound("src/sounds/timeout.mp3");
                break;
            case "wrong_answer":
                $.playsound("src/sounds/wrong_answer.mp3");
                break;
            default:
                break;
        }
    }
}
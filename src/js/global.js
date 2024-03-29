function playsound(sound) {
    if (global.playsound_enabled == true) {
        switch (sound) {
            case "timer":
                $.playsound("./src/sounds/clock_effect.mp3");
                break;
            case "jingle_fin":
                $.playsound("./src/sounds/jingle_fin.mp3");
                break;
            case "passage_de_main":
                $.playsound("./src/sounds/passage_de_main.mp3");
                break;
            case "points":
                $.playsound("./src/sounds/points.mp3");
                break;
            case "qualif":
                $.playsound("./src/sounds/qualif.mp3");
                break;
            case "sound_110":
                $.playsound("./src/sounds/sound_110.mp3");
                break;
            case "buzzer":
                $.playsound("./src/sounds/sound_114_buzzer.mp3");
                break;
            case "timeout":
                $.playsound("./src/sounds/timeout.mp3");
                break;
            case "wrong_answer":
                $.playsound("./src/sounds/wrong_answer.mp3");
                break;
            default:
                break;
        }
    }
}

document.addEventListener('keydown', (event) => { const keyName = event.code;
    if (game.gamemode == "nine_points") {
        if (keyName === 'Enter' || keyName === 'NumpadEnter') {
            if (game.nine_points.game_state == "started") {
                NINE_validateAnswer()
            }
          return;
        } else if (keyName === 'Equal' || keyName === 'NumpadAdd') {
            if (game.nine_points.game_state == "waiting") {
                NINE_addPlayer("dumy", undefined)
            }
          return;
        } else if (keyName === 'Space') {
            if (game.nine_points.game_state == "started") {
                NINE_nextQuestion(); playsound('timeout');
            }
          return;
        } else if (keyName === 'Backspace') {
            if (game.nine_points.game_state == "started") {
                NINE_disablePlayer()
            }
          return;
        }
    } else if (game.gamemode == "four_in_a_raw") {
        if (keyName === 'Enter' || keyName === 'NumpadEnter') {
          return;
        } else if (keyName === 'Equal' || keyName === 'NumpadAdd') {
            if (game.nine_points.game_state == "waiting") {
                FOUR_addPlayer("dumy", undefined)
            }
          return;
        } else if (keyName === 'Space') {
          return;
        } else if (keyName === 'Backspace') {
          return;
        }
    }

  }, false);
  
  function init() {
    game = {
        gamemode: "",
        player_list: [],
        nine_points: {
            game_state: "waiting",
            default_player_amount: 2,
            timer_after_until_player_selected: false,
            time_to_answer: 4000,
            selected_player: "",
            player_points: [],
            disabled_player_list: [],
            add_point: 0,
            dev_disable_timeout_selected_player: false,
            dev_random_selected_player: false
        },
        four_in_a_raw: {
            game_state: "waiting",
            state: 0,
            record_state: 0,
            timer: 40,
            hand_player: "",
            selected_player: "",
            player_points: [],
            player_0_points: 0,
            player_1_points: 0
        }
    }
    global = {
        displayed_page: "menu",
        playsound_enabled: true,
    }
    document.getElementById("version").innerHTML = "0.0.8";

    game.nine_points.dev_disable_timeout_selected_player = true;
    game.nine_points.dev_random_selected_player = true;

    // GLOBAL_gotoNinePointsGamemode()
}

function GLOBAL_dev() {
    var radio_button_id = ["1_point_question", "2_points_question", "3_points_question"]
    for (var i in radio_button_id) { document.getElementById(radio_button_id[i]).checked = false}

    document.getElementById(radio_button_id[Math.floor(Math.random() * radio_button_id.length)]).checked = true;

    if (global.dev_random_selected_player == true && game.nine_points.selected_player == "") {
        NINE_selectPlayer("nine_points_player_" + Math.round(Math.random(game.player_list.length) ), false);
    }

    setTimeout(function(){ NINE_validateAnswer(); }, 200);
}

function GLOBAL_gotoMenu() {
    NINE_stopTimer();
    
    FOUR_stopTimer()
    FOUR_reset()

    FINALE_reset()

    game.gamemode = "";

    GLOBAL_gotoSpecificPage("menu")
}

function GLOBAL_gotoNinePointsGamemode() {
    NINE_stopTimer();
    game.gamemode = "nine_points";
    GLOBAL_gotoSpecificPage("nine_points")

    if (game.player_list.length == 0) {
        //Add player at start
        for (var i = 0; i < game.nine_points.default_player_amount; i++) {
            NINE_addPlayer("dumy", undefined); 
        }
    }
}

function GLOBAL_gotoFourinARawGamemode() {
    game.gamemode = "four_in_a_raw";
    GLOBAL_gotoSpecificPage("four_in_a_raw")
}

function GLOBAL_gotoFinaleGamemode() {
    game.gamemode = "finale";
    GLOBAL_gotoSpecificPage("finale")
}

function GLOBAL_gotoSpecificPage(page) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("nine_points").style.display = "none";
    document.getElementById("four_in_a_raw").style.display = "none";
    document.getElementById("finale").style.display = "none";

    document.getElementById(page).style.display = "block";
    global.displayed_page = page;
}
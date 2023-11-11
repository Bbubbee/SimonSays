
/* MAIN */

var is_game_running = false
var level = [];
var pos_in_level = 0; 

/* PROCESS */

// Key input detection. 
$(document).on("keypress", function(event) {
    // The game is already running.
    if (is_game_running) {
        return; 
    }

    if (event.key == "Enter") {
        start_game();
    }
    
});


// Button input detection. 
// This is the gameplay loop. 
$(".btn").click( function() {
    // Indicate the button has been pressed. 
    button_animation(this); 

    if (!is_game_running ) { 
        var color = $(this).attr("id");
        play_sound(color); 
        return 
    }

    // Checks if the color is correct. 
    var color = $(this).attr("class"); 

    if (check_color(color)) {
        // Continue the game. 
        // Go to the next position in the level. 
        pos_in_level++; 

        // Check if the user is at the end of the level. 
        if (pos_in_level < level.length) {
            
            console.log("Guess the next color in the level");

            // Wait for the user to guess the next color. 

        } else {
            // Go to next level. 
            pos_in_level = 0; 
            // Delay before site chooses next color. 
            setTimeout(function() {
                choose_random_color(); 
                $("h1").html("<br>Level "+level.length)
                console.log("Advance to the next level"); 
            }, 550);

            
        }
    } else {
        end_game();
    }
});


/* FUNCTIONS */

// Check if correct color was clicked. 
function check_color(c) 
{
    // Checks if color is correct. 
    var color = ""; 

    if (c.includes("green")) { color = "green"; } 
    else if (c.includes("red")) { color = "red"; } 
    else if (c.includes("yellow")) { color = "yellow"; } 
    else if (c.includes("blue")) { color = "blue"; } 
    else { color = "pink"; }

    console.log("You chose "+color);
    play_sound(color); 
    
    if (color == level[pos_in_level]) {
        console.log("you got the right color!"); 
        return true; 
    } 
    else {
        console.log("you chose the wrong color...");
        console.log("GAMEOVER"); 
        return false; 
    }
} 

function start_game() 
{
    $("h1").html("<br>Level 1"); 
    is_game_running = true; 
    choose_random_color(); 
}

function end_game()
{
    play_sound("wrong");

    // Game over animations.
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over"); 
    }, 100);
    $("h1").text("Game Over, Press Enter To Start");


    is_game_running = false; 
    pos_in_level = 0; 
    level = []; 
}

// Select random color. 
function choose_random_color() 
{
    var r = Math.floor(Math.random() * 4)+1; 
    var c = ""; 
    switch (r) {
        case 1: 
            c =  "green"; 
            break; 
        case 2: 
            c =  "red"; 
            break; 
        case 3: 
            c =  "yellow"; 
            break; 
        case 4: 
            c =  "blue"; 
            break; 
        default: 
            c =  "pink"; 
            break; 
    }

    console.log("Site chose color: "+c); 
    level.push(c); 
    button_animation_site(c); 
    play_sound(c);
}

function print_array(arr)
{
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}


// Button animation when the site presses a button. 
function button_animation_site(button)
{
    $("."+button).animate({opacity: 0}).animate({opacity: 1})
}


// Button animation when the user presses the button. 
function button_animation(button) 
{
    $(button).addClass("pressed"); 

    setTimeout(function() {
        $(button).removeClass("pressed"); 
    }, 100);
}

function play_sound(sound) 
{
    var sound = new Audio("./sounds/"+sound+".mp3");
    sound.play(); 
}
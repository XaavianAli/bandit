//Client Script
var q = 1;

function loaded(){
	console.log("Page loaded");
}

// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:3002');

// Connection opened
socket.addEventListener('open', function (event) {
	var data = {text:"Initial connection"};
	data = JSON.stringify(data);
    socket.send(data);
});

// Listen for messages
socket.addEventListener('message', function (data) {
	console.log("Received: " + data.data);
	data = JSON.parse(data.data);
    if (data.players != undefined){
        players = JSON.parse(data.players);
    }
    console.log('Message from server: ' + data.text);

    //SETUP COMPLETE***********************************************
    if (data.goal == "setupcomplete"){
		document.getElementById("bandit").style.display = "none";
		document.getElementById("host").style.display = "none";
		document.getElementById("player").style.display = "none";
		document.getElementById("wait").style.display = "block";
		document.getElementById("wait").innerHTML = "Game ID: " + data.gameid + ". Waiting for players to join...";
		document.getElementById("list").style.display = "block";
		document.getElementById("start").style.display = "block";
        document.getElementById("key").innerHTML = data.gameid;
    }

    //GAMENOTFOUND*************************************************
    if (data.goal == "gamenotfound"){
    	document.getElementById("error").innerHTML = "Oops, looks like that game code is invalid :(";
    }

    //GAMEJOINED***************************************************
    if (data.goal == "gamejoined"){
    	document.getElementById("bandit").style.display = "none";
    	document.getElementById("username").style.display = "none";
    	document.getElementById("gameid").style.display = "none";
    	document.getElementById("join").style.display = "none";
    	document.getElementById("error").style.display = "none";
    	document.getElementById("joined").style.display = "block";
    	document.getElementById("load").style.display = "block";
        document.getElementById("key").innerHTML = data.gameid;
    }

    //UPDATEMENU***************************************************
    if (data.goal == "updatemenu"){
    	var t = data.username;
    	if (q == 1){
    		document.getElementById("player1").innerHTML = t;
    	} else if (q == 2){
    		document.getElementById("player2").innerHTML = t;
    	} else if (q == 3){
    		document.getElementById("player3").innerHTML = t;
    	} else if (q == 4){
    		document.getElementById("player4").innerHTML = t;
    	} else if (q == 5){
    		document.getElementById("player5").innerHTML = t;
    	} else if (q == 6){
    		document.getElementById("player6").innerHTML = t;
    	} else if (q == 7){
    		document.getElementById("player7").innerHTML = t;
    	} else if (q == 8){
    		document.getElementById("player8").innerHTML = t;
    	} else if (q == 9){
    		document.getElementById("player9").innerHTML = t;
    	}
    	q++;
    }

    //INITIALIZEHOST*****************************

    if (data.goal == "initializehost"){
        document.getElementById("wait").style.display = "none";
        document.getElementById("list").style.display = "none";
        document.getElementById("start").style.display = "none";
        document.getElementById("pcontainer").style.display = "block";
        document.getElementById("prompt").style.display = "block";
        document.getElementById("prompt").innerHTML = "Game Started!";

        if (players[0].bot == true){
            document.getElementById("p1i").src = "bot.png";
        }
        document.getElementById("p1n").innerHTML = players[0].username;
        document.getElementById("p1s").innerHTML = "Alive";
        document.getElementById("p1r").innerHTML = "???";
        if (players[1].bot == true){
            document.getElementById("p2i").src = "bot.png";
        }
        document.getElementById("p2n").innerHTML = players[1].username;
        document.getElementById("p2s").innerHTML = "Alive";
        document.getElementById("p2r").innerHTML = "???";
        if (players[2].bot == true){
            document.getElementById("p3i").src = "bot.png";
        }
        document.getElementById("p3n").innerHTML = players[2].username;
        document.getElementById("p3s").innerHTML = "Alive";
        document.getElementById("p3r").innerHTML = "???";
        if (players[3].bot == true){
            document.getElementById("p4i").src = "bot.png";
        }
        document.getElementById("p4n").innerHTML = players[3].username;
        document.getElementById("p4s").innerHTML = "Alive";
        document.getElementById("p4r").innerHTML = "???";
        if (players[4].bot == true){
            document.getElementById("p5i").src = "bot.png";
        }
        document.getElementById("p5n").innerHTML = players[4].username;
        document.getElementById("p5s").innerHTML = "Alive";
        document.getElementById("p5r").innerHTML = "???";
        if (players[5].bot == true){
            document.getElementById("p6i").src = "bot.png";
        }
        document.getElementById("p6n").innerHTML = players[5].username;
        document.getElementById("p6s").innerHTML = "Alive";
        document.getElementById("p6r").innerHTML = "???";
        if (players[6].bot == true){
            document.getElementById("p7i").src = "bot.png";
        }
        document.getElementById("p7n").innerHTML = players[6].username;
        document.getElementById("p7s").innerHTML = "Alive";
        document.getElementById("p7r").innerHTML = "???";
        if (players[7].bot == true){
            document.getElementById("p8i").src = "bot.png";
        }
        document.getElementById("p8n").innerHTML = players[7].username;
        document.getElementById("p8s").innerHTML = "Alive";
        document.getElementById("p8r").innerHTML = "???";
        if (players[8].bot == true){
            document.getElementById("p9i").src = "bot.png";
        }
        document.getElementById("p9n").innerHTML = players[8].username;
        document.getElementById("p9s").innerHTML = "Alive";
        document.getElementById("p9r").innerHTML = "???";

    }

    //INITIALIZEPLAYER
    if (data.goal == "initializeplayer"){
        
    }

});

function host(){
	var data = {goal:"setuphost", text:"Client wants to host a game"};
	data = JSON.stringify(data);
	console.log("Sending " + data);
	socket.send(data);
}

function join(){
	var username1 = document.getElementById("username").value;
	var gameid1 = parseInt(document.getElementById("gameid").value);
	var data = {goal:"joingame", username:username1, gameid:gameid1, text:"User wants to join a game"};
	data = JSON.stringify(data);
	console.log("Sending " + data);
	socket.send(data);
}

function player(){
	document.getElementById("host").style.display = "none";
	document.getElementById("player").style.display = "none";
	document.getElementById("gameid").style.display = "inline";
	document.getElementById("username").style.display = "inline";
	document.getElementById("join").style.display = "block";
}

function start(){
    var data = {goal:"initialize", gameid:document.getElementById("key").innerHTML, text:"Host Starting Game"};
    data = JSON.stringify(data);
    console.log("Sending " + data);
    socket.send(data);
}

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
//Node Server

class GameObject{
	constructor(){
		this.id = Math.floor(Math.random() * 1000000);
		this.joinable = true;
		this.playerArray = [];
		this.host = null;
		this.players = 0;
	}
}

class PlayerObject{
	constructor(){
		this.username = "";
		this.role = "";
		this.alive = true;
		this.bot = true;
		this.counter = 0;
		this.socket = null;
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var nameArray = ["Mack","Coco","Mittens","Tiger","Kitty","Checkers","Cinder","Jane","Honey"];
var roleArray = ["Bandit","Bandit","Bandit","Sheriff","Surgeon","Cowboy","Cowboy","Cowboy","Cowboy"];

//***********************************************

const Game = require("./Game.js");
const WebSocket = require('ws');
const port1 = 3002

const wss = new WebSocket.Server({ port: port1 });
console.log("Server started on port " + port1);
var gameArray = [];

wss.on('connection', function connection(ws) {

	ws.on('message', function incoming(data) {

		//Tell me what it is
		data = JSON.parse(data);
		console.log(data.text);

		//SETUPHOST******************************
		if (data.goal == "setuphost"){
			var x = new GameObject();
			x.host = ws;
			gameArray.push(x);
			data = {goal:"setupcomplete", gameid:x.id, text:"Host is setup"};
			data = JSON.stringify(data);
			ws.send(data);
		}

		//JOINGAME*******************************
		if (data.goal == "joingame"){
			var found = false;
			for (var i = 0; i < gameArray.length; i++){
				if (gameArray[i].id == data.gameid){
					var x = new PlayerObject();
					x.username = data.username;
					x.socket = ws;
					x.bot = false;
					gameArray[i].playerArray.push(x);
					var data = {goal:"updatemenu", username:data.username, text:"Add player to menu screen"};
					data = JSON.stringify(data);
					gameArray[i].host.send(data);
					found = true;
					break;
				}
			}
			if (!found){
				var data = {goal:"gamenotfound", text:"Game not found oops"};
				data = JSON.stringify(data);
				ws.send(data);
			}else{
				var data = {goal:"gamejoined", gameid:data.gameid, text:"Game Joined Successfully!"};
				data = JSON.stringify(data);
				ws.send(data);
			}
		}

		//INITIALIZE*****************************
		if (data.goal == "initialize"){
			var game;
			for(var i = 0; i < gameArray.length; i++){
				if (data.gameid == gameArray[i].id){
					game = gameArray[i];
				}
			}
			shuffle(nameArray);
			for (var i = game.playerArray.length; i < 9; i++){
				game.playerArray[i] = new PlayerObject();
				game.playerArray[i].username = nameArray[i];
			}
			shuffle(roleArray);
			for(var i = 0; i < 9; i++){
				game.playerArray[i].role = roleArray[i];
			}
			p = JSON.stringify(game.playerArray);
			var data = {goal:"initializehost", players:p, text:"Game Started on Host"};
			data = JSON.stringify(data);
			game.host.send(data);
		}

	});

	var data = {text:"Connection Successful!"};
	data = JSON.stringify(data);
	ws.send(data);
});

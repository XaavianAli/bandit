//Server

class GameObject{
	constructor(){
		this.id = Math.floor(Math.random() * 1000000);
		this.joinable = true;
		this.playerArray = [];
		this.socket = null;
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

//***************************************************
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

		//SETUPHOST**********************************
		if (data.goal == "setuphost"){
			var x = new GameObject();
			x.socket = ws;
			gameArray.push(x);
			data = {goal:"setupcomplete", gameid:x.id, text:"Host is setup"};
			data = JSON.stringify(data);
			ws.send(data);
		}

		//JOINGAME***********************************
		if (data.goal == "joingame"){
			var found = false;
			for (var i = 0; i < gameArray.length; i++){
				if (gameArray[i].id == data.gameid){
					var x = new PlayerObject();
					x.username = data.username;
					x.socket = ws;
					gameArray[i].playerArray.push(x);
					var data = {goal:"updatemenu", username:data.username, text:"Add player to menu screen"};
					data = JSON.stringify(data);
					gameArray[i].socket.send(data);
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

	});

	var data = {text:"Connection Successful!"};
	data = JSON.stringify(data);
	ws.send(data);
});

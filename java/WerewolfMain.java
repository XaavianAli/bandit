//Werewolf 
//Main.java

import java.util.*;

class Main{

	public static void main(String[] args){
		if (args.length == 0){
			System.out.println("Error: no number of players specified.");
			System.exit(1);
		} else if (Integer.parseInt(args[0]) > 9){
			System.out.println("Error: max players is 9");
			System.exit(2);
		}
		boolean sim = false;
		int n = Integer.parseInt(args[0]);
		System.out.println("Welcome to Werewolf!");
		String a = new String();
		Player[] players = new Player[9];
		Game.initialize(players);
		Game.assignPlayers(n,players);
		Game.makeBot(n,players);
		//Game.playerStatus(players);
		Game.alivePlayers(players);
		Game.reveal(n,players);
		Game.werewolfGang(n,players);
		while (true){
			System.out.println("Its day time!");
			Game.dayVote(players);
			a = Game.kill(players,Game.eliminate(players));
			System.out.println(a + " was voted to be killed. They were a " + Game.getRole(a,players));
			Game.clear(players);
			//Game.playerStatus(players);
			Game.alivePlayers(players);
			if (sim == false){
				sim = Game.playersAlive(players);
			}
			if (Game.check(players))
				break;
			System.out.println("Its night time!");
			Game.werewolfVote(players);
			if(!Game.doctor(players,Game.eliminate(players))){
				a = Game.kill(players,Game.eliminate(players));
				System.out.println(a + " has been killed during the night. They were a " + Game.getRole(a,players));
			} else {
				System.out.println(Game.eliminate(players) + " was critically wounded during the night, but was saved by the doctor.");
			}
			Game.clear(players);
			Game.alivePlayers(players);
			if (sim == false){
				sim = Game.playersAlive(players);
			}
			if (Game.check(players))
				break;
			Game.seer(players);
			//Game.playerStatus(players);
		}
	}
}
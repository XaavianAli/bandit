//Various functions for the game
//enable debug lines in seer() dayVote() and werewolfVote() to see who votes for who

import java.util.*;

class Game{

	public static void playerStatus(Player[] array){
		for (int i = 0; i < 9; i++){
			System.out.println(array[i].getName() + ": " + array[i].getRole() + ", " + array[i].getCounter() + ", " + array[i].isAlive());
		}
	}

	public static int rand(){
		Random r = new Random();
		int a = r.nextInt(9);
		return a;
	}

	public static int rand2(){
		Random r = new Random();
		int a = r.nextInt(2);
		return a;
	}

	public static void initialize(Player[] array){
		for (int i = 0; i < 9; i++){
			if (i < 3)
				array[i] = new Werewolf();
			else if (i < 4)
				array[i] = new Doctor();
			else if (i < 5)
				array[i] = new Seer();
			else 
				array[i] = new Villager();
		}
		List<Player> playerList = Arrays.asList(array);
		Collections.shuffle(playerList);
		playerList.toArray(array);
		String[] cpu = {"GOD","Checkers","Cinder","Mack","Coco","Tiger","Mittens","Stitch","Arthur"};
		for (int k = 0; k < 9; k++){
			array[k].setName(cpu[k]);
		}
	}

	public static void assignPlayers(int x, Player[] array){
		for (int i = 0; i < x; i++){
			System.out.println("Player " + (i+1) + ", enter your name: ");
			Scanner in = new Scanner(System.in);
			String a = in.nextLine();
			array[i].setName(a);
		}
	}

	public static void werewolfVote(Player[] array){
		System.out.println("The werewolves will now vote on who to kill");
		for (int i = 0; i < 9; i++){
			if (array[i].getRole().equals("Werewolf") && array[i].isAlive()){
				if (array[i].isBot()){
					int x = Game.rand();
					while (x == i || !array[x].isAlive()){
						x = Game.rand();
					}
					if (array[i].getRole().equals("Werewolf")){
							while (array[x].getRole().equals("Werewolf") || !array[x].isAlive())
								x = Game.rand();
					}
					array[x].incCounter();
					//Debug line
					System.out.println(array[i].getRole() + " " + array[i].getName() + " has voted to kill " + array[x].getRole() + " " + array[x].getName());
				}else{
					String a = array[i].vote();
					for (int j = 0; j < 9; j++){
						if (array[j].getName().equals(a)){
							array[j].incCounter();
							break;
						}
					}
				}
			}
		}
	}

	public static int max(Player[] array){
		int maxpos = 0;
		int maxvalue = array[0].getCounter();
		for (int i = 1; i < 9; i++){
			if (array[i].getCounter() > maxvalue && array[i].isAlive()){
				maxpos = i;
				maxvalue = array[i].getCounter();
			}
		}

		return maxpos;
	}

	public static void clear(Player[] array){
		for (int i = 0; i < 9; i++)
			array[i].resetCounter();
	}

	public static String eliminate(Player[] array){
		int a = Game.max(array);
		return array[a].getName();
	}

	public static String kill(Player[] array, String a){
		for (int i = 0; i < 9; i++){
			if (array[i].getName().equals(a)){
				array[i].kill();
				break;
			}
		}
		return a;
	}

	public static boolean doctor(Player[] array, String x){
		boolean q = false;
		for (int i = 0; i < 9; i++){
			if (array[i].getRole().equals("Doctor") && array[i].isAlive()){
				q = array[i].save(x,array);
				break;
			}
		}
		return q;
	}

	public static void dayVote(Player[] array){
		for (int i = 0; i < 9; i++){
			if (array[i].isAlive()){
				if (array[i].isBot()){
					int x = Game.rand();
					while (x == i || !array[x].isAlive()){
						x = Game.rand();
					}
					if (array[i].getRole().equals("Werewolf")){
							while (array[x].getRole().equals("Werewolf") || !array[x].isAlive())
								x = Game.rand();
					}
					if (array[i].getRole().equals("Seer")){
						if (array[i].getLastRole().equals("Werewolf")){
							for (int s = 0; s < 9; s++){
								if (array[s].getName().equals(array[i].getLastName())){
									x = s;
								}
							}
						}
					}
					array[x].incCounter();
					//Debug line
					System.out.println(array[i].getRole() + " " + array[i].getName() + " voted to kill " + array[x].getRole() + " " + array[x].getName());
				}else{
					String a = array[i].vote();
					for (int j = 0; j < 9; j++){
						if (array[j].getName().equals(a)){
							array[j].incCounter();
							break;
						}
					}
				}
			}
		}
	}

	public static void seer(Player[] array){
		for (int i = 0; i < 9; i++){
			if (array[i].getRole().equals("Seer") && array[i].isAlive()){
				array[i].ask(array);
				//Debug line
				System.out.println("Seer " + array[i].getName() + " saw " + array[i].getLastRole() + " " + array[i].getLastName());
				break;
			}
		}
	}

	public static boolean check(Player[] array){
		int wolf = 0;
		int nonwolf = 0;
		for (int i = 0; i < 9; i++){
			if (array[i].getRole().equals("Werewolf") && array[i].isAlive())
				wolf++;
			if (!array[i].getRole().equals("Werewolf") && array[i].isAlive())
				nonwolf++;
		}
		if (wolf == 0){
			System.out.println("There are no more werewolves, The villagers have won!");
			return true;
		}
		if (nonwolf == 0){
			System.out.println("There are no more villagers, the werewolves have won!");
			return true;
		}
		return false;
	}

	public static void makeBot(int x, Player[] array){
		for (int i = 0; i < x; i++){
			array[i].notBot();
		}
	}

	public static void alivePlayers(Player[] array){
		System.out.println("\nLive players: \n");
		for (int i = 0; i < 9; i++){
			if (array[i].isAlive())
				System.out.println(array[i].getName());
		}
		System.out.println("\n");
	}

	public static void reveal(int x, Player[] array){
		for (int i = 0; i < x; i++){
			System.out.println(array[i].getName() + ", you are a " + array[i].getRole());
		}
	}

	public static String getRole(String x, Player[] array){
		for (int i = 0; i < 9; i++){
			if (array[i].getName().equals(x))
				return array[i].getRole();
		}
		return "NAMENOTFOUND";
	}

	public static boolean playersAlive(Player[] array){
		Scanner in = new Scanner(System.in);
		int playersAlive = 0;
		for (int i = 0; i < 9; i++){
			if (!array[i].isBot() && array[i].isAlive())
				playersAlive++;
		}
		if (playersAlive == 0){
			System.out.print("There are no more user controlled players left in the game. Press Enter to simulate the rest of the game.");
			String a = in.nextLine();
			return true;
		}
		return false;
	}

	public static void werewolfGang(int x,Player[] array){
		for (int i = 0; i < x; i++){
			if (!array[i].isBot() && array[i].getRole().equals("Werewolf")){
				System.out.println("Your fellow werewolves are:");
				for (int j = 0; j < 9; j++){
					if (array[j].getRole().equals("Werewolf") && !array[j].getName().equals(array[i].getName()))
						System.out.println(array[j].getName());
				}
			}
		}
	}

	public static int getPos(String a,Player[] array){
		for (int i = 0; i < 9; i++){
			if (array[i].getName().equals(a))
				return i;
		}
		return 0;
	}

}
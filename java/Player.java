//Player Class

import java.util.*;

abstract class Player{

	Player(){
		name = "UNDEFINED";
		role = "UNDEFINED";
		id = idGen;
		idGen++;
		alive = true;
		bot = true;
		counter = 0;
	}

	Player(String newName){
		name = newName;
		role = "UNDEFINED";
		id = idGen;
		idGen++;
		alive = true;
		bot = true;
		counter = 0;
	}

	Player(String newName,String newRole){
		name = newName;
		role = newRole;
		id = idGen;
		idGen++;
		alive = true;
		bot = true;
		counter = 0;
	}

	public String getName(){
		return name;
	}

	public void setName(String newName){
		name = newName;
	}

	public String getRole(){
		return role;
	}

	public void setRole(String newRole){
		role = newRole;
	}

	public boolean isAlive(){
		return alive;
	}

	public void kill(){
		alive = false;
	}

	public boolean isBot(){
		return bot;
	}

	public void notBot(){
		bot = false;
	}

	public void incCounter(){
		counter++;
	}

	public void resetCounter(){
		counter = 0;
	}

	public int getCounter(){
		return counter;
	}

	public int getID(){
		return id;
	}

	public String vote(){
		System.out.print(name + ", who would you like to vote to kill?: ");
		Scanner in = new Scanner(System.in);
		String a = in.nextLine();
		return a;
	}

	public boolean save(String a, Player[] array){
		return false;
	}

	public void ask(Player[] array){
	}

	public void setLastRole(String x){
	}

	public String getLastRole(){
		return "ERROR";
	}

	public void setLastName(String x){
	}

	public String getLastName(){
		return "ERROR";
	}

	protected String name;
	protected String role;
	protected int id;
	protected static int idGen = 0;
	protected boolean alive;
	protected boolean bot;
	protected int counter;
}
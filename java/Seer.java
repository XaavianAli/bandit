//Seer Class

import java.util.*;

class Seer extends Player{
	
	Seer(){
		role = "Seer";
	}

	Seer(String newName){
		name = newName;
		role = "Seer";
	}

	public void setLastRole(String x){
		lastRole = x;
	}

	public String getLastRole(){
		return lastRole;
	}

	public void setLastName(String x){
		lastName = x;
	}

	public String getLastName(){
		return lastName;
	}

	public void ask(Player[] array){
		for(int i = 0; i < 9; i++){
			if(array[i].getRole().equals("Seer") && array[i].isAlive()){
				if (array[i].isBot()){
					int r = Game.rand();
					while (!array[r].isAlive() || i == r)
						r = Game.rand();
					this.lastRole = array[r].getRole();
					this.lastName = array[r].getName();
				}else{
					System.out.print(name + ", who would you like to know the identity of?: ");
					Scanner in = new Scanner(System.in);
					String a = in.nextLine();
					for (int j = 0; j < 9; j++){
						if (array[j].getName().equals(a)){
							System.out.println(a + " is a " + array[i].getRole());
						}
					}
				}
			}
		}
	}

	private String lastRole = "";
	private String lastName = "";

}
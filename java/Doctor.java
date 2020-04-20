//Doctor Class

import java.util.*;

class Doctor extends Player{

	Doctor(){
		role = "Doctor";
	}

	Doctor(String newName){
		name = newName;
		role = "Doctor";
	}

	public boolean save(String a,Player[] array){
		for (int i = 0; i < 9; i++){
			if(array[i].getRole().equals("Doctor") && array[i].isAlive()){
				if (array[i].isBot()){
					if(!saved){
						if (Game.rand2() == 1){
							saved = true;
							return true;
						}else{
							return false;
						}
					}
				}else{
					if(!saved){
						System.out.print(a + " has been voted to be killed. Would you like to save them?: ");
						Scanner in = new Scanner(System.in);
						String x = in.nextLine();
						if (x.equals("yes")){
							System.out.println("You have saved " + a);
							saved = true;
							return true;
						} else {
							System.out.println("You have chosen not to save " + a);
							return false;
						}
					}
				}
			}
		}
		return false;
	}

	private boolean saved = false;
}
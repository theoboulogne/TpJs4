
function playEvent(morpion, x, y){
    console.log(morpion)
    if(morpion.getCaseState(x,y)==undefined){

        morpion.play(x,y);
        document.getElementById("player_number").innerHTML = morpion.currentPlayer + 1;
        
        console.log(morpion)
        if (morpion.hasWinner()) {
            console.log(morpion.getWinner());
        }else{
            if(morpion.isFinished()){
                morpion.reset()
            }
        }
    }
}

class TicTacToeView {
    constructor(game, pseudo){
        this.morpion = game;
        this.changePlayer(this.morpion.currentPlayer + 1); // +1 pour avoir joueur 1 ou 2
        this.initEvent(this.morpion);
    }


    changePlayer(nb){
        document.getElementById("player_number").innerHTML = nb;
    }

    
    initEvent(morpion){
        let table = document.getElementById("morpion");
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                console.log(table.firstElementChild.children[i].children[j])
                table.firstElementChild.children[i].children[j].addEventListener("click", function(){
                    playEvent(morpion, j, i);
                });
            }
        }
    }


    
    

}

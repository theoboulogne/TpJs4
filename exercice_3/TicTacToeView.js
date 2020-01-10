
function playEvent(morpion, casetab, x, y){
    if(morpion.getCaseState(x,y)==undefined){

        let img = document.createElement("img");
        if(morpion.currentPlayer==0){
            img.src = "x.png"
        }
        else {
            img.src = "o.png"
        }
        img.setAttribute("id", "game");

        morpion.play(x,y);

        document.getElementById("player_number").innerHTML = morpion.currentPlayer + 1;
        casetab.appendChild(img);
        
        if (morpion.hasWinner()) {
            console.log(morpion.getWinner());
            morpion.reset()
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
        this.initEvent();
    }


    changePlayer(nb){
        document.getElementById("player_number").innerHTML = nb;
    }

    
    initEvent(){
        let table = document.getElementById("morpion");
        let morpion = this.morpion;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                console.log(table.firstElementChild.children[i].children[j])
                table.firstElementChild.children[i].children[j].addEventListener("click", function(){
                    playEvent(morpion, this, j, i);
                });
            }
        }
    }


    
    

}

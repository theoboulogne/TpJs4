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

        changePlayer(morpion.currentPlayer + 1);
        casetab.appendChild(img);
        
        if (morpion.hasWinner()) {
            switchalert(morpion.getWinner() + 1);
            morpion.reset()
        }else{
            if(morpion.isFinished()){
                morpion.reset()
            }
        }
    }
}
function switchalert(nb) {
    let alert = document.getElementById("fin");
    if (alert.style.display === "none") {
      alert.style.display = "block";
    }
    document.getElementById("gagnant").innerHTML = nb;
}
function closealert() {
    let alert = document.getElementById("fin");
    alert.style.display = "none";
}


function changePlayer(nb){
    document.getElementById("player_number").innerHTML = nb;
}

class TicTacToeView {
    constructor(game, pseudo){
        this.morpion = game;
        changePlayer(this.morpion.currentPlayer + 1); // +1 pour avoir joueur 1 ou 2
        this.initEvent();
    }

    initEvent(){
        document.getElementById("fin").style.display = "none";
        
        let table = document.getElementById("morpion");
        let morpion = this.morpion;
        for(let i=0; i<3; i++) {
            for(let j=0; j<3; j++) {
                table.firstElementChild.children[i].children[j].addEventListener("click", function(){
                    playEvent(morpion, this, j, i);
                });
            }
        }
        document.getElementById("reset").addEventListener("click", function(){
            morpion.reset();
        });
        document.getElementById("close").addEventListener("click", function(){
            closealert();
        });
        
    }

}

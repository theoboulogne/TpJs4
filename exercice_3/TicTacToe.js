let test =  (function(){
    function ligne(grid) 
        {
            for(let j=0; j<3; j++){
                let val = grid[0][j];
                if(val != undefined) for(let i=1; i<3; i++){
                    if(val != grid[i][j]) break; // pas alligné
                    else if(i==2) return val// alligné
                }
            }
            return 2;
        }
    function colonne(grid)
        {
            for(let j=0; j<3; j++){
                let val = grid[j][0];
                if(val != undefined) for(let i=1; i<3; i++){
                    if(val != grid[j][i]) break; // pas alligné
                    else if(i==2) return val; // alligné
                }
            }
            return 2;
        }
    function diagonale (grid) 
        {
            let val = grid[0][0];
            if(val != undefined) for(let i=1; i<3; i++){
                if(val != grid[i][i]){
                    break; // pas alligné
                }
                else if(i==2){ // alligné
                    return val
                }
            }

            val = grid[0][2];
            if(val != undefined) for(let i=1; i<3; i++){
                if(val != grid[i][2-i]){
                    break; // pas alligné
                }
                else if(i==2){ // alligné
                    return val
                }
            }

            return 2; // si pas alligné
        }
    return{
        Fin : (grid) =>
        {   // On enregistre en mémoire pour réduire le nombre d'appel de fonction en cas de renvoi
            let tmp = diagonale(grid); 
            if(tmp == 2) tmp = ligne(grid);
            if(tmp == 2) tmp = colonne(grid);

            if(tmp !=2) return tmp;
            return undefined;
        },
        CaseLibre : (grid) => {
            for(let i=0; i<3; i++) for(let j=0; j<3; j++){
                if(grid[i][j]==undefined) return false; // si case libre
            }
            return true; // si terrain plein
        },
    }
})();

class TicTacToe extends Observable {
    constructor(){
        super();

        this.grid = [];// Déclaration du tableau
        for(let i=0; i<3; i++) this.grid[i] = [];

        this.reset(); // Reset pour définir le currentPlayer ainsi que pour initialiser la grid
    }
    
    switchCurrentPlayer(){
        if(this.getCurrentPlayer()==0) this.currentPlayer = 1;
        else this.currentPlayer = 0;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }
    
    getCaseState(x, y) {
        return this.grid[x][y];
    }

    setGridUndefined(){//Init Grid sur undefined
        for(let i=0; i<3; i++) for(let j=0; j<3; j++){
            this.grid[i][j]=undefined; //On définit toutes les cases sur undefined
        }
    }

    reset(){
        this.currentPlayer = 0;//Init CurrentPlayer
        this.setGridUndefined();//Init Grid
    }

    play(x, y){//On joue le coût et on change le joueur actuel
        this.grid[x][y] = this.getCurrentPlayer();
        this.switchCurrentPlayer();
    }
    
    hasWinner(){
        if(this.getWinner()!=undefined) return true;
        else return false;
    }

    getWinner() {
        return test.Fin(this.grid);
    }

    isFinished(){
        if(this.hasWinner()) return true; // si joueur a gagné
        return test.CaseLibre(this.grid);
    }

}
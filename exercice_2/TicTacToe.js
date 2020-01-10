var Fin =  (function(){
    return{
        ligne : (grid, y) => 
        {
            let val = grid[0][y];
            for(let i=1; i<3; i++){
                if(val != grid[i][y]){
                    return false; // pas alligné
                }
            }
            return true;
        },
        colonne : (grid, x) => 
        {
            let val = grid[x][0];
            for(let i=1; i<3; i++){
                if(val != grid[x][i]){
                    return false; // pas alligné
                }
            }
            return true;
        },
        diagonale : (grid) => 
        {
            let val = grid[0][0];
            for(let i=1; i<3; i++){
                if(val != grid[i][i]){
                    break; // pas alligné
                }
                else if(i==2){ // alligné
                    return true
                }
            }

            val = grid[0][2];
            for(let i=1; i<3; i++){
                if(val != grid[i][2-i]){
                    break; // pas alligné
                }
                else if(i==2){ // alligné
                    return true
                }
            }

            return false; // si pas alligné
        },
    }
})();


class TicTacToe extends Observable {
    constructor(){
        //Init CurrentPlayer
        this.currentPlayer = 0;

        //Init Grid
        this.grid = [];
        for(let i=0; i<3; i++){
            this.grid[i] = [];
            for(let j=0; j<3; j++){
                //On définit toutes les cases sur undefined
                this.grid[i][j]=undefined;
            }
        }

    }
    
    getCurrentPlayer(){
        return this.currentPlayer;
    }
    getCaseState(x, y){
        return this.grid[x][y];
    }
    reset(){
        this = new TicTacToe();
    }

    play(x, y){
        //On joue le coût et on change le joueur actuel
        this.grid[x][y] = this.getCurrentPlayer();

        if(this.getCurrentPlayer()==0) this.currentPlayer++;
        else this.currentPlayer = 0;
    }
    
    hasWinner(){
        if(Fin.diagonale(this.grid)) return true;
        for(let i=0; i<3; i++){
            if(Fin.ligne(this.grid, i)) return true;
            if(Fin.colonne(this.grid, i)) return true;
        }
        return false;
    }
    
    getWinner(){
        if(Fin.diagonale(this.grid)) return this.getCaseState(1,1);
        for(let i=0; i<3; i++){
            if(Fin.ligne(this.grid, i)) return this.getCaseState(1,i);
            if(Fin.colonne(this.grid, i)) return this.getCaseState(i,1);
        }
        return undefined;
    }

    isFinished(){
        if(this.hasWinner()) return true; // joueur a gagné
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(this.grid[i][j]==undefined){
                    return false; // case libre
                }
            }
        }
        return true; // terrain plein
    }

}

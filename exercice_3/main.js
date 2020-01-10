(function() {
	let game = new TicTacToe();
    let view = new TicTacToeView(game, 'morpion1');
})();

class TicTacToeView {
    constructor(){

    }

    play()
    initEvent(){
        let table = document.getElementById("morpion");
        for(let i=0; i<3; i++) {
            table.children[i].addEventListener(click, );
        }
    }
}

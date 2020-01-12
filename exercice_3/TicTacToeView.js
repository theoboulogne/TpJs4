
// Fonction jouée lors d'un clic de souris
function playEvent(morpion, x, y){
    if(morpion.getCaseState(x,y)==undefined && !morpion.isFinished()){

        console.log("Joueur " + (morpion.currentPlayer+1) + " a joué en " + x + "," + y);
        morpion.play(x,y);//Coût joué

        // Affichage Graphique
        image.Morpion(morpion.currentPlayer - 1, "img/x.png", "img/o.png", get.Case(x, y), "game") 
        // -1 car il vient d'être inversé et que la fonction compare à 0
        edit.Html(get.Id("player_number"), morpion.currentPlayer + 1); 
        // +1 pour avoir Joueur 1 et 2
        
        // Test de Fin
        if(!morpion.isFinished()) return; 
        else if (morpion.hasWinner()) {
            alerte.OpenWin(morpion.getWinner()+1);
            console.log("Joueur " + (morpion.getWinner()+1) + " a gagné la partie");
        }
        else {
            alerte.OpenFull();
        }

        // On reset la partie
        bouton.Reset(morpion);
    }
}

// Modules des éléments spécifiques
let alerte =  (function(){
    
    function ouvrir(id, messagelog){
        let alert = get.Id(id);
        if(alert.style.display === "none"){
            if (messagelog != undefined) console.log(messagelog)
            alert.style.display = "block";
        }
    }
    function fermer(id, messagelog){
        alert = get.Id(id);
        if(alert.style.display != "none") {
            if (messagelog != undefined ) console.log(messagelog)
            alert.style.display = "none";
        }
    }
    return{
        OpenWin : (nb) => {
            ouvrir("gagner", "- Affichage de l'alerte gagnant")
            fermer("plein", "- Fermeture de l'alerte carte pleine")
            edit.Html(get.Id("gagnant"), nb);
        },
        OpenFull : () => {
            ouvrir("plein", "- Affichage de l'alerte carte pleine")
            fermer("gagner", "- Fermeture de l'alerte gagnant")
        },
        CloseWin : () => {
            fermer("gagner", "- Fermeture de l'alerte gagnant")
        },  
        CloseFull : () => {
            fermer("plein", "- Fermeture de l'alerte carte pleine")
        },
        CloseAll : () => { //Version avec un seul message pour ne pas trop surchager la console
            fermer("gagner", "- Fermeture de toutes les alertes");
            fermer("plein");
        },
    }
})();
let bouton =  (function(){
    function boutonload(){
        //Affichage du bouton
        let reset = get.Id("reset")
        edit.Html(reset, "Chargement..    ", true);
        edit.Attribute(reset, "class", "btn btn-primary");
        
        reset.appendChild(create.Spinner("load"));//Ajout du spinner
    }
    function boutonreset(){
        edit.Remove("game");//Reset du jeu graphiquement
        
        //Affichage du bouton de reset
        let reset = get.Id("reset")
        edit.Html(reset, "Réinitialisation", false);
        edit.Attribute(reset, "class", "btn btn-danger");

        edit.Remove("load");//On retire le spinner
    }
    return{
        Reset : (morpion) =>
        {   //Timeout de 1800 pour laisser un délai à la fin de la partie 
            //et laisser le bouton "Chargement" en cours
            boutonload();
            console.log("- Réinitialisation en cours");
            setTimeout(() => {
                morpion.reset()
                boutonreset()
                edit.Html(get.Id("player_number"), morpion.currentPlayer + 1);
            }, 1800);
        },
    }
})();
let image =  (function(){
    function Src(img, lastPlayer, srcx, srco){
        if(lastPlayer==0) img.src = srcx;
        else img.src = srco;
        return img; // pour éviter la création d'une variable tampon
    }
    return{
        Morpion : (lastPlayer, srcx, srco, parent, id) => {
            parent.appendChild(Src(create.Element("img", id), lastPlayer, srcx, srco));
        },
    }
})();

// Modules de modification de la page
let create =  (function(){
    return{
        Element : (type, id) => {
            let renvoi = document.createElement(type);
            if (id != undefined) edit.Attribute(renvoi, "id", id);
            return renvoi
        },
        Spinner : (id) => {
            let spinner = create.Element("span", id);
            edit.Attribute(spinner, "class", "spinner-border spinner-border-sm");
            edit.Attribute(spinner, "role", "status");
            edit.Attribute(spinner, "aria-hidden", "true");
            return spinner;
        },
    }
})();
let get =  (function(){
    return{
        Case : (x, y) => {
            return get.Id("morpion").firstElementChild.children[y].children[x];
        },
        Id : (id) => {
            return document.getElementById(id);
        },
    }
})();
let edit =  (function(){
    return{
        Remove : (id) => {
            while(get.Id(id)!=undefined){
                get.Id(id).remove();
            }
        },
        Attribute : (elem, Attributetype, Attributecontent) => {
            elem.setAttribute(Attributetype, Attributecontent);
        },
        Html : (elem, Htmlcontent, disable) => {
            elem.innerHTML = Htmlcontent; 
            if (disable != undefined) elem.disabled = disable;
        },
        Event : (elem, callback) => {
            elem.addEventListener("click", callback);
        },
    }
})();

class TicTacToeView {
    constructor(game, a_voir){
        edit.Html(get.Id("player_number"), game.currentPlayer + 1); // +1 pour avoir joueur 1 ou 2  -> |||| a deplacer ||||
        this.initEvent(game);
    }

    initEvent(morpion){
        alerte.CloseAll(); // On ferme les alertes au début
        
        for(let i=0; i<3; i++) for(let j=0; j<3; j++) {
            edit.Event(get.Case(j, i), function(){playEvent(morpion, j, i);})
        }

        edit.Event(get.Id("reset"), function(){alerte.CloseAll(); bouton.Reset(morpion);})
        edit.Event(get.Id("closeWin"), function(){alerte.CloseWin();})
        edit.Event(get.Id("closeFull"), function(){alerte.CloseFull();})
    }
}





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
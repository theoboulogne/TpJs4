
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
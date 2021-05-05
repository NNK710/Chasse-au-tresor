// définitions des variable contenant le html servant a générer le tableau
let recup = document.getElementById("tab")
let debutTab = "<table>"
let debutLigne = "<tr>"
let debutCase = "<td onclick = 'clic(this.id)' class = 'cases' id = c"
let milieuCase = "-"
let finMilieuCase = ">"
let finTab = "</table>"
let finLigne = "</tr>"
let finCase = "</td>"
// creation de la grille sur la carte
function tab(taille){
    let total = debutTab
    //génération du tableau avec l'id des coordonnées
    for (let a = 0; a < taille; a++){
        total = total+debutLigne
        for (let b = 0; b < taille; b++){
            total = total + debutCase + a + milieuCase + b + finMilieuCase + finCase //coordonnées a-b
        }
        total = total+finLigne
    }
    total = total+finTab
    recup.innerHTML = total
}

let dejaClic = []
let caseClicX 
let caseClicY
var block

function clic(id){// fonction qui récupère l'id de la case qui vient d'etre clicker
    block = document.getElementById(id);
    caseClicX = id.substr(3, 3)
    caseClicY = id.substr(1, 1)
    if (posTresor == id){
        document.getElementById("rep").innerHTML = eventt[99] // phrase de reponse en cas de victoire
        document.getElementById(id).style.backgroundColor = "rgba(0, 0, 255, 0.4)"// affichage de la case du trésor en bleu
    }
    else if(caseClicY == posTresorY || caseClicX == posTresorX){
        // document.getElementById(id).style.backgroundColor = "rgba(0, 255, 0, 0.4)"
        document.getElementById(id).style.backgroundImage = "url('croix.png')";//croix quand la lagitude ou la latitude est trouvée
        deuxClic(id)
    }
    else{
        deuxClic(id)
        simil = false
    }
}

let compteur = 0

function deuxClic(id){ //fonction permettant de savoir si case clicker a déjà été clicker ou non
    for (i = 0; i < 100; i++){
        if (dejaClic[i] == id){
            document.getElementById("rep").innerHTML = caseDejaClic // message d'erreur en cas de clic sur une case deja clic
            simil = true
        }
    }
    if(simil == false){ //sinon éxécuter le reste 
        dejaClic[compteur] = id
        compteur++ 
        choixEvent(id)   
    }
    
}

let posTresor
let posTresorX
let posTresorY

function emplacementTresor(){   //fonction qui place le trésort aléatoirement sur la carte
    posTresorX = Math.floor(Math.random()*10)   //chiffre aléatoire des X
    posTresorY = Math.floor(Math.random()*10)   //chiffre aléatoire des Y
    posTresor = "c"+posTresorY+"-"+posTresorX   //concaténation
    console.log(posTresor)
}

//évènement sans impact sur le score ou la partie
let noImpact = ["Il n'y a rien ici... Vous pouvez continuer votre chemin.",
    "Le vent du nord se lève.. L'air se raffraichi mais vous pouvez continuer.",
    "Un animal étripé est sur votre chemin, des relants de votre repas remontent, vous fuyiez la zone pour continuer",
    "Vous avez mangé du sable en croyant voir un oasis, fuyiez cette zone avant de faire une insolation",
    "Vous vous rendez compte que des vautours tournoient au-dessus de vous, vous devriez vous dépechez", 1]

let malus = ["Vous vous êtes coincé dans un sable mouvant, vous mettez une journée a en sortir",
    "Vous tombez en panne d'essence, vous devez vous rendre dans la ville la plus proche.. Cela vous fait perdre une journée",2]

let grosMalus = ["Des Indiens vous attaquent, après les avoirs semés vous mettez deux jours a retrouvez votre chemin.", 3]

let bonus = ["Vous trouvez un sac de survie vous permettant de passer quelques nuit en toute sécurité (ou presque), cela vous fait gagner deux jours",0]

let grosBonus = ["Vous trouvez une boussole à moitier enfouie dans le sable, elle vous permet de retrouver votre chemin plus vite, cela vous fait gagner un jours",-1]

let mort = ["Vous marchez sur une mine la mort vous a rattrapez plus vite que prévus...",
    "Un piège a ours se referme sur votre jambe vous laissant seul dans le désert du Colorado en attandant une mort certaine",0]

//creation de la class evenement pour tirer les evenements au hasard
class Evenement {
    #nomEvenement = "";
    #poidsEvenement = 0;

    //construction de la class
    constructor(nomEvenement, poidsEvenement){
        this.#nomEvenement = nomEvenement;
        this.#poidsEvenement = poidsEvenement;
    }

    //méthode sur le nom 
    get NomEvenement(){
        return this.#nomEvenement;
    }
    set NomEvenement(nouveauNomEvenement){
        this.#nomEvenement = nouveauNomEvenement
    }

    //méthode sur le poids 
    get PoidsEvenement(){
        return this.#poidsEvenement;
    }
    set PoidsEvenement(nouveauPoidsEvenement){
        this.#poidsEvenement = nouveauPoidsEvenement;
    }
}

function choixEven(){

}

//fonction pour générer la liste des évenement
function collection(){
    let listeEvent = [];
    for (let i=0;i<50;i++){
        listeEvent.push(new Evenement(noImpact[1],noImpact[0]))
    }
    Affichage(listeEvent)
}


//affichage d'une collection d'objet Score
function Affichage(listeEvent){
    for (let i=0;i<100;i++){
        unEvent = listeEvent[i]
        console.log("nom : ", unEvent.NomEvenement, "poids: ", unEvent.PoidsEvenement);
    }
    document.getElementById("rep").innerHTML = unEvent.NomEvenement
}

collection()
emplacementTresor()
tab(10)

document.getElementById(id).style.backgroundColor = "rgba(255, 255, 0, 0.3)" //evenements sans importance donc case en jaune

document.getElementById(id).style.backgroundColor = "rgba(240, 80, 13, 0.5)" //petit maluce donc rouge clair

document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)" //petit bonus donc vert clair

document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)" //gros bonus donc vert foncé
       
document.getElementById(id).style.backgroundColor = "rgba(251, 69, 13, 0.5)" //gros malus donc rouge foncé
        
document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, 0.6)" //evenement conduisant a la mort donc case en rouge foncé

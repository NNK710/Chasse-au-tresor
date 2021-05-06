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

function clic(id){// fonction qui récupère l'id de la case qui vient d'etre clicker
    caseClicX = id.substr(3, 3)
    caseClicY = id.substr(1, 1)
    if (posTresor == id){ //verifie si la case clické est celle du trésor
        document.getElementById("rep").innerHTML = "Bravo vous avez trouvé le trésor !" // phrase de reponse en cas de victoire
        document.getElementById(id).style.backgroundColor = "rgba(0, 0, 255, 0.4)"// affichage de la case du trésor en bleu
    }
    else if(caseClicY == posTresorY || caseClicX == posTresorX){ 
        document.getElementById(id).style.backgroundImage = "url('croix.png')";//croix quand la lagitude ou la latitude est trouvée
        deuxClic(id)
    }
    else{
        deuxClic(id)
        simil = false
    }
}

let compteur = 0
let simil = false

function deuxClic(id){ //fonction permettant de savoir si case clicker a déjà été clicker ou non
    for (i = 0; i < 100; i++){
        if (dejaClic[i] == id){
            document.getElementById("rep").innerHTML = "Vous avez deja clicker sur cette case veuillez en choisir une autre" // message d'erreur en cas de clic sur une case deja clic
            simil = true
        }
    }
    console.log(simil)
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
let noImpact = [1,"Il n'y a rien ici... Vous pouvez continuer votre chemin.",
    "Le vent du nord se lève.. L'air se raffraichi mais vous pouvez continuer.",
    "Un animal étripé est sur votre chemin, des relants de votre repas remontent, vous fuyiez la zone pour continuer",
    "Vous avez mangé du sable en croyant voir un oasis, fuyiez cette zone avant de faire une insolation",
    "Vous vous rendez compte que des vautours tournoient au-dessus de vous, vous devriez vous dépechez"]

let malus = [2,"Vous vous êtes coincé dans un sable mouvant, vous mettez une journée a en sortir",
    "Vous tombez en panne d'essence, vous devez vous rendre dans la ville la plus proche.. Cela vous fait perdre une journée"]

let grosMalus = [3,"Des Indiens vous attaquent, après les avoirs semés vous mettez deux jours a retrouvez votre chemin."]

let bonus = [-1,"Vous trouvez une boussole à moitier enfouie dans le sable, elle vous permet de retrouver votre chemin plus vite, cela vous fait gagner un jours"]

let grosBonus = [0,"Vous trouvez un sac de survie vous permettant de passer quelques nuit en toute sécurité (ou presque), cela vous fait gagner deux jours"]

let mort = [1,"Vous marchez sur une mine la mort vous a rattrapez plus vite que prévus...",
    "Un piège a ours se referme sur votre jambe vous laissant seul dans le désert du Colorado en attandant une mort certaine"]

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

function getRandomInt(max) {// fonction qui genere un entier aléatoire en 0 et max
    return Math.floor(Math.random() * max);
}

let rand = 0
let messageCompteur = "Vous voyagez depuis <br>"
let jours = 0

function choixEvent(id){
    rand = getRandomInt(100);// tire un evenement aléatoire 
    if (rand < 80){
        rand = getRandomInt(listeNoImpact.length)
        document.getElementById("rep").innerHTML = listeNoImpact[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(255, 255, 0, 0.3)" //evenements sans importance donc case en jaune
        jours += listeNoImpact[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
    }
    else if (rand >= 80 && rand < 90) {
        rand = getRandomInt(listeMalus.length)
        document.getElementById("rep").innerHTML = listeMalus[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(240, 80, 13, 0.5)" //petit maluce donc rouge clair
        jours += listeMalus[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
    }
    else if (rand >= 90 && rand < 95){
        rand = getRandomInt(listeBonus.length)
        document.getElementById("rep").innerHTML = listeBonus[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)" //petit bonus donc vert clair
        jours += listeBonus[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
    }
    else if (rand == 95 || rand == 96){
        rand = getRandomInt(listeGrosBonus.length)
        document.getElementById("rep").innerHTML = listeGrosBonus[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)" //gros bonus donc vert foncé
        jours += listeGrosBonus[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
    }
    else if (rand == 97){
        rand = getRandomInt(listeGrosMalus.length)
        document.getElementById("rep").innerHTML = listeGrosMalus[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(251, 69, 13, 0.5)" //gros malus donc rouge foncé
        jours += listeGrosMalus[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
    }
    else{
        rand = getRandomInt(listeMort.length)
        document.getElementById("rep").innerHTML = listeMort[rand].NomEvenement
        document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, 0.6)" //evenement conduisant a la mort donc case en rouge foncé
        jours += listeMort[rand].PoidsEvenement
        document.getElementById("jours").innerHTML = messageCompteur+jours+" jours"
        window.location.href ='LostPage.html';
    }
}

let listeNoImpact = []
let listeMalus = []
let listeGrosMalus = []
let listeBonus = []
let listeGrosBonus = []
let listeMort = []

//fonction pour générer la liste des évenement
function collection(){
    
    for (let i=1; i<noImpact.length; i++){
        listeNoImpact.push(new Evenement(noImpact[i],noImpact[0]))
    }
    for (let i=1; i<malus.length; i++){
        listeMalus.push(new Evenement(malus[i],malus[0]))
    }
    for (let i=1; i<grosMalus.length; i++){
        listeGrosMalus.push(new Evenement(grosMalus[i],grosMalus[0]))
    }
    for (let i=1; i<bonus.length; i++){
        listeBonus.push(new Evenement(bonus[i],bonus[0]))
    }
    for (let i=1; i<grosBonus.length; i++){
        listeGrosBonus.push(new Evenement(grosBonus[i],grosBonus[0]))
    }
    for (let i=1; i<mort.length; i++){
        listeMort.push(new Evenement(mort[i],mort[0]))
    }
}


collection()
emplacementTresor()
tab(10)
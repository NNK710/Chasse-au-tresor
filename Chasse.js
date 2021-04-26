function tableau2D(x,y){
    var table = new Array(x)
    for (let i=0; i < table.length; i++){
        table[i] = new Array(y)
    }
    return table
}
console.log(tableau2D(3,2))
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
    for (let a = 0; a < taille; a++){
        total = total+debutLigne
        for (let b = 0; b < taille; b++){
            total = total + debutCase + a + milieuCase + b + finMilieuCase + finCase
        }
        total = total+finLigne
    }
    total = total+finTab
    recup.innerHTML = total
}

//évènement sans impact sur le score ou la partie
let nothing = "Il n'y a rien ici... Vous pouvez continuer votre chemin."
let vent = "Le vent du nord se lève.. L'air se raffraichi mais vous pouvez continuer."
let tripes = "Un animal étripé est sur votre chemin, des relants de votre repas remontent, vous fuyiez la zone pour continuer"
let oasis = "Vous avez mangé du sable en croyant voir un oasis, fuyiez cette zone avant de faire une insolation"
let vautours = "Vous vous rendez compte que des vautours tournoient au-dessus de vous, vous devriez vous dépechez"
//malus
let voiture = "Vous tombez en panne d'essence, vous devez vous rendre dans la ville la plus proche.. Cela vous fait perdre une journée"
let sable = "Vous vous êtes coincé dans un sable mouvant, vous mettez une journée a en sortir"
//gros malus
let indiens = "Des Indiens vous attaquent, après les avoirs semés vous mettez deux jours a retrouvez votre chemin."    
//bonus
let bousolle = "Alors que vous pensiez être perdu, vous trouvez une boussole à moitier enfouie qui vous permez de retrouver votre chemin"
//gros bonus
let sac = "Vous trouvez un sac de survie vous permettant de passer quelques nuit en toute sécurité (ou presque), cela vous fait gagner deux jours"
//défaite
let mine = "Vous marchez sur une mine la mort vous a rattrapez plus vite que prévus..."
let piege = "Un piège a ours se referme sur votre jambe vous laissant seul dans le désert du Colorado en attandant une mort certaine"
//victoire
let tresor = "Vous avez gagnez !"
//evenement secu
let caseDejaClic = "Vous avez déjà fouillez cette zone, allez en fouiller une autre.."

var eventt = new Array(100)
//je met tous les evenement dans un tableau afin de les tirer au sort
for (i = 0; i < 20; i++){
    eventt[i] = nothing
}
for (i = 20; i < 35; i++){
    eventt[i] = vent
}
for (i = 35; i < 50; i++){
    eventt[i] = tripes
}
for (i = 50; i < 65; i++){
    eventt[i] = oasis
}
for (i = 65; i < 80; i++){
    eventt[i] = vautours
}
for (i = 80; i < 85; i++){
    eventt[i] = voiture
}
for (i = 85; i < 90; i++){
    eventt[i] = sable
}
for (i = 90; i < 95; i++){
    eventt[i] = bousolle
}
eventt[95] = sac
eventt[96] = indiens
eventt[97] = mine 
eventt[98] = piege  
eventt[99] = tresor

console.log(eventt)

let rand
let done = []
let simil = false
let jours = 0

function evenement(id){
    compare()
    while(simil == true){ //tirge d'un nombre aléatoire et on recommence jusqu'a avoir un nombre qui n'a jamais été tirer
        compare()
    }
    if(rand == 97 || rand == 98){
        document.getElementById(id).style.backgroundColor = "rgba(255, 0, 0, 0.6)" //evenement conduisant a la mort donc case en rouge
        document.getElementById("jours").innerHTML = "Vous n'avez pas trouver le trésor mais vous avez réussis à survivre "+jours+" jours"
    }
    else if(rand == 96){
        document.getElementById(id).style.backgroundColor = "rgba(251, 69, 13, 0.5)"
        jours += 3
        document.getElementById("jours").innerHTML = "Vous voyagez depuis <br>"+jours+" jours"
    }
    else if(rand == 95){
        document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)"
        jours = jours - 1
        document.getElementById("jours").innerHTML = "Vous voyagez depuis <br>"+jours+" jours"
    }
    else if(rand == 90 || rand == 91 || rand == 92 || rand == 93 || rand == 94){
        document.getElementById(id).style.backgroundColor = "rgba(0, 214, 0, 0.4)"
        document.getElementById("jours").innerHTML = "Vous voyagez depuis <br>"+jours+" jours"
    }
    else if(rand == 80 || rand == 81 || rand == 82 || rand == 83 || rand == 84 || rand == 85 || rand == 86 || rand == 87 || rand == 88 || rand == 89){
        document.getElementById(id).style.backgroundColor = "rgba(240, 80, 13, 0.5)"
        jours += 2
        document.getElementById("jours").innerHTML = "Vous voyagez depuis <br>"+jours+" jours"
    }
    else{
        document.getElementById(id).style.backgroundColor = "rgba(255, 255, 0, 0.3)" //evenements sans importance donc case en jaune
        jours++ //compteur du nombres de jours
        document.getElementById("jours").innerHTML = "Vous voyagez depuis <br>"+jours+" jours"
    }
    done.push(rand) //liste des nombre déjà tirer
    console.log(done)
    document.getElementById("rep").innerHTML = eventt[rand] //affichage de l'évènement tirer dans le div "rep"
}

function compare(){//choisi un nombre aléatoire entre 0 et 98 pour savoir quelle evenement est sur la case qui vient detre clicker
    simil = false
    rand = Math.floor(Math.random()*99)
    for (i = 0; i < 100; i++){
        if(rand == done[i]){ //retire un nombre si il a deja été tirer pour ne pas avoir plusieur fois le meme evenement 
            simil = true
        }
    }
}

let dejaClic = []
let caseClicX 
let caseClicY
var img = document.createElement("img");
img.src = "test.png";
var block

function clic(id){// fonction qui récupère l'id de la case qui vient d'etre clicker
    block = document.getElementById(id);
    caseClicX = id.substr(3, 3)
    caseClicY = id.substr(1, 1)
    console.log(caseClicX)
    console.log(caseClicY)
    if (posTresor == id){
        document.getElementById("rep").innerHTML = eventt[99] // phrase de reponse en cas de victoire
        document.getElementById(id).style.backgroundColor = "rgba(0, 0, 255, 0.4)"// affichage de la case du trésor en bleu
    }
    else if(caseClicY == posTresorY || caseClicX == posTresorX){
        // document.getElementById(id).style.backgroundColor = "rgba(0, 255, 0, 0.4)"
        document.getElementById(id).style.backgroundImage = "url('croix.png')";//croix quand la lagitude ou la latitude est trouvée
        deuxClic(id)
        // block.appendChild(img);
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
        console.log(dejaClic)
        evenement(id)   
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

emplacementTresor()
tab(10)
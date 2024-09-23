let horloge = document.getElementById("horloge");
let statut = document.getElementById("statut");
let boutonStart = document.getElementById("start");
let minRepos = document.getElementById("minRepos");
let secRepos = document.getElementById("secRepos");
let minTravail = document.getElementById("minTravail");
let secTravail = document.getElementById("secTravail");

// let boutonReset = document.getElementById("reset"); //TODO les boutons reset et start sont les memes

// temps du chrono mis à jour
let tpsActuel = {minutes:0, secondes:0}; 

// ces temps sont seulement changés manuellement par l'utilisateur
let tpsTravail = {minutes : 20, secondes : 0}; 
let tpsRepos = {minutes : 10, secondes : 0};

let travaille = true; //utilisé pour savoir si l'utilisateur est en repos ou en travail
let estLance = false; //true si le chrono est lancé, false sinon

let minuteur; // stock le Timeout, permet de réinitialiser le chrono


/**
 * Fonction utilisée pour passer du statut "travil" à "repos" et inversement
 */
function changementStatut(){
    if(travaille){
        tpsActuel.secondes = tpsRepos.secondes;
        tpsActuel.minutes = tpsRepos.minutes;

        statut.textContent = 'Repos';
        document.getElementById("body").style.background = "darkolivegreen";


        travaille = false;
    } else {
        tpsActuel.secondes = tpsTravail.secondes;
        tpsActuel.minutes = tpsTravail.minutes;

        statut.textContent = 'Travail';
        document.getElementById("body").style.background = "crimson";

        travaille = true;
    }
}


/**
 * Démarre le chronomètre, et transforme le bouton start en bouton reset
 */
function lancerChrono(){
    minuteur = setInterval(()=>{
        if(tpsActuel.secondes > 0 || tpsActuel.minutes > 0){
            tpsActuel.secondes --;
            if(tpsActuel.secondes < 0){
                tpsActuel.secondes = 59;
                tpsActuel.minutes --;
            }
        } else {
            changementStatut();
        }

        rafraichitHorloge(); 
    }, 1000);

    
    boutonStart.className = "fa-solid fa-rotate"; //mets l'icone du bouton sur reset
}

/**
 * Réinitialise le chrono, rafraichit l'horloge et remets le style de la page sur le mode "travail"
 */
function reinitialiserChrono(){
    clearInterval(minuteur);
    tpsActuel.minutes = tpsTravail.minutes;
    tpsActuel.secondes = tpsTravail.secondes;
    
    travaille = true;

    statut.textContent = 'Travail';
    document.getElementById("body").style.background = "crimson";
    boutonStart.className = "fa-solid fa-circle-play"; //mets l'icone du bouton sur start

    rafraichitHorloge();
}


/**
 * synchronise l'affichage du chrono avec tpsActuel
 */
function rafraichitHorloge(){
    let strMin = tpsActuel.minutes.toString();
    let strSec = tpsActuel.secondes.toString();

    horloge.textContent = strMin.padStart(2, '0')+":"+strSec.padStart(2, '0');
}

/**
 * remets tpsTravail et tpsRepos à la même valeur que les inputs
 * toujours tout faire en même temps permets d'assurer la synchronisation
 */
function rafraichitTemps(){
    tpsTravail.secondes = parseInt(secTravail.value);
    tpsTravail.minutes = parseInt(minTravail.value);
    tpsRepos.secondes = parseInt(secRepos.value);
    tpsRepos.minutes = parseInt(minRepos.value);

    if(!estLance){
        reinitialiserChrono();
    }
}


boutonStart.addEventListener("click", ()=> {
    if(estLance){
        reinitialiserChrono();
        estLance = false;
    
    } else {
        lancerChrono();
        estLance = true;
    }
});

// Champs de formulaire (utilisés pour personnaliser le temps de travail et de repos)

secTravail.addEventListener("change", ()=>{
    rafraichitTemps();

});

minTravail.addEventListener("change", ()=>{
    rafraichitTemps();

});

secRepos.addEventListener("change", ()=>{
    rafraichitTemps();

});

minRepos.addEventListener("change", ()=>{
    rafraichitTemps();
});


// INITIALISATION
tpsActuel.minutes = tpsTravail.minutes;
tpsActuel.secondes = tpsTravail.secondes;
rafraichitHorloge();
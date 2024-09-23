let horloge = document.getElementById("horloge");
let statut = document.getElementById("statut");
let boutonStart = document.getElementById("start");
let minRepos = document.getElementById("minRepos");
let secRepos = document.getElementById("secRepos");
let minTravail = document.getElementById("minTravail");
let secTravail = document.getElementById("secTravail");

// let boutonReset = document.getElementById("reset"); //TODO les boutons reset et start sont les memes

let tpsActuel = {minutes:0, secondes:0}; // temps du chrono
let tpsTravail = {minutes : 0, secondes : 3};
let tpsRepos = {minutes : 10, secondes : 0};
let travaille = true;
let estLance = false;
let minuteur; // stock le Timeout, permet de réinitialiser le chrono






function changementStatut(){
    if(travaille){
        tpsActuel.secondes = tpsRepos.secondes;
        tpsActuel.minutes = tpsRepos.minutes;

        statut.textContent = 'Repos';

        travaille = false;
    } else {
        tpsActuel.secondes = tpsTravail.secondes;
        tpsActuel.minutes = tpsTravail.minutes;

        statut.textContent = 'Travail';

        travaille = true;
    }
}



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
    }, 1000); // mettre 1000 pour une seconde

    boutonStart.textContent = "reset";
}

function reinitialiserChrono(){
    clearInterval(minuteur);
    tpsActuel.minutes = tpsTravail.minutes;
    tpsActuel.secondes = tpsTravail.secondes;
    travaille = true;

    boutonStart.textContent = "start";
}

function rafraichitHorloge(){
    let strMin = tpsActuel.minutes.toString();
    let strSec = tpsActuel.secondes.toString();

    horloge.textContent = strMin.padStart(2, '0')+":"+strSec.padStart(2, '0');
}


boutonStart.addEventListener("click", ()=> {
    if(estLance){
        reinitialiserChrono();
        estLance = false;
    rafraichitHorloge();
    } else {
        lancerChrono();
        estLance = true;
    }
});

secTravail.addEventListener("change", ()=>{
    tpsTravail.secondes = parseInt(secTravail.textContent);
    console.log("done");
});

// INITIALISATION
tpsActuel.minutes = tpsTravail.minutes;
tpsActuel.secondes = tpsTravail.secondes;
rafraichitHorloge();
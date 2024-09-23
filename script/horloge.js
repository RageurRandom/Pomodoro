let horloge = document.getElementById("horloge");
let start = document.getElementById("start");
let stop = document.getElementById("stop");

let tpsActuel = {minutes:0, secondes:0};
let tpsTravail = {minutes : 20, secondes : 0};
let tpsRepos = {minutes : 10, secondes : 0};

let minuteur;

function lancerChrono(){
    minuteur = setTimeout(()=>{
        tpsActuel.secondes --;
        if(tpsActuel.secondes < 0){
            tpsActuel.secondes = 0;
            tpsActuel.minutes --;
        }

        rafraichitHorloge(tpsActuel.minutes, tpsActuel.secondes);
    }, 10);

    while(tpsActuel.minutes > 0 && tpsActuel.secondes > 0){
        
        time
        console.log("tour fini");
        }
}

function rafraichitHorloge(minutes, secondes){
    horloge.textContent = minutes+":"+secondes;
}

// MAIN

rafraichitHorloge(tpsTravail.minutes, tpsTravail.secondes);

start.addEventListener("click", ()=> {
    tpsActuel = tpsTravail;
    console.log(tpsActuel.minutes + ":"+ tpsActuel.secondes);
    lancerChrono();
});

stop.addEventListener("click", ()=>{
    console.log("stop");
});
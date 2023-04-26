// img gratuites sur Kenney puis assets


// récupère balise résultat 
const divResultat = document.querySelector("#resultat"); 
// je mets du contenu dans cette balise resultat 
// divResultat.innerHTML = "coucou" // ok ça marche 

// après afficher les tab dedans 

// tableau multidimensionnel qui contient les cartes (images)
var tabJeu = [
    // 4 lignes initialisées à 0
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

// mélage de tous nos résultats - en dur 
/* var tabResultat = [
    [1, 4, 3, 4],
    [1, 2, 3, 2],
    [7, 8, 6, 5],
    [8, 7, 5, 6]
] */

var tabResultat = generetableauAleatoire(); 

var oldSelection = []; 

var nbAffiche = 0;

// est-ce qu'on peut cliquer sur un nouveau bouton ou pas ? 
var ready = true; 


afficherTableau();

function afficherTableau() {
    var txt = "";

    // parcourt le 1 tab avec ses 4 éléments 
    for(var i = 0; i < tabJeu.length; i++) {
        // génère code HTML pour chaque ligne ajoute un div à chaque tour soit 4
        txt += "<div>";
        // parcourt chaque ligne : tabJeu[i] est une ligne 
        for(var j = 0; j < tabJeu[i].length; j++) {
            // si la valeur est égale à 0 affiche un bouton sinon une image 
            if(tabJeu[i][j] === 0){
                // génère 4 boutons HTML par ligne - onClick=verif est fonction qui à l'évnt click verif si img correspondent (ligne i, col j)
                txt += "<button class='btn btn-primary m-2' style='width:100px;height:100px;' onClick='verif(\""+i+j+"\")'>Button</button>";
            } else {
                // génère l'image qui correspond au numéro 
                txt += "<img src='" + getImage(tabJeu[i][j]) + "' style='width:100px;height:100px' class='m-2'>";
            }
        }
        txt += "</div>";
    }
    // dans la div resultat 
    divResultat.innerHTML = txt;
}

// fonction pour générer une image qui correspond au numéro 
function getImage(valeur){
    // déclaration de la variable qui contient le chemin de l'image 
    var imgTxt = "image/";
    // switch qui teste la valeur et qui retourne une image en fonction - 8 paires 
    switch(valeur) {
        case 1 : imgTxt += "elephant.png";
        break;
        case 2 : imgTxt += "giraffe.png";
        break;
        case 3 : imgTxt += "hippo.png";
        break;
        case 4 : imgTxt += "monkey.png";
        break;
        case 5 : imgTxt += "panda.png";
        break;
        case 6 : imgTxt += "parrot.png";
        break;
        case 7 : imgTxt += "penguin.png";
        break;
        case 8 : imgTxt += "pig.png";
        break;
        default: console.log("Cas non pris en compte.");
    }
    // retourne img correspondante 
    return imgTxt; 
}


function verif(bouton) {
    if(ready) {
        nbAffiche++;
        
        // récupère ligne et col cliquées - substring: on découpe string et récupère 1er élément
        var ligne = bouton.substring(0, 1); // retourne string indice debut et fin
        var colonne = bouton.substring(2, 1);
        //console.log(ligne);
        //console.log(colonne); 
        
        tabJeu[ligne][colonne] = tabResultat[ligne][colonne]; 
        afficherTableau();
    
        // vérif combien de carte retournée : une fois ou deux fois 
        // si 2 cartes retournées verification - donc incrementer nbAffiche 
        if(nbAffiche > 1) {
            // on met ready à false car on ne peut plus cliquer sur 3e bouton
            ready = false;  // faire un timeout 
            setTimeout(() => {
                // verification : btn cliqué correspond au précédent clic
                if(tabJeu[ligne][colonne] !== tabResultat[oldSelection[0]][oldSelection[1]]){
                    // on réinitialise les 2 derniers clics
                    tabJeu[ligne][colonne] = 0; 
                    tabJeu[oldSelection[0]][oldSelection[1]] = 0;
                }
                afficherTableau();
                ready = true;

                // quand 2e carte retournée on réinitialise à 0
                nbAffiche = 0; 
                // conserver résultat de 1er bouton retourné 
                oldSelection = [ligne,colonne]; 
            }, 1000)
        } else {
            // conserver résultat de 1er bouton retourné 
            oldSelection = [ligne, colonne]; 
        }
    }
}

// génère un tab aléatoire 
function generetableauAleatoire(){
    var tab= [];
    var nbImagePosition = [0,0,0,0,0,0,0,0];

    for(var i = 0; i < 4; i++){
        //pour chaque ligne on génère un tab
        var ligne = [];

        // on génère les colonnes 
        for(var j = 0; j < 4; j++){

            // fin
            var fin = false; 

            // tant que fin est false 
            while(!fin){
                // pas de +1 car on commence à 0 
                var randomImage = Math.floor(Math.random() * 8);

                // pour éviter d'avoir plus de 2 images 
                if(nbImagePosition[randomImage] < 2) {
                    // on ajoute la valuer qu'on a généré aléatoirement 
                    ligne.push(randomImage +1); // +1 car img de 1 à 8
                    nbImagePosition[randomImage]++;
                    fin = true; 
                }
            }
        }

        // rajoute une ligne à la fin à mon tab (4 lignes)
        tab.push(ligne); 
    }
    
    return tab;
}
jQuery(document).ready(function($) {
    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    const srcAlbum = "albums/"; // emplacement des images des albums en grand


    /* C'est un commentaire. */
    // Lecture d'un album
    // console.log("Lecture d'un album");
    // var album = albums.get("5");
    // var serie = series.get(album.idSerie);
    // var auteur = auteurs.get(album.idAuteur);
    // console.log(album.titre + " " + serie.nom + " " + auteur.nom);




    // console.log("Liste des albums");
    // albums.forEach(album => {
    //     serie = series.get(album.idSerie);
    //     auteur = auteurs.get(album.idAuteur);
    //     console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom);
    //     card.innerHTML = auteur.nom + ", Album N°" + album.numero + " " + album.titre + ", Série:" + series.get(album.idSerie).nom;
    // });


    /*
    console.log("Liste des albums par série");
    for(var [idSerie, serie] of series.entries()) {
        // Recherche des albums de la série
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie) {
                console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
            }
        }
        
    }
    */

    /*
    console.log("Liste des albums par auteur");
    for(var [idAuteur, auteur] of auteurs.entries()) {
        // Recherche des albums de l'auteur
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteur) {
                console.log(auteur.nom+", Album N°"+album.numero+" "+album.titre+", Série:"+series.get(album.idSerie).nom);
            }
        }
        
    }
    */


    // Affichage des BD
    var txtSerie = document.getElementById("serie");
    var txtNumero = document.getElementById("numero");
    var txtTitre = document.getElementById("titre");
    var txtAuteur = document.getElementById("auteur");
    var txtPrix = document.getElementById("prix");
    var imgAlbum = document.getElementById("album");
    var imgAlbumMini = document.getElementById("albumMini");

    imgAlbum.addEventListener("error", function() {
        prbImg(this)
    });

    imgAlbumMini.addEventListener("error", function() {
        prbImg(this)
    });

    var id = document.getElementById("id");
    id.addEventListener("change", function() {
        getAlbum(this)
    });


    /**
     * Récupération de l'album par son id et appel de 
     * la fonction d'affichage
     * 
     * @param {number} num 
     */
    function getAlbum(num) {

        var album = albums.get(num.value);

        if (album === undefined) {
            txtSerie.value = "";
            txtNumero.value = "";
            txtTitre.value = "";
            txtAuteur.value = "";
            txtPrix.value = 0;

            afficheAlbums($("#albumMini"), $("#album"), albumDefaultMini, albumDefault);

        } else {

            var serie = series.get(album.idSerie);
            var auteur = auteurs.get(album.idAuteur);

            txtSerie.value = serie.nom;
            txtNumero.value = album.numero;
            txtTitre.value = album.titre;
            txtAuteur.value = auteur.nom;
            txtPrix.value = album.prix;

            var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

            // Utilisation d'une expression régulière pour supprimer 
            // les caractères non autorisés dans les noms de fichiers : '!?.":$
            nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

            afficheAlbums(
                $("#albumMini"),
                $("#album"),
                srcAlbumMini + nomFic + ".jpg",
                srcAlbum + nomFic + ".jpg"
            );

        }
    }

    /**
     * Affichage des images, les effets sont chainés et traités
     * en file d'attente par jQuery d'où les "stop()) et "clearQueue()" 
     * pour éviter l'accumulation d'effets si défilement rapide des albums.
     * 
     * @param {object jQuery} $albumMini 
     * @param {object jQuery} $album 
     * @param {string} nomFic 
     * @param {string} nomFicBig 
     */
    function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
        $album.stop(true, true).clearQueue().fadeOut(100, function() {
            $album.attr('src', nomFic);
            $albumMini.stop(true, true).clearQueue().fadeOut(150, function() {
                $albumMini.attr('src', nomFicMini);
                $albumMini.slideDown(200, function() {
                    $album.slideDown(200);
                });
            })
        });


    }

    /**
     * Affichage de l'image par défaut si le chargement de l'image de l'album
     * ne s'est pas bien passé
     * 
     * @param {object HTML} element 
     */








});


//////////////////////////////////////////////////////////////////FIN CODE GUILLAUME////////////////////////////////////////////////////////////////////////////////////////////////
let element = document.getElementById("card");
// METEO//
function buttonClickGET() {

    var queryLoc = document.getElementById("queryLoc").value;




    var url = "https://api.openweathermap.org/data/2.5/weather?q= " + queryLoc + " &appid=c21a75b667d6f7abb81f118dcf8d4611&units=metric"
        // 0f789aa757a1d5bda2f01f363ab9453c



    $.get(url, callBackGetSuccess).done(function() {
            //alert( "second success" );
        })
        .fail(function() {
            alert("error");
        })
        .always(function() {
            //alert( "finished" );
        });
}
var callBackGetSuccess = function(data) {
        var element = document.getElementById("zone_meteo");
        element.innerHTML = "La temperature est de " + data.main.temp + "°C";
    }
    //METEO//







// Dans un premier temps on va aller recupérer l'id de l'auteur selon la saisie utilisateur (qui sera un input)
function recherche() {
    var value = document.querySelector("#search")




    var idAuteurToSave = 0;
    for (var [idAuteur, auteur] of auteurs.entries()) {
        if (auteur.nom == value.value) { //remplacer le nom de l'auteur ici par le choix de l'utilisateur
            //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
            console.log("on est làààààààààà  " + idAuteur)
            idAuteurToSave = parseInt(idAuteur);
            break;
        }
    }
    // on a notre idAuteur, on fait notre petit filtre
    if (idAuteurToSave > 0) {
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteurToSave) {
                serie = series.get(album.idSerie);
                auteur = auteurs.get(album.idAuteur);
                console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom);
            }
        }
    }





}





function RechercheParSerie() {
    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit





    // var element = document.getElementById("card");

    element.innerHTML = " ";


    for (var [idSerie, serie] of series.entries()) {
        // Recherche des albums de la série
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie) {

                var element2 = document.createElement("div");
                element2.setAttribute("id", "card2")

                element2.innerHTML = "<div id:'texte'>" +
                    "<h1>" + serie.nom + "</h1>" +
                    " "

                +
                "<h5>" + " N°" + album.numero + "</h5>"

                +
                " "

                +
                "<h2>" + album.titre + "</h2>"

                +
                " "

                +
                "<h3>" + " Auteur:" + auteurs.get(album.idAuteur).nom + "</h3>"

                +
                " "

                +
                "<h4>" + "Prix :" + album.prix + "</h4>"

                +
                "</div>";


                var element3 = document.createElement("div");
                element3.setAttribute("id", "img")
                var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

                // Utilisation d'une expression régulière pour supprimer 
                // les caractères non autorisés dans les noms de fichiers : '!?.":$
                nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");



                element3.innerHTML = '<img src="' + srcAlbumMini + nomFic + ".jpg" + '"/>';

            }

        }
        element.appendChild(element2);
        element2.appendChild(element3);
    }
    console.log("hello");

}

function RechercheParAuteur() {

    element.innerHTML = " ";


    var element2 = document.createElement("div");
    element2.setAttribute("id", "card2")



    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    const srcAlbum = "albums/"; // emplacement des images des albums en grand

    console.log("Liste des albums par auteur");
    for (var [idAuteur, auteur] of auteurs.entries()) {
        // Recherche des albums de l'auteur
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteur) {

                var element2 = document.createElement("div");
                element2.setAttribute("id", "card2")
                console.log(auteur.nom + ", Album N°" + album.numero + " " + album.titre + ", Série:" + series.get(album.idSerie).nom);

                element2.innerHTML = "<div id:'texte'>" +
                    "<h1>" + auteur.nom + "</h1>" +
                    " "

                +
                "<h5>" + " N°" + album.numero + "</h5>"

                +
                " "

                +
                "<h2>" + " Série:" + series.get(album.idSerie).nom + "</h2>"

                +
                " "

                +
                "<h3>" + album.titre + "</h3>"


                +
                " "

                +
                "<h4>" + "Prix :" + album.prix + "</h4>"

                +
                "</div>";


                var element3 = document.createElement("div");
                element3.setAttribute("id", "img")
                var nomFic = series.get(album.idSerie).nom + "-" + album.numero + "-" + album.titre;


                // Utilisation d'une expression régulière pour supprimer 
                // les caractères non autorisés dans les noms de fichiers : '!?.":$
                nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");



                element3.innerHTML = '<img src="' + srcAlbumMini + nomFic + ".jpg" + '"/>';





            }

        }
        element.appendChild(element2);
        element2.appendChild(element3);



    }
}





function tousLesAlbums() {


    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    const srcAlbum = "albums/"; // emplacement des images des albums en grand




    // var element = document.getElementById("card");


    element.innerHTML = " ";

    albums.forEach(album => {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);


        var element2 = document.createElement("div");
        element2.setAttribute("id", "card2")

        element2.innerHTML = "<div id:'texte'>" +
            "<h1>" + album.titre + "</h1>" +
            " "

        +
        "<h5>" + " N°" + album.numero + "</h5>"

        +
        " "

        +
        "<h2>" + " Série:" + serie.nom + "</h2>"

        +
        " "

        +
        "<h3>" + " Auteur:" + auteur.nom + "</h3>"

        +
        " "

        +
        "<h4>" + "Prix :" + album.prix + "</h4>"

        +
        "</div>";



        var element3 = document.createElement("div");
        element3.setAttribute("id", "img")
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

        // Utilisation d'une expression régulière pour supprimer 
        // les caractères non autorisés dans les noms de fichiers : '!?.":$
        nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");



        element3.innerHTML = '<img src="' + srcAlbumMini + nomFic + ".jpg" + '"/>';




        element.appendChild(element2);
        element2.appendChild(element3);



    });






}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
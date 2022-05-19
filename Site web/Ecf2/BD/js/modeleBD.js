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


function serie() {
    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    const srcAlbum = "albums/"; // emplacement des images des albums en grand





    console.log("Liste des albums par série");

    var element = document.getElementById("card");


    for (var [idSerie, serie] of series.entries()) {
        // Recherche des albums de la série
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerie) {
                var element2 = document.createElement("p");
                element2.innerHTML = serie.nom + ", Album N°" + album.numero + " " + album.titre + ", Auteur:" + auteurs.get(album.idAuteur).nom;

                var element3 = document.createElement("div");
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

}






function tousLesAlbums() {
    const srcImg = "images/"; // emplacement des images de l'appli
    const albumDefaultMini = srcImg + "noComicsMini.jpeg";
    const albumDefault = srcImg + "noComics.jpeg";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    const srcAlbum = "albums/"; // emplacement des images des albums en grand









    console.log("Liste des albums");

    var element = document.getElementById("card");

    albums.forEach(album => {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom + album.prix);

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










// for (var [idAuteur, auteur] of auteurs.entries()) {
//     // Recherche des albums de l'auteur
//     for (var [idAlbum, album] of albums.entries()) {
//         if (album.idAuteur == idAuteur) {
//             console.log(auteur.nom + ", Album N°" + album.numero + " " + album.titre + ", Série:" + series.get(album.idSerie).nom);
//             card.innerHTML = auteur.nom + ", Album N°" + album.numero + " " + album.titre + ", Série:" + series.get(album.idSerie).nom;

//             document.body.append(card);






//         }
//     }


// }

// element2.innerHTML = '<div class = "container-image">' + '<img src = "' + srcAlbum + nomFic + ".jpg" + '"/>' + "</div>"
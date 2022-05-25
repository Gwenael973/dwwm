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
} // METEO//
var callBackGetSuccess = function(data) {
        var element = document.getElementById("zone_meteo");
        element.innerHTML = "La temperature est de " + data.main.temp + "°C";
    }
    //  FIN    METEO//

//CHECKBOX/////////////

$(document).ready(function() {

    $('#checkAuteur').click(function() {
        $('.checkSerie').prop('checked', false);
    });
    $('.checkSerie').click(function() { //CHECKBOX/////////////
        if ($('.checkSerie').is(':checked')) {
            $('#checkAuteur').prop('checked', false);
        } else {
            $('#checkAuteur').prop('checked', true);

        }
    });

});

// FIN CHECKBOX/////////////


// RECHERCHE//////////
function rechercheAuteur() {
    element.innerHTML = " ";
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    var value = document.getElementById("recherchee").value;
    var idAuteurToSave = 0;



    for (var [idAuteur, auteur] of auteurs.entries()) {
        if (auteur.nom == value) { //remplacer le nom de l'auteur ici par le choix de l'utilisateur
            //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
            console.log("on est làààààààààà  " + idAuteur) // RECHERCHE//////////
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
                console.log(album.titre + " Série:" + serie.nom + " Auteur:" + auteur.nom);
                var element2 = document.createElement("div");

                element2.setAttribute("id", "card2")




                element2.innerHTML =
                    "<div id:'texte'>" +
                    "<h1>" + album.titre + "</h1>" +
                    " "

                +

                " "

                +
                "<h2>" + " Série:" + serie.nom + "</h2>"

                +
                " "

                +
                "<h3>" + "Auteur : " + auteur.nom + "</h3>"


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
                var element4 = document.createElement("button");
                element4.setAttribute("id", "btnAchat")
                element4.innerHTML = "Ajouter au panier";
                element.appendChild(element2);
                element2.appendChild(element3);
                element2.appendChild(element4);
            }
        }
    }

}

function rechercheSerie() {
    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    element.innerHTML = " ";

    var value = document.getElementById("recherchee").value;
    console.log("Hey je fonctionne par serie");
    var idSerieToSave = 0;


    for (var [idSerie, serie] of series.entries()) {
        if (serie.nom == value) { //remplacer le nom de l'auteur ici par le choix de l'utilisateur
            //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
            console.log("on est làààààààààà  " + idSerie) // RECHERCHE//////////
            idSerieToSave = parseInt(idSerie);
            break;
        }
    }
    if (idSerieToSave > 0) {
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerieToSave) {
                serie = series.get(album.idSerie);
                auteur = auteurs.get(album.idAuteur);
                console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom);
                var element2 = document.createElement("div");

                element2.setAttribute("id", "card2")




                element2.innerHTML =
                    "<div id:'texte'>" +
                    "<h1>" + album.titre + "</h1>" +
                    " "

                +

                " "

                +
                "<h2>" + " Série:" + serie.nom + "</h2>"

                +
                " "

                +
                "<h3>" + "Auteur : " + auteur.nom + "</h3>"


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
                var element4 = document.createElement("button");
                element4.setAttribute("id", "btnAchat")
                element4.innerHTML = "Ajouter au panier";
                element.appendChild(element2);
                element2.appendChild(element3);
                element2.appendChild(element4);


            }

        }

    }

}








function recherche() {
    var checkauteur = document.getElementById("checkAuteur")
    var checkserie = document.getElementById("checkSerie");


    if (checkauteur.checked == true) {
        rechercheAuteur();

    } else {
        rechercheSerie();

    }





}

//  FIN FONCTION RECHERCHE//////////






function RechercheParSerie() {


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
                var element4 = document.createElement("button");
                element4.setAttribute("id", "btnAchat")
                element4.innerHTML = "Ajouter au panier";


            }

        }
        element.appendChild(element2);
        element2.appendChild(element3);
        element2.appendChild(element4);
    }


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


    for (var [idAuteur, auteur] of auteurs.entries()) {
        // Recherche des albums de l'auteur
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteur) {

                var element2 = document.createElement("div");
                element2.setAttribute("id", "card2")
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
                var element4 = document.createElement("button");
                element4.setAttribute("id", "btnAchat")
                element4.innerHTML = "Ajouter au panier";







            }

        }
        element.appendChild(element2);
        element2.appendChild(element3);
        element2.appendChild(element4);



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


        var element4 = document.createElement("p");

        element4.innerHTML = '<a href="#" data-name="Banana" data-price="1.22" class="add-to-cart btn btn-primary">Add to cart</a>';




        element.appendChild(element2);
        element2.appendChild(element3);
        element2.appendChild(element4);



    });






}

function tousLesAlbums2() {

    const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
    var cardParent = document.getElementById("cardParent");
    element.innerHTML = ""
    var element2 = document.createElement("div");
    element2.setAttribute("class", "card-block")

    element2.innerHTML =
        '<a href="#" data-name="Orange" data-price="0.5" class="add-to-cart btn btn-primary">Add to cart</a>';


    cardParent.appendChild(element2);







}












// Get the modal
var modal1 = document.getElementById("myModal1");

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
    modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
    modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal1) {
        modal1.style.display = "none";
    }
}





// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;
    }

    // Save cart
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
        cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
        loadCart();
    }


    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function(name, price, count) {
            for (var item in cart) {
                if (cart[item].name === name) {
                    cart[item].count++;
                    saveCart();
                    return;
                }
            }
            var item = new Item(name, price, count);
            cart.push(item);
            saveCart();
        }
        // Set count from item
    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart[item].count--;
                if (cart[item].count === 0) {
                    cart.splice(item, 1);
                }
                break;
            }
        }
        saveCart();
    }

    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
        for (var item in cart) {
            if (cart[item].name === name) {
                cart.splice(item, 1);
                break;
            }
        }
        saveCart();
    }

    // Clear cart
    obj.clearCart = function() {
        cart = [];
        saveCart();
    }

    // Count cart 
    obj.totalCount = function() {
        var totalCount = 0;
        for (var item in cart) {
            totalCount += cart[item].count;
        }
        return totalCount;
    }

    // Total cart
    obj.totalCart = function() {
        var totalCart = 0;
        for (var item in cart) {
            totalCart += cart[item].price * cart[item].count;
        }
        return Number(totalCart.toFixed(2));
    }

    // List cart
    obj.listCart = function() {
        var cartCopy = [];
        for (i in cart) {
            item = cart[i];
            itemCopy = {};
            for (p in item) {
                itemCopy[p] = item[p];

            }
            itemCopy.total = Number(item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy)
        }
        return cartCopy;
    }

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});

// Clear items
$('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<tr>" +
            "<td>" + cartArray[i].name + "</td>" +
            "<td>(" + cartArray[i].price + ")</td>" +
            "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
            "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
            "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
            "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>" +
            " = " +
            "<td>" + cartArray[i].total + "</td>" +
            "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
        var name = $(this).data('name')
        shoppingCart.removeItemFromCart(name);
        displayCart();
    })
    // +1
$('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
    var name = $(this).data('name');
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});

displayCart();
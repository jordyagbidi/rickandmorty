// DEV: JORDY AGBIDI
import { observador } from "./index.js";
import {  urlApiSearch } from "./var.js";

//funciones recurrentes

//peticion fetch asincrona
export async function fetchAction(url) {
    let response = await fetch(url);
    return response.json()
}


//prepara enlace api de busqueda
export function searchUrl(search){
    return urlApiSearch+search;
}


//pedir caracteres indicando la pagina
export async function requestCharac(page,urlApi) {
    //page: pagina dato de la api
    //urlApi: url de la api

    //primero cargamos la info de la api
    let data = await fetchAction(urlApi);

    //total de pagina que hay disponible
    let totalPages = data.info.count;

    //pagina solicitada 
    let newUrl = urlApi+"?page="+page;

    if (page == 1) {
        //primera peticion 
        return data;

    } else if (page <= totalPages) {
        //si la pagina pedida no es la primera, hacemos la peticion con la nueva url
        data = await fetchAction(newUrl);

        return data;
    } 

}


//dibujar cartas de PERSONAJES
export function displayCards(data,container) {
    //apuntamos al elemento en el que pintaremos
   
    //recoremos la lista de personajes
    data.results.forEach(e => {
        //creamos el contenedor de la caja
        let swipbox = document.createElement("swiper-slide");
        swipbox.setAttribute("id", "sliderbox")
        //lo agregamos a nuestro padre
        container.appendChild(swipbox);

        //creamos la caja de texto
        let namebox = document.createElement("div");
        //agregamos su clase
        namebox.setAttribute("class", "nameBox");
        //lo agregamos a su padre
        swipbox.appendChild(namebox);

        //creamos el nombre del personaje
        let nameP = document.createElement("p");
        //agregamos el valor nombre
        nameP.innerText = e.name;
        //lo agregamos a su padre
        namebox.appendChild(nameP)

        //antes de seguir determinamos si el presonaje esta vivo o muerto con el mismo nombre del archivo
        let statusImg = document.createElement("img")
        let urlstatusimg = "/img/" + e.status + ".png"
        statusImg.setAttribute("src", urlstatusimg)
        //agregamos el elemento al padre
        namebox.appendChild(statusImg)

        //creamos la imagen del personaje
        let characImg = document.createElement("img")
        //agregamos la imagen
        characImg.style.backgroundImage = "url(" + e.image + ")";
        
        //agregar classe
        characImg.setAttribute("class", "imgBox")
        swipbox.appendChild(characImg);

        //creamos los contenedores de info de las cajas de personajes
        let infoText = [
            document.createElement("p"),
            document.createElement("p"),
            document.createElement("p"),
        ];
        //iconos de cada informacion
        let imgText = [
            "../img/gender.png",
            "../img/especie.png",
            "../img/location.png"
        ];

        //como son valores repetidos usamos foreach
        let i = 0; //posicion
        infoText.forEach(f => {
            //creamos la imagen icono
            let imgIcon = document.createElement("img");
            imgIcon.setAttribute("src", imgText[i]);
            f.appendChild(imgIcon);

            //agregamos atributos a los contenedores de informacion
            f.setAttribute("class", "boxInfo");
            swipbox.appendChild(f)

            let spanInfo = document.createElement("span");

            f.appendChild(spanInfo);
            ++i;
        })

        //agregamos el texto informativo
        infoText[0].children[1].innerText = e.gender;
        infoText[1].children[1].innerText = e.species;
        infoText[2].children[1].innerText = e.location.name;

       
    });

    //Observador (Accion de busqueda)
     //detectar ultimo character
     let cardList = document.querySelectorAll("#sliderbox");
     let lastCard = cardList[cardList.length - 1]

     //observamos la ultima caja de personajes con el objeto exportado
     observador.observe(lastCard);
}



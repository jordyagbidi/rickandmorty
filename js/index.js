// DEV: JORDY AGBIDI
import { displayCards,requestCharac, searchUrl } from "./functions.js";
import { containerCards, containerCardsSearch,searchBox,urlApi} from "./var.js";


//VARIABLES
//paginas por defecto
let page = 1;
//paginas por busqueda
let pageSearch = 1;
//cantida de busquedas realizadas
let numSearch = 0;
//url api de busqueda
let apiSearchUrl;


//EVENTOS
//Al carga la pagina
document.body.onload = async () => {
    let data = await requestCharac(page, urlApi);
    displayCards(data, containerCards);
}

//funcion reservada de js: observamos si estamos en el ultimo personaje
export let observador = new IntersectionObserver((elements, observador) => {
    elements.forEach(async e => {
        //observamos los elementos y luego preguntamos si se ha encontrado el elemento que estamos observandor
        if (e.isIntersecting) {
            //incrementamos la paginacion pero en funcion de si estamos buscando o estamos buscando

            //variables condicionados por el estado de busqueda o no busqueda
            let url;
            let objectivePage;
            let container;


            if (numSearch == 0) {
                //cuando no buscamos
                page++;
                url = urlApi;
                objectivePage = page;
                container = containerCards;
            } else if (numSearch) {
               //cuando si buscamos
                url = apiSearchUrl;
                objectivePage = pageSearch;
                container = containerCardsSearch;
            }

            //aclarado el valor adecuado segun el estado realizamos la peticion
            let data = await
                requestCharac(objectivePage, url)

            //dibujamos en pantalla con la peticion pedida
            displayCards(data, container)
        }
    })
}, {
    rootMargin: "0px 0px 0px 200px",//area de deteccion respecto al elemento observador
    threshold: 1.0
})

//CAJA DE BUSQUEDA
//detectamos que estamos buscando
searchBox.oninput = async () => {
    if (searchBox.value == "" || searchBox.value == null) {
        //no estamos buscando

        //mostramos la caja normal
        containerCards.style.display = "block";

        //ocultamos la caja de busqueda
        containerCardsSearch.style.display = "none";

        //reiniciamos el numero de busquedas
        numSearch = 0;

    } else {
        //estamos buscando

        //ocultamos la caja de personajes por defecto
        containerCards.style.display = "none";

        //mostramos la de busqueda
        containerCardsSearch.style.display = "block";

        //primero detectamos si hay un resultado mostrado
        if (containerCardsSearch.children.length > 0) {
            console.log("hey");
            //si es asi vaciamos la caja de busqueda
            containerCardsSearch.innerHTML = "";
        }

        //ahora generamos el enlace de busqueda
        apiSearchUrl = searchUrl(searchBox.value);

        //ahora generamos el enlace de nuestra peticion
        let dataSearch = await requestCharac(pageSearch, apiSearchUrl);

        //y finalmente dibujamos lo que pedimos
        displayCards(dataSearch, containerCardsSearch);
  
        //indicamos que se ha echo una busqueda
        ++numSearch;
              
    }
 
}





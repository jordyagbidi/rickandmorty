INTRODUCCIÓN

Esta aplicación es bastante simple de usar, en primer lugar 
podemos observar una colección de cajas que albergan los 
diferentes personajes de la serie RICK & MORTY

Sin embargo si queremos filtrar o mejor dicho encontrar 
algún personaje en concreto, bastaría con escribir en la 
caja de texto superior y automáticamente veremos el resultado.

Por último, pero no menos importante, los personajes se 
van cargando automáticamente sin que tengamos clicar un botón de ver más.

DEV NOTE  - PLANTEAMIENTO DEL PROBLEMA

1. Debemos detectar dos estados
--Buscar (cuando el usuario está buscando un personaje)
--No buscar (caso contrario)

solución: creamos dos contenedores el usuario empieza a buscar, se visualiza el contenedor de búsqueda y se oculta el listado normal, viceversa)
    
2. Si no estamos buscando listamos la lista normal de personajes
3. Si estamos buscando ocultamos la lista normal de personaje y mostramos la lista filtrada cuando escribimos.
--Si no ha resultado no se muestra nada.
--Por lo contrario se muestra el resultado filtrado 
--Por cada búsqueda positiva boramos el resultado anterior y mostramos el nuevo

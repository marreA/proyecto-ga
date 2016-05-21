/* DEFINICIÓN DEL JAVASCRIPT PARA LAS FUNCIONES DE LOS TABS */

function change_tab(pestannas,pestanna) { // Función para cambiar de tab en nuestra página.
    
    pestanna = document.getElementById(pestanna.id); // Almacenamos en una variable el tab indicado.
    list_tabs = document.getElementById(pestannas.id);
    
    cpestanna = document.getElementById('c'+pestanna.id); // Almacenamos en un variable el contenido de dicho tab.
    list_content_tabs = document.getElementById('contenido'+pestannas.id);
    
    index = 0; // Variable index para hacer uso del while. Inicializada a 0.

    while (typeof list_content_tabs.getElementsByTagName('div')[index] != 'undefined') { // While para ir recorriendo los tabs y restaurando los fondos y contenidos.
        $(document).ready(function(){
            $(list_content_tabs.getElementsByTagName('div')[index]).css('display','none');
            $(list_tabs.getElementsByTagName('li')[index]).css('background','');
            $(list_content_tabs.getElementsByTagName('li')[index]).css('padding-bottom','');
        });
        index = index + 1; // Sumamos uno al valor actual de index.
 }

    $(document).ready(function() {
        $(cpestanna).css('display',''); // Muestra el contenido del tab actual.
        $(pestanna).css('background','#eeeeee'); // Cambia el color de la pestaña de selección a white.
        $(pestanna).css('padding-bottom','2px'); // Aumentamos el padding para que tape el borde superior del contenido.
    });
}
(() =>{
	"use strict";
/**	const treeTremplate =`
	<div class="contenido">
	      <table class="center" id="result">
	          <% _.each(rows, (row) => { %>
	          <tr class="<%=row.type%>">
	              <% _.each(row.items, (name) =>{ %>
	              <td><%= name %></td>
	              <% }); %>
	          </tr>
	          <% }); %>
	      </table>
	  </p>
	</div>
	`; */
//	Creamos el arbol con la salida del parser
const createTree = (data) => {
  $("#finalTree").html(_.template(treeTemplate, { rows: data.rows }));
};

//	Cargar un fichero en el textarea
const dump = (fileName) => {
  $.get(fileName, function (data) {
      $("#original").val(data);
  });
};

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files;
  var read = new FileReader();
  read.onload = (e) => {
    $("#original").val(e.target.result);
    evt.target.style.background = "white";
  };
  read.readAsText(files[0])
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "yellow";
}

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }
   $("#parse").click( () => {
        if (window.localStorage) localStorage.original = original.value;
        $.get("/parser", /* Llamada a AJAX para que calcule la tabla */
          { input: original.value },
          createTree,
          'json'
        );
   });
	 // Setup the drag and drop listeners.
	 //var dropZone = document.getElementsByClassName('drop_zone')[0];
	 let dropZone = $('.drop_zone')[0];
	 dropZone.addEventListener('dragover', handleDragOver, false);
	 dropZone.addEventListener('drop', handleDragFileSelect, false);
	 let inputFile = $('.inputfile')[0];
	 inputFile.addEventListener('change', handleFileSelect, false);
 });
});

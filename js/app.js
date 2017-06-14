var api = {
  url: "https://lab-api-test.herokuapp.com/tasks/",
};

var $tabla = $("#lista-tareas");

var cargarPagina = function () {
  cargarTareas();
  $('#formulario').submit(agregarTarea);
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {

    tareas.forEach(crearTarea);
  });
};

var planillaIconos = '<td>' +
  '<a href=""><span class="glyphicon glyphicon-zoom-in"></span></a>' +
  '<span class="glyphicon glyphicon-pencil"></span>' +
  '<a href="#"><span class="glyphicon glyphicon-remove-circle"></span></a>' +
  '</td>';

var crearTarea = function (tarea) {
  var nombre = tarea.name;
  var estado = tarea.status[0];
  var id = tarea._id;

  var $tr = $("<tr />", {"data-id" : id});

  var $nombreTd = $("<td />");
  $nombreTd.text(nombre);

  var $estadoTd = $("<td />");
  $estadoTd.text(estado);



  $tr.append($nombreTd);
  $tr.append($estadoTd);
  $tr.append(planillaIconos);

  $tabla.append($tr);
};


var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $('#nombreTarea').val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $('#myModal').modal('hide');
  });
};

var mostrarDetalle = function (e) {
  e.preventDefault();
  /*$.getJSON(api.url, function(tareas){
    
  });*/



};

var borrarTarea = function () {

  var $padre= $(this).parents("tr")
  var id = $(this).parents("tr").attr("data-id");
  $padre.remove();
  
  $.ajax(api.url + id, {
    method: "DELETE",
    dataType: "json",
    success: function (response) {
     console.log(response)
    },
    error: function (error) {
      console.log("error", error);
    }
  });
};



$(document).on("click", ".glyphicon-remove-circle", borrarTarea);
$(document).on("click", ".glyphicon-zoom-in", mostrarDetalle);
$(document).ready(cargarPagina);

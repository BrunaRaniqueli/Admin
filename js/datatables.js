// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
    "language": {
      "lengthMenu": "Mostrar _MENU_ registros por página",
      "zeroRecords": "Nada encontrado - desculpe",
      "info": "Mostrando página _PAGE_ de _PAGES_",
      "infoEmpty": "Nenhum registro disponível",
      "infoFiltered": "(filtrado do total de _MAX_ registros)",
      "search":         "Pesquisar:",
      "paginate": {
          "first":      "Primeira",
          "last":       "Última",
          "next":       "Próxima",
          "previous":   "Anterior"
      },
    },
    "columnDefs": [
        {
            render: function ( data, type, row ) {
              var d = new Date(data);
              var day = d.getDate() < 9 ? "0" + (d.getDate()+1): (d.getDate()+1);
              var month = d.getMonth() < 9? "0" + (d.getMonth()+1) : (d.getMonth()+1);
              var year = d.getFullYear();
              
              // If display or filter data is requested, format the date
              if ( type === 'display' || type === 'filter' ) {
                return day +'/'+ month +'/'+ year;
              }
       
              // Otherwise the data type requested (`type`) is type detection or
              // sorting data, for which we want to use the integer, so just return
              // that, unaltered
              return year +''+ month +''+ day;
            },
            "targets": 0
        }
    ]
  });
});

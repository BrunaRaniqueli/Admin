// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var tabela = window.table;

var tableBody = $("#dataTable tbody");
var labels = [];
var dataValues = [];

tabela.forEach(function(value, index) {
  var d = value.data;
  var day = d.getDate() < 9? '0' + (d.getDate() + 1) : (d.getDate() + 1);
  var month = d.getMonth() < 9? '0' + (d.getMonth() + 1): (d.getMonth() +1);
  var data = day +'/'+ month +'/'+ d.getFullYear();
  
  labels.push(data);
  dataValues.push(value.capacidade - value.atendimentoRealizado)
  
  if(tableBody){
    var row = document.createElement("tr");
    for(var key in value){
      var td = document.createElement("td");
      td.innerText = value[key];
      row.append(td);
    }
    tableBody.append(row);
  }
});

var ctx = document.getElementById("myBarChart");
if(ctx) {
  var myLineChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: "Capacidade - Atendimento Realizado",
        backgroundColor: "rgba(2,117,216,1)",
        borderColor: "rgba(2,117,216,1)",
        data: dataValues,
      }],
    },
    options: {
      "hover": {
        "animationDuration": 0
      },
      "animation": {
        "duration": 1,
        "onComplete": function() {
          var chartInstance = this.chart,
            ctx = chartInstance.ctx;

          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function(dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function(bar, index) {
              var data = dataset.data[index];
              if(data >=0){ //ignore negative values
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              }
            });
          });
        }
      },
      scales: {
        xAxes: [{
          time: {
            unit: 'month'
          },
          gridLines: {
            display: false
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: 1000,
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        }],
      },
      legend: {
        display: true
      }
    }
  });
}
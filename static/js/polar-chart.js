var canvasP = document.getElementById("polar-chart");
var ctxP = canvasP.getContext('2d');

//new Chart(document.getElementById("polar-chart"), {
var myPieChart = new Chart(ctxP, {

  type: 'polarArea',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [247,426,73,78,43]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});


canvasP.onclick = function(e) {
   var slice = myPieChart.getElementAtEvent(e);
   if (!slice.length) return; // return if not clicked on slice
   var label = slice[0]._model.label;
   switch (label) {
      // add case for each label/slice
      case 'Africa':
         alert('clicked on slice 5');
         window.open('www.example.com/foo',"_self");
         break;
      case 'Asia':
         alert('clicked on slice 6');
         window.open('www.example.com/bar',"_self");
         break;
      // add rests ...
   }
}


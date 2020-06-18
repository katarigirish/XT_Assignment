window.onload = function() {
  var dps = [];
  var chart = new CanvasJS.Chart("chartContainer", {
    backgroundColor: "#f6f6ef",
    axisX: {
      title: "ID",
      gridThickness: 0,
      tickLength: 10
    },
    axisY: {
      title: "VOTES",
      gridColor: "#dadada",
      includeZero: false
    },
    data: [
      {
        type: "line",
        dataPoints: dps
      }
    ]
  });

  var xVal = 0;
  var yVal = 100;
  var updateInterval = 1000;
  var dataLength = 20;

  var updateChart = function(count) {
    count = count || 1;

    for (var j = 0; j < count; j++) {
      yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      dps.push({
        x: xVal,
        y: yVal
      });
      xVal++;
    }

    if (dps.length > dataLength) {
      dps.shift();
    }

    chart.render();
  };

  updateChart(dataLength);
  setInterval(function() {
    updateChart();
  }, updateInterval);
};

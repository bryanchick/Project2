function buildMetadata(track_title) {

  d3.json(`songs/${track_title}`).then(function (data) {
    // console.log(data)
    d3.select('#sample-metadata').html('')
    let myHtmlblock = d3.select('#sample-metadata');
    Object.keys(data).forEach(key => {
      myHtmlblock.append('p').text(key + " : " + data[key])
    })

  })
}

function buildCharts(song_name) {
  console.log(song_name)
  let url = `/songs/${song_name}` // Switch to song_name to display chart
  // Values not showing up, but are being logged and set up. Need to connect data
  // to chart. 
  console.log(url)

  d3.json(url).then(function (data) {

   // date_pulled, chart_rank
   let myDates = data.map(x => x.date_pulled)
   let myRanks = data.map(x => x.chart_rank)
    // // Plotly scatter Chart
    var trace1 = {
       x: myDates,
       y: myRanks,
      type: 'scatter',
      mode: 'markers'
     };

     console.log(trace1)
    
    
    Plotly.newPlot('scatter', [trace1]);


    // var layout = {
    //   height: 400,
    //   width: 500
    // };

    
    // Plotly.newPlot('scatter', data);

    //Plotly.newPlot('scatter', staticData, layout);
    // // start bubble chart from plotly
    // var trace1 = {
    //   y: myvalues1,
    //   x: myLables1,
    //   mode: 'markers',
    //   marker: {
    //     color: myLables1,
    //     opacity: myvalues1,
    //     size: myvalues1,
    //   }
    // };

    // var data = [trace1];

    // var layout = {
    //   title: 'otu_lables',
    //   showlegend: true,
    //   height: 600,
    //   width: 1000
    // };

    // Plotly.newPlot('bubble', data, layout);
  })
}


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/songs").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // recieves the ID of the person who gave the sample
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
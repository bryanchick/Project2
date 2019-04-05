function buildMetadata(sample) {

    d3.json(`metadata/${sample}`).then(function (data) {
      console.log(data)
      d3.select('#sample-metadata').html('')
      let myHtmlblock = d3.select('#sample-metadata');
      Object.keys(data).forEach(key => {
        myHtmlblock.append('p').text(key + " : " + data[key])
      })
  
    })
  }
  
  // Use sample_values as the values for the PIE chart
  // Use otu_ids as the labels for the pie chart
  // Use otu_labels as the hovertext for the chart
  
  function buildCharts(sample) {
    console.log(sample)
    let url = `samples/${sample}`;
    d3.json(url).then(function (data) {
  
      let myvalues = data['Date Pulled'];
      let myLables = data['Chart Rank'];
      let myvalues1 = data.sample_values;
      let myLables1 = data.otu_ids;
      // Plotly Pie Chart
      var trace1 = {
        x: myvalues,
        y: myLables,
        type: 'scatter'
      };
      
      var data = [trace1];
      
      Plotly.newPlot('myDiv', data);
      var staticData = [{
        values: myvalues,
        labels: myLables,
        type: 'scatter'
      }];
  
      var layout = {
        height: 400,
        width: 500
      };
  
      Plotly.newPlot('pie', staticData, layout);
      // start bubble chart from plotly
      var trace1 = {
        y: myvalues1,
        x: myLables1,
        mode: 'markers',
        marker: {
          color: myLables1,
          opacity: myvalues1,
          size: myvalues1,
        }
      };
  
      var data = [trace1];
  
      var layout = {
        title: 'otu_lables',
        showlegend: true,
        height: 600,
        width: 1000
      };
  
      Plotly.newPlot('bubble', data, layout);
    })
  }
  
  
  function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
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
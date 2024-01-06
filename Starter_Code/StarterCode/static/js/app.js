//Get the URL endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function buildChart(sampleid){


// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
      
      // Call the custom function with filter()
      let searchResults = data.samples.filter(sample=>sample.id===sampleid)[0]; 
      console.log(searchResults)

// OTU Labels
// let labels = searchResults.map(function (row){
//     return row.otu_labels
//   });
  
  // Trace for the Bar Chart
  let trace1 = {
      x: searchResults.sample_values.slice(0, 10).reverse(),
      y: searchResults.otu_ids.map(id=>`OTU ${id}`).slice(0, 10).reverse(),
      text:searchResults.otu_labels.slice(0, 10).reverse(), 
      type: "bar",
      orientation: "h"
    };
  
  // Data trace array
  let bardata = [trace1];
  
  // Apply a title to the layout
  let layout = {
    title: "Top 10 OTUs in Human Navels"
  };
  
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", bardata, layout);

  // Trace for the Bubble Chart
  let trace2 = {
    x: searchResults.sample_values,
    y: searchResults.otu_ids.map(id=>`OTU ${id}`),
    text:searchResults.otu_labels, 
    type: "bar",
    orientation: "h"
  };

// Data trace array
let bubbledata = [trace2];

// Apply a title to the layout
let layout2 = {
  title: "Top 10 OTUs in Human Navels"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("bar", bubbledata, layout2);

});
}

buildChart("941")
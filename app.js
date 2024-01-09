// Get the URL endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize the dashboard
function init() {
  // Select the dropdown menu
  let selector = d3.select("#selDataset");

  // Fetch the JSON data
  d3.json(url).then((data) => {
     
    // Log the entire data object for debugging
     console.log("Data:", data);
    
     let sampleNames = data.names;

    // Populate dropdown options
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Initial sample
    let firstSample = sampleNames[0];

    // Call buildChart with the initial sample
    buildChart(firstSample, data);
    });
}

// Build the charts
function buildChart(sampleid, data) {
  console.log("Data:", data); 

  // Filter data for the selected sample
  let searchResults = data.samples.filter(sample => sample.id === sampleid)[0];

  // Log the searchResults to check its structure
   console.log("Search Results:", searchResults);
    console.log(data.metadata)
    displayMetadata(sampleid, data);
  

  // Clear previous content
  d3.select("#bar").html("");
  d3.select("#bubble").html("");

  // Trace for the Bar Chart
  let trace1 = {
    x: searchResults.sample_values.slice(0, 10).reverse(),
    y: searchResults.otu_ids.map(id => `OTU ${id}`).slice(0, 10).reverse(),
    text: searchResults.otu_labels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  };

  // Data trace array
  let barData = [trace1];

  // Apply a title to the layout
  let layout = {
    title: "Top 10 OTUs in Human Navels"
  };

  // Render the plot to the div tag with id "bar"
  Plotly.newPlot("bar", barData, layout);

  // Trace for the Bubble Chart
  let trace2 = {
    x: searchResults.otu_ids,
    y: searchResults.sample_values,
    text: searchResults.otu_labels,
    mode: "markers",
    marker: {
      size: searchResults.sample_values,
      color: searchResults.otu_ids,
      colorscale: "Earth"
    }
  };

  // Data trace array
  let bubbleData = [trace2];

  // Apply a title to the layout
  let layout2 = {
    hovermode: "closest",
    xaxis: { title: "OTU ID" },
  };

  // Render the plot to the div tag with id "bubble"
  Plotly.newPlot("bubble", bubbleData, layout2);
}

// Display metadata
function displayMetadata(sampleid, data) {
  // Get the metadata for the selected sample
  let metadata = data.metadata;
  
  //Filter based on sampleid
  let results = metadata.filter(id => id.id == sampleid);
  
  //Store first result to display in metadata
  let firstResult = results[0]
  console.log(firstResult)
 
  // Display the metadata in a div with the id "sample-metadata"
  let metadataDisplay = d3.select("#sample-metadata");
  
  //Clear out previous entries in the metadata
  metadataDisplay.html(""); 

  // Display each key-value pair as a paragraph
  Object.entries(firstResult).forEach(([key, value]) => {
    console.log(key,value);
    metadataDisplay.append("p").text(`${key}: ${value}`);
  });
}

// Handle dropdown change
function optionChanged(newSample) {
  // Fetch the JSON data
  d3.json(url).then((data) => {
    // Call buildChart with the new sample
    buildChart(newSample, data);
  });
}

// Call the init function to initialize the dashboard
init();
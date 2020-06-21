// Feel free to change or delete any of the code you see in this editor!
var margin = { top: 0, right: 0, bottom: 80, left: 60 },
  width = 800 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var overlay = d3
  .select(".boom")
  .append("div")
  .attr("class", "overlay")
  .style("opacity", 0);

var svg = d3
  .select("#visholder")
  .append("svg")

  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "bar-chart");

var barPadding = 5;

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function (data) {
    var GDP = data.data.map(function (item) {
      return item[1];
    });

    var scaledGDP = [];

    var gdpMin = d3.min(GDP);
    var gdpMax = d3.max(GDP);

    var linearScale = d3
      .scaleLinear()
      .domain([gdpMin, gdpMax])
      .range([(gdpMin / gdpMax) * height, height]);

    scaledGDP = GDP.map(function (item) {
      return linearScale(item);
    });

    var barWidth = width / 275;

    var xScale = d3.scaleLinear().domain([1945, 2015]).range([0, width]);

    var xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));

    var xAxisGroup = svg
      .append("g")
      .call(xAxis)
      .attr("id", "x-axis")
      .attr("transform", "translate(40, 420)")
      .attr("class", "axisAquamarine");

    var yAxisScale = d3
      .scaleLinear()
      .domain([gdpMin, gdpMax])
      .range([height, (gdpMin / gdpMax) * height]);

    var yAxis = d3.axisLeft(yAxisScale);

    var yAxisGroup = svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(40, 0)")
      .attr("class", "axisAquamarine");

    var rects = svg
      .selectAll("#visholder")
      .data(scaledGDP) //this is an array or should be
      .enter()
      .append("rect")
      .attr("data-date", function (d, i) {
        return data.data[i][0];
      })
      .attr("data-gdp", function (d, i) {
        return data.data[i][1];
      })
      .attr("class", "bar")
      .attr("x", function (d, i) {
        return i * barWidth;
      })
      .attr("y", function (d, i) {
        return height - d;
      })
      .attr("width", barWidth)
      .attr("height", function (d) {
        return d;
      })
      .attr("transform", "translate(40, 0)")
      .attr("class", "bar")
      .append("title")
      .text((d) => "$" + Math.floor(d * 43) + " Billion");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -355)
      .attr("y", 80)
      .text("Gross Domestic Product (in billions)")
      .style("font-family", "Montserrat")
      .style("fill", "aquamarine");
    svg
      .append("text")
      .attr("x", 340)
      .attr("y", 470)
      .text("Year (in quarters)")
      .style("font-family", "Montserrat")
      .style("fill", "aquamarine");
  }
);

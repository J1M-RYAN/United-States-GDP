d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
  function (data) {
    var list = data.data;
    var dataset = [];
    for (var i = 0; i < list.length; i++) {
      dataset.push(list[i][1]);
    }
    console.log(dataset);

    const w = "90vw";
    const h = "100vh";

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 4)
      .attr("y", (d, i) => 900 - d / 30)
      .attr("width", 4)
      .attr("height", (d, i) => {
        if (d < 200) {
          return 200 / 30;
        } else {
          return d / 30;
        }
      })
      .append("title")
      .text((d) => d);
  }
);

return (
  <html>
    <head>
      <title>D3.js Visualization in a Div</title>
      <script src="https://unpkg.com/d3@7.1.1/dist/d3.min.js"></script>
    </head>
    <body>
      <div id="visualization"></div>
      <script>
        const data = [1, 2, 3, 4, 5]; const svg =
        d3.select("#visualization").append("svg") .attr("width", 400)
        .attr("height", 200); svg.selectAll("circle") .data(data) .enter()
        .append("circle").attr("cx", (d, i) => i * 50 + 25) .attr("cy", 100)
        .attr("r", (d) => d * 2);
      </script>
    </body>
  </html>
);

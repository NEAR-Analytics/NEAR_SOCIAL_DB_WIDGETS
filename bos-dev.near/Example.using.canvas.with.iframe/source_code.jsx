const srcCode = `

  <canvas id="myCanvas" width="800" height="800"></canvas>

  <script>
    // JavaScript code to interact with the canvas element
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    // Drawing code...
    context.fillStyle = "green";
    context.fillRect(50, 50, 100, 100);
  </script>

`;

return (
  <>
    <iframe srcDoc={srcCode} />
  </>
);

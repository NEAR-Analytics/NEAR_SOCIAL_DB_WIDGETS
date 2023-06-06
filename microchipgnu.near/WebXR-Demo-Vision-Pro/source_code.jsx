const srcData = `

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

</style>
<script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
<script src="https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js"></script>

<body>
    <a-scene renderer="colorManagement: true;" vr-mode-ui="enabled: true">
        <a-entity environment="preset: forest; dressingAmount: 500"></a-entity>

        <!-- Camera with controls -->
        <a-entity id="rig"
                movement-controls="speed: 0.6"
                position="0 1.6 0">
        <a-entity camera
                    look-controls="pointerLockEnabled: true"
                    wasd-controls-enabled="false">
        </a-entity>
        </a-entity>

        <!-- Link to VR Mode -->
        <a-link href="#" title="Enter VR" position="-1 1 -3" vr-mode></a-link>
    </a-scene>
</body>

`;

return (
  <>
    <iframe
      srcDoc={srcData}
      style={{
        height: "80vh",
        width: "100%",
      }}
    />
  </>
);

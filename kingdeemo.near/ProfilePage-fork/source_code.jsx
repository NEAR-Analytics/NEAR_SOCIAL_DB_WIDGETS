const scriptSrc = `
<style>
* { margin: 0; padding: 0;}
body, html { height:100%; }
#c {
    position:absolute;
    width:100%;
    height:100%;
}
</style>

<script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"></script>

<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.145.0/build/three.module.js"
    }
  }
</script>

<script type="module">
    import * as THREE from 'three';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const getCard = ({ position, texture }) => {
        const geometry = new THREE.PlaneGeometry( position.x, position.y );
        const material = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
        const card = new THREE.Mesh( geometry, material );

        return card;
    }

    const textureLoader = new THREE.TextureLoader();
    const defaultTexture = textureLoader.load('');
    const card1 = getCard({ position: { x: 2, y: -2 }, texture: defaultTexture });
    card1.position.y = 0; // Adjust the y position to move the card lower
    scene.add(card1);

    function animate() {
        requestAnimationFrame( animate );
        card1.rotation.y += 0.01;
        renderer.render( scene, camera );
    }

    animate();

    function updateTexture(url) {
        textureLoader.load(url, (texture) => {
            card1.material.map = texture;
            card1.material.needsUpdate = true;
        });
    }

    window.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        if (type === 'updateTexture') {
            updateTexture(payload.url);
        }
    });
</script>
`;

const CardComponent = () => {
  const handleButtonClick = () => {
    const url = document.getElementById("url-input").value;
    const message = {
      type: "updateTexture",
      payload: {
        url: url,
      },
    };
    const iframeWindow = document.querySelector("iframe").contentWindow;
    iframeWindow.postMessage(message, "*");
  };

  return (
    <div className="w-100">
      <div>
        <input id="url-input" type="text" placeholder="Enter URL" />
        <button onClick={handleButtonClick}>Update Texture</button>
      </div>
      <iframe
        srcDoc={scriptSrc}
        height="100%"
        onLoad={() => {
          const iframeWindow = document.querySelector("iframe").contentWindow;
          iframeWindow.postMessage({ type: "initialLoad" }, "*");
        }}
        onMessage={(data) => {
          State.update({ ...data });
        }}
        style={{ height: 300, width: "100%" }}
      />
      Hello, this widget will allow you to place images on a 3d object. The
      reason I am building this is to allow people to create an NFT ID which
      will be a virtual ID card!
    </div>
  );
};

return <CardComponent />;

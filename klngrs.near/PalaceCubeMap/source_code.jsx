const src = `
<div id="canvas-container" style="height:100%;"></div>

        <style>
        body {
            height:100%;
        }
        </style>
	
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>

        <!-- Import maps polyfill -->
		<!-- Remove this when import maps will be widely supported -->
        <script async src="https://ga.jspm.io/npm:es-module-shims@1.7.3/dist/es-module-shims.js"></script>

		<script type="importmap">
			{
				"imports": {
					"three": "https://unpkg.com/three@0.153.0/build/three.module.js",
					"orbit-controls": "https://unpkg.com/three@0.153.0/examples/jsm/controls/OrbitControls.js"
				}
			}
		</script>
	

		<script type="module">

			import * as THREE from 'three';
			import { OrbitControls } from 'orbit-controls';

			// import OrbitControls from 'three-orbitcontrols';

			// import _THREE from 'three-orbitcontrols';

			// const OrbitControls = _THREE.OrbitControls;

			let camera, controls;
			let renderer;
			let scene;

			init();
			animate();

			function init() {

				const container = document.getElementById( 'canvas-container' );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 100 );
				camera.position.z = 0.01;

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.enableDamping = true;
				controls.rotateSpeed = - 0.25;

				const textures = getTexturesFromAtlasFile( 'https://raw.githubusercontent.com/klngrs/three.js/dev/examples/textures/cube/sun_temple_stripe.jpg', 6 );

				const materials = [];

				for ( let i = 0; i < 6; i ++ ) {

					materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] } ) );

				}

				const skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
				skyBox.geometry.scale( 1, 1, - 1 );
				scene.add( skyBox );

				window.addEventListener( 'resize', onWindowResize );

			}

			function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {

				const textures = [];

				for ( let i = 0; i < tilesNum; i ++ ) {

					textures[ i ] = new THREE.Texture();

				}

				new THREE.ImageLoader()
					.load( atlasImgUrl, ( image ) => {

						let canvas, context;
						const tileWidth = image.height;

						for ( let i = 0; i < textures.length; i ++ ) {

							canvas = document.createElement( 'canvas' );
							context = canvas.getContext( '2d' );
							canvas.height = tileWidth;
							canvas.width = tileWidth;
							context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
							textures[ i ].colorSpace = THREE.SRGBColorSpace;
							textures[ i ].image = canvas;
							textures[ i ].needsUpdate = true;

						}

					} );

				return textures;

			}

			function onWindowResize() {

				console.log(window.innerWidth, window.innerHeight)
				var canvasContainer = document.getElementById("canvas-container");
				var canvas = canvasContainer.firstChild;
				canvasContainer.style.height = canvas.style.height = window.innerHeight + "px";
				canvasContainer.style.width = canvas.style.width = window.innerWidth + "px";
				canvas.style.margin = "auto";
				canvas.style.width = "auto";

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update(); // required when damping is enabled

				renderer.render( scene, camera );

			}

		</script>


`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 10px;
`;
//
return (
  <div className="iframeContainer" style={{ display: block }}>
    <iframe
      onLoad={() => console.log("iframe loaded")}
      className="w-100 h-100"
      style={{
        position: fixed,
        inset: "0px",
        height: "100%!important;",
        width: "100%!important;",
      }}
      srcDoc={src}
    />
  </div>
);

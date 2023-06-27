const src = `
<div id="container"></div>
	
//
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

				const container = document.getElementById( 'container' );

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

				// camera.aspect = window.innerWidth / window.innerHeight;
				// camera.updateProjectionMatrix();

				// renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update(); // required when damping is enabled

				renderer.render( scene, camera );

			}

		</script>


`;

return (
  <div className="h-100">
    <iframe
      iframeResizer={{
        onResized: ({ width, height }) => {
          console.log("iframe resized", width, height);
        },
      }}
      onLoad={() => console.log("iframe loaded")}
      className="w-100 h-100"
      srcDoc={src}
    />
  </div>
);

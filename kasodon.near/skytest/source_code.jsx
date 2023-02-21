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


    
    const getCube = ({ position }) => {
        const geometry = new THREE.BoxGeometry( position.x, position.y, position.z );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
        const cube = new THREE.Mesh( geometry, material );

        return cube
    }


    const cube1 = getCube({position: {x: 1, y: 1, z: 1}})
    const cube2 = getCube({position: {x: 1, y: 1, z: 1}})

    cube1.position.y = 2
    cube2.position.y = -2
    
    scene.add( cube1 );
    scene.add( cube2 );

    function animate() {
        requestAnimationFrame( animate );

        cube1.rotation.x += 0.01;
        cube1.rotation.y += 0.01;
        cube2.rotation.x -= 0.01;
        cube2.rotation.y -= 0.01;

        renderer.render( scene, camera );
    };

    animate();
            
</script>
`;

return (
  <div class="w-100">
    <iframe
      srcDoc={scriptSrc}
      height="100%"
      onMessage={(data) => {
        State.update({ ...data });
      }}
      style={{ height: 300, width: "100%" }}
    />
  </div>
);

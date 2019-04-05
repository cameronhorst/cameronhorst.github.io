var camera, scene, renderer, controls;
init();
animate();
function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );
    controls = new THREE.DeviceOrientationControls( camera );
    scene = new THREE.Scene();
    var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
    // invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale( - 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {
        map: new THREE.TextureLoader().load( 'textures/AtriumBallroomAO_Node.jpg' )
    } );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    
    //var helperGeometry = new THREE.BoxBufferGeometry( 100, 100, 100, 4, 4, 4 );
    //var helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
    //var helper = new THREE.Mesh( helperGeometry, helperMaterial );
    //scene.add( helper );
    //
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    //
    window.addEventListener( 'resize', onWindowResize, false );

    drawversion();
}

function drawVersion()
{
    var text2 = document.createElement('div');
    text2.style.position = 'absolute';
    //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text2.style.width = 100;
    text2.style.height = 100;
    text2.innerHTML = v2;
    text2.style.top = 100 + 'px';
    text2.style.left = 0 + 'px';
    document.body.appendChild(text2);
}

function animate() {
    window.requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
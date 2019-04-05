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
    const id = setTimeout(() => alert('Enable device orientation in Settings > Safari > Motion & Orientation Access.'), 500);

    createInfo();



}

function createInfo()
{
    var text2 = document.createElement('div');
    text2.setAttribute('id', "100");
    text2.style.position = 'absolute';
    text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    text2.style.width = 100;
    text2.style.height = 100;
    text2.innerHTML = "v3:    " ;
    text2.style.top = 100 + 'px';
    text2.style.left = 0 + 'px';
    document.body.appendChild(text2);
}



function animate() {
    window.requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
    var eularAngles = {x: THREE.Math.radToDeg(camera.rotation.x).toFixed(4), y: THREE.Math.radToDeg(camera.rotation.y).toFixed(4), z: THREE.Math.radToDeg(camera.rotation.z).toFixed(4)};
    document.getElementById("100").innerHTML = "v3:    " + JSON.stringify(eularAngles);
}

function toFixed(value, precision) {
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container;
var camera, controls, scene, renderer;
var root;
var worksmenu = document.getElementById( "works-menu" );
var spinner = document.getElementById('spinner');
var WORKS = {
	"作品1": "1.dae",
	"作品2": "2.dae",
	"作品3": "3.dae",
	"作品4": "4.dae",
	"作品5": "5.dae",
	"作品6": "6.dae",
	"作品7": "7.dae",
	"作品8": "8.dae",
	"作品9": "9.dae"
};

init();
animate();

/* 初始化 */
function init() {

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(7,7,7);
	controls = new THREE.TrackballControls( camera );
	controls.rotateSpeed = 5.0;
	controls.zoomSpeed = 5;
//				controls.panSpeed = 2;
	controls.noZoom = false;
	controls.noPan = true;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	scene = new THREE.Scene();
	scene.add( camera );

	var dirLight = new THREE.DirectionalLight( 0xcccccc);
	dirLight.position.set( 200, 200, 1000 ).normalize();

	camera.add( dirLight );
	camera.add( dirLight.target );
	scene.add( new THREE.AmbientLight(0x333333));
	root = new THREE.Group();
	scene.add( root );

	createworksMenu();
	addWork( "dae/1.dae" );
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	container = document.createElement( 'div' );
	document.body.appendChild( container );
	container.appendChild( renderer.domElement );

	window.addEventListener( 'resize', onWindowResize, false );

}

/* 创建菜单 */
function createworksMenu() {
	for ( var m in WORKS ) {
		var li = document.createElement( 'li' );
		var a = document.createElement( 'a' );
//					var width = document.getElementById()
		a.setAttribute("href","#");
		a.innerHTML = m;
		li.appendChild(a);
		worksmenu.appendChild(li);
		var url = "dae/" +  WORKS[ m ];
		a.addEventListener( 'click', generateButtonCallback( url ), false );
	}
}
/* 菜单点击事件 */
function generateButtonCallback( url ) {
	return function ( event ) {
		toggleClass(spinner, 'hide');
		addWork( url );
	}
}

/* 加载作品 */
function addWork( url ) {
	while ( root.children.length > 0 ) {
		var object = root.children[ 0 ];
		object.parent.remove( object );
	}
	var loader = new THREE.ColladaLoader();
	loader.load( url, function ( collada ) {
		root.add(collada.scene);
		toggleClass(spinner, 'hide');
	});
}
/* 监听窗口设置场景 */
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	controls.handleResize();
}

/* 动态渲染 */
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

/* JS添加移除class */
function hasClass(obj, cls) {
	return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
	if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}

function removeClass(obj, cls) {
	if (hasClass(obj, cls)) {
		var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		obj.className = obj.className.replace(reg, ' ');
	}
}
function toggleClass(obj,cls){
	if(hasClass(obj,cls)){
		removeClass(obj, cls);
	}else{
		addClass(obj, cls);
	}
}
var script = document.getElementsByTagName( "script" );
var loadedScripts = {};
function loadScript( url, onLoaded, onCompleted ) {
    if( url in loadedScripts ) {        
        return;
    }
    loadedScripts[url] = script;

    var script = document.createElement( "script" );
    script.setAttribute( 'type', "text/javascript" );
    script.setAttribute( 'src', url );
    script.setAttribute( 'id', url );
    script.onLoadedCallback = onLoaded;
    script.onCompletedCallback = onCompleted;
    script.onload = function() {        
        if ( this.onLoadedCallback != null ) {
            this.onLoadedCallback.call( this );   
        }
    }
    document.head.appendChild( script );
    return script;
}

 loadScript( "me/tojo13/App.tojo13.js", function() {
 }, function() {  
	App.startAnimation();
} );  

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-80236281-1', 'auto');
ga('send', 'pageview');

function Pixel(){
    this.position = new THREE.Vector2();
    this.color = [],
    this.size = 1;
}

function deg( degree ) { 
    return degree * ( Math.PI/180 ); 
}

function rand( min, max ) {
    return Math.random() * max + min;
}

function apply( object ) {
    object.updateProjectionMatrix();
}
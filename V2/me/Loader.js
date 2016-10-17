function loadScript(url, onComplete) {
    var callback = onComplete;
    var script = document.createElement( "script" );
    script.setAttribute( 'type', "text/javascript" );
    script.setAttribute( 'src', url );
    script.onload = script.onreadystatechange = function () {
      if ( callback != null ) {
          callback.call();          
      }
    }
    document.head.appendChild( script );
    return script;
}

var WebVRConfig = { DEFER_INITIALIZATION: true }
var polyfillScript  = loadScript( "js/webvr-polyfill.js", function() {
    InitializeWebVRPolyfill();	
    var threeScript = loadScript( "js/three.min.js", function() {
        var orbitControlsScript = loadScript( "js/OrbitControls.js", function() {
            var webVRScript = loadScript( "js/Webvr.js", function() {
                var vrControlsScript = loadScript( "js/VRControls.js", function() {
                    var vrEffectScript = loadScript( "js/VREffect.js", function() {
                        //var tweenScript = loadScript( "me/Tween.js", function() {                            
                            var appScript = loadScript( "me/App.js", function() {
                                var modelScript = loadScript( "me/App.Models.js", function() {   
                                    App.load(); 
                                    App.runApp();            
                                } );    
                            } );
                        //} );                      
                    } );
                } );
            } );
        } );        
        var utilsScript = loadScript( "me/Utils.js" );
    } );
} );

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-80236281-1', 'auto');
ga('send', 'pageview');
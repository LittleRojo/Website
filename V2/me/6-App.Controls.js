var controlScript = document.getElementById("me/6-App.Controls.js");
loadScript( "me/5-App.Motion.js", function() {
    if( controlScript.onLoadedCallback != null ) {
        controlScript.onLoadedCallback.call( self );
    }   
}, function() {
    if( controlScript.onCompletedCallback != null ) {
        App.Controls = new Controls();
        controlScript.onCompletedCallback.call( self );    
    }
} );

Controls = function() {    
    console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
	// 
	var joystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'cyan',
		limitStickTravel: true,
		stickRadius	: 120		
	});
	joystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
	// one on the right of the screen
	var joystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'orange',
		limitStickTravel: true,
		stickRadius	: 0		
	});
	joystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
	joystick.addEventListener('touchStart', function(){
		console.log('fire')
	})
}

Controls.prototype.onLeftJoystickMove = function(url) {
}

Controls.prototype.onRightJoystickMove = function(song) {
}
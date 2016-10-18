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
    var offset = 70;   
    //LEFT SIDE
	App.leftJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'cyan',
		limitStickTravel: true,
		stickRadius	: 120,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: offset,
        baseY: window.innerHeight - offset,        	
	});
	App.leftJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX < window.innerWidth/2 )	return false;
		return true
	});
    App.leftJoystick.addEventListener('touchStart', function(){
		console.log('right')
	})
    
    //RIGHT SIDE
	App.rightJoystick	= new VirtualJoystick({
		container	: document.body,
		strokeStyle	: 'brown',
		limitStickTravel: true,
		stickRadius	: 120,
        mouseSupport: true,	
        //stickElement: new stick canvas,
        //baseElement: new base canvas,
        stationaryBase: true,
        baseX: window.innerWidth - offset,
        baseY: window.innerHeight - offset,	
	});
	App.rightJoystick.addEventListener('touchStartValidation', function(event){
		var touch	= event.changedTouches[0];
		if( touch.pageX >= window.innerWidth/2 )	return false;
		return true
	});
	App.rightJoystick.addEventListener('touchStart', function(){
		console.log('right')
	})
}

Controls.prototype.onLeftJoystickMove = function(url) {
}

Controls.prototype.onRightJoystickMove = function(song) {
}
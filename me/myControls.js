function click( event ) {
    var x = event.x;
    if( event.pageX ) {
        x = event.pageX;
    }
    var y = event.y;
    if( event.pageY ) {
        y = event.pageY + 135;
    }
    if( experiencePlayer ){
        //PLAY
        if( x >= 10 && x <= 35 && y >= 765 && y <= 780 ) {
            clock.start();
            animationHandle = 1;
        }

        //PAUSE
        if( x > 55 && x < 85 && y > 765 && y < 780 ) {
            clock.stop();
            animationHandle = 0;
        }

        //STEP BACK
        if( x > 105 && x < 135 && y > 765 && y < 780 ) {
            clock.start();            
            animationHandle = -2;           
        }

        //STEP FORWARD
        if( x > 156 && x < 186 && y > 765 && y < 780 ) {
            clock.start();
            animationHandle = 2;           
        }

        //TIMELINE
        if( x > window.innerWidth / 2 + 75 && x < window.innerWidth && y > 765 && y < 780 ) {
            experiencePlayer.timelineCanvas.clearRect( 0, 0, window.innerWidth / 2, 100 );
            experiencePlayer.timelineCanvas.fillStyle = 'brown';
            experiencePlayer.timelineCanvas.fillRect( 0, 50, window.innerWidth + 75, 15 );
            experiencePlayer.timelineCanvas.fillStyle = 'gray';
            experiencePlayer.timelineCanvas.fillRect( x - (window.innerWidth / 2 + 75), 50, 20, 50 );
        }
    }
}
window.addEventListener( 'mousedown', click, false);
window.addEventListener( 'touchstart', click, false );

function experiencePlayer() {
    this.objects = [];

    //PLAY
    experiencePlayer.playCanvas = document.createElement( 'canvas' );
    experiencePlayer.playCanvas.id = 'playCanvas';
    experiencePlayer.playCanvas.style.position = 'absolute';
    experiencePlayer.playCanvas.style.left = 0;
    experiencePlayer.playCanvas.style.top = window.innerHeight * .95;
    experiencePlayer.playCanvas.style.width = 50;
    experiencePlayer.playCanvas.style.height = 50;
    experiencePlayer.playCanvas.style.zIndex = 150;
    document.body.appendChild( experiencePlayer.playCanvas );

    this.playContext = experiencePlayer.playCanvas.getContext( '2d' );
    this.playContext.fillStyle = 'red';
    this.playContext.beginPath();
    this.playContext.moveTo( 50, 40 );   
    this.playContext.lineTo( 200, 70 );     
    this.playContext.lineTo( 50, 100 );
    this.playContext.fill();

    //PAUSE
    experiencePlayer.pauseCanvas = document.createElement( 'canvas' );
    experiencePlayer.pauseCanvas.id = 'pauseCanvas';
    experiencePlayer.pauseCanvas.style.position = 'absolute';
    experiencePlayer.pauseCanvas.style.left = 50;
    experiencePlayer.pauseCanvas.style.top = window.innerHeight * .95;
    experiencePlayer.pauseCanvas.style.width = 50;
    experiencePlayer.pauseCanvas.style.height = 50;
    experiencePlayer.pauseCanvas.style.zIndex = 150;
    document.body.appendChild( experiencePlayer.pauseCanvas );

    this.pauseCanvas = experiencePlayer.pauseCanvas.getContext( '2d' );
    this.pauseCanvas.fillStyle = 'blue';
    this.pauseCanvas.fillRect( 90, 40, 30, 60 );     
    this.pauseCanvas.fillRect( 140, 40, 30, 60 );
    
    //STEP BACK
    experiencePlayer.stepForwardCanvas = document.createElement( 'canvas' );
    experiencePlayer.stepForwardCanvas.id = 'stepBackCanvas';
    experiencePlayer.stepForwardCanvas.style.position = 'absolute';
    experiencePlayer.stepForwardCanvas.style.left = 110;
    experiencePlayer.stepForwardCanvas.style.top = window.innerHeight * .95;
    experiencePlayer.stepForwardCanvas.style.width = 50;
    experiencePlayer.stepForwardCanvas.style.height = 50;
    experiencePlayer.stepForwardCanvas.style.zIndex = 150;
    document.body.appendChild( experiencePlayer.stepForwardCanvas );

    this.stepForwardCanvas = experiencePlayer.stepForwardCanvas.getContext( '2d' );
    this.stepForwardCanvas.fillStyle = 'purple';
    this.stepForwardCanvas.fillRect( 50, 60, 100, 20 );     
    this.stepForwardCanvas.fillStyle = 'purple';
    this.stepForwardCanvas.beginPath();
    this.stepForwardCanvas.moveTo( 60, 35 );   
    this.stepForwardCanvas.lineTo( 0, 70 );     
    this.stepForwardCanvas.lineTo( 60, 105 );
    this.stepForwardCanvas.fill();

    //STEP FORWARD
    experiencePlayer.stepForwardCanvas = document.createElement( 'canvas' );
    experiencePlayer.stepForwardCanvas.id = 'stepForwardCanvas';
    experiencePlayer.stepForwardCanvas.style.position = 'absolute';
    experiencePlayer.stepForwardCanvas.style.left = 150;
    experiencePlayer.stepForwardCanvas.style.top = window.innerHeight * .95;
    experiencePlayer.stepForwardCanvas.style.width = 50;
    experiencePlayer.stepForwardCanvas.style.height = 50;
    experiencePlayer.stepForwardCanvas.style.zIndex = 150;
    document.body.appendChild( experiencePlayer.stepForwardCanvas );

    this.stepForwardCanvas = experiencePlayer.stepForwardCanvas.getContext( '2d' );
    this.stepForwardCanvas.fillStyle = 'purple';
    this.stepForwardCanvas.fillRect( 50, 60, 100, 20 );     
    this.stepForwardCanvas.fillStyle = 'purple';
    this.stepForwardCanvas.beginPath();
    this.stepForwardCanvas.moveTo( 140, 35 );   
    this.stepForwardCanvas.lineTo( 200, 70 );     
    this.stepForwardCanvas.lineTo( 145, 105 );
    this.stepForwardCanvas.fill();

    //POSITION - FORWARD
    experiencePlayer.stepForwardCanvas = document.createElement( 'canvas' );
    experiencePlayer.stepForwardCanvas.id = 'positionCanvas';
    experiencePlayer.stepForwardCanvas.style.position = 'absolute';
    experiencePlayer.stepForwardCanvas.style.left = window.innerWidth / 2 + 75;
    experiencePlayer.stepForwardCanvas.style.top = window.innerHeight * .95;
    experiencePlayer.stepForwardCanvas.style.width = window.innerWidth / 2 - 110;
    experiencePlayer.stepForwardCanvas.style.height = 50;
    experiencePlayer.stepForwardCanvas.style.zIndex = 150;
    document.body.appendChild( experiencePlayer.stepForwardCanvas );
    
    this.timelineCanvas = experiencePlayer.stepForwardCanvas.getContext( '2d' );
    this.timelineCanvas.fillStyle = 'brown';
    this.timelineCanvas.fillRect( 0, 50, window.innerWidth + 75, 15 );
    this.timelineCanvas.fillStyle = 'gray';
    this.timelineCanvas.fillRect( 0, 50, 20, 50 );
}

experiencePlayer.prototype.add = function( object3d ) {
    return;

    this.objects.push( object3d );
    for( var a = 0; a < this.objects.length; a++ ) {
        this.context.font = "12px serif";
        this.context.textBaseline = "hanging";
        this.context.fillStyle = 'blue';
        //this.context.textAlign = "center"
        this.context.fillText(this.objects[a].name + ": (" + this.objects[a].position.x + ", " + this.objects[a].position.y + ", " + this.objects[a].position.z + ")" , 0, 0, 400 );
    }
}

experiencePlayer.prototype.update = function() {
    //this.context.clearRect( 0, 0, 300, 300 );

    for( var a = 0; a < this.objects.length; a++ ) {
        this.context.font = "12px serif";
        this.context.textBaseline = "hanging";
        this.context.fillStyle = 'blue';
        //this.context.textAlign = "center"
        this.context.fillText(this.objects[a].name + ": (" + Math.floor( this.objects[a].position.x ) + ", " + Math.floor( this.objects[a].position.y ) + ", " + Math.floor( this.objects[a].position.z ) + ")" , 0, 0, 400 );
    }
}

experiencePlayer = new experiencePlayer();
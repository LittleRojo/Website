var musicScript = document.getElementById("me/6-App.Music.js");
loadScript( "me/5-App.Motion.js", function() {
    if( musicScript.onLoadedCallback != null ) {
        musicScript.onLoadedCallback.call( self );
    }   
}, function() {
    if( musicScript.onCompletedCallback != null ) {
        App.Music = new Music();
        musicScript.onCompletedCallback.call( self );    
    }
} );

Music = function() {    
}

Music.prototype.startSong = function(url) {
}

Music.prototype.stopSong = function(song) {
}
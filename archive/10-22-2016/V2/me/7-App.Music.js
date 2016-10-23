var musicScript = document.getElementById("me/7-App.Music.js");
loadScript( "me/6-App.Controls.js", function() {
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
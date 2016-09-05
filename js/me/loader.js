function loader(code, name, url, callback) {
    this.code = code;
    this.name = name;
    this.url = url;
    this.callback = callback;
    
    if(url != null) {
        this.loadURL();
    }
}

loader.prototype.loadURL = function() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = this.url;
	script.onload = this.callback;
	
    var head = document.getElementById( 'documentHead' );
    head.appendChild(script);
}

loader.prototype.invoke = function() {
    eval(this.code + "//@ sourceURL=" + this.name);    
}
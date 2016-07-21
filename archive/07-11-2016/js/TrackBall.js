 // need both for FF and Webkit - others I haven't tested
  window.addEventListener('DOMMouseScroll', mousewheel, false);
  window.addEventListener('mousewheel', mousewheel, false);

  function mousewheel( event )
  {
      var amount = 100; // parameter

      // get wheel direction 
       var d = ((typeof e.wheelDelta != "undefined")?(-e.wheelDelta):e.detail);
        d = 100 * ((d>0)?1:-1);

        // do calculations, I'm not using any three.js internal methods here, maybe there is a better way of doing this
        // applies movement in the direction of (0,0,0), assuming this is where the camera is pointing
        var cPos = camera.position;
        var r = cPos.x*cPos.x + cPos.y*cPos.y;
        var sqr = Math.sqrt(r);
        var sqrZ = Math.sqrt(cPos.z*cPos.z + r);

        var nx = cPos.x + ((r==0)?0:(d * cPos.x/sqr));
        var ny = cPos.y + ((r==0)?0:(d * cPos.y/sqr));
        var nz = cPos.z + ((sqrZ==0)?0:(d * cPos.z/sqrZ));

        // verify we're applying valid numbers
        if (isNaN(nx) || isNaN(ny) || isNaN(nz))
          return;

        cPos.x = nx;
        cPos.y = ny;
        cPos.z = nz;
  }

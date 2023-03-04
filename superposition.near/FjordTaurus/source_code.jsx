const scriptSrc = `

<style>
* { margin: 0; padding: 0;}

body, html { height:100%; }

#c {
    position:absolute;
    width:100%;
    height:100%;
}
</style>

<script async src="https://unpkg.com/es-module-shims@1.3.6/dist/es-module-shims.js"></script>

<script type="importmap">
  {
    "imports": {
      "three": "https://unpkg.com/three@0.145.0/build/three.module.js"
    }
  }
</script>

<script type="module">

    function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "countdown's over!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

countdown( "countdown", 1, 5 );
countdown( "countdown2", 100, 0 );


            
</script>
`;

return (
  <div class="w-100">
    <div id="countdown"></div>
    <div id="countdown2"></div>
    <iframe
      srcDoc={scriptSrc}
      height="100%"
      onMessage={(data) => {
        State.update({ ...data });
      }}
      style={{ height: 300, width: "100%" }}
    />
  </div>
);

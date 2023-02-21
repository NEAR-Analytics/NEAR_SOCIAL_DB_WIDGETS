const scriptSrc = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  background-image: url('./assets/bg.svg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

#canvas1 {
  width:  100vw;
  height: 100vh;
  margin: 0;
  z-index: 100;
  border: none;
  border-radius: 100px;
}

// img {
//   display: none;
// }
</style>

<canvas id="canvas1"></canvas>
          <img id="playerImage" src="https://ik.imagekit.io/onyedika/skycross/player_BIG_mq9uKo5ll.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939877107" alt="" />
    <img id="layer1Image" src="https://ik.imagekit.io/onyedika/skycross/1_JZI4rwmIY9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858101" alt="" />
    <img id="layer2Image" src="https://ik.imagekit.io/onyedika/skycross/2_nnjLeWkZZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676993058655" alt="" />
    <img id="layer3Image" src="https://ik.imagekit.io/onyedika/skycross/3_bfIr7gkw-1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859797" alt="" />
    <img id="layer4Image" src="https://ik.imagekit.io/onyedika/skycross/4_Gx3192487.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859766" alt="" />
    <img id="layer5Image" src="https://ik.imagekit.io/onyedika/skycross/7_-0OacUA6m.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676993162515" alt="" />
    <img id="flyImage" src="https://ik.imagekit.io/onyedika/skycross/bomb_iG_K37qGR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859611" alt=""/>
    <img id="plantImage" src="https://ik.imagekit.io/onyedika/skycross/cherry_ADI5AiRot.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939861479" alt=""/>
    <img id="spiderImage" src="https://ik.imagekit.io/onyedika/skycross/enemy_spider_big_n3r4HKyjV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939861559" alt=""/>
    <img id="spiderBigImage" src="https://ik.imagekit.io/onyedika/skycross/enemy_spider_big_n3r4HKyjV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939861559" alt=""/>
    <img id="fireTexture" src="https://ik.imagekit.io/onyedika/skycross/fire_bwpPPyGYv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939863595" alt=""/>
    <img id="boomImage" src="https://ik.imagekit.io/onyedika/skycross/bomb_iG_K37qGR.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939859611" alt=""/>
    <img id="liveImage" src="https://ik.imagekit.io/onyedika/skycross/apple_GS0a8l34K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858074" alt=""/>
    <img id="fireBallImage" src="https://ik.imagekit.io/onyedika/skycross/projectile_8OBktN6_A.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939866264" alt=""/>
    <img id="blastImage" src="https://ik.imagekit.io/onyedika/skycross/blast_ilksOODqF.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939858435" alt=""/>
    <img id="fruityImage" src="https://ik.imagekit.io/onyedika/skycross/fruity_nBAzOrsrS.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676939862429" alt=""/>


`;

return (
  <div class="App">
    <iframe
      srcDoc={scriptSrc}
      height="100%"
      onMessage={(data) => {
        State.update({ ...data });
      }}
      style={{}}
    />
  </div>
);

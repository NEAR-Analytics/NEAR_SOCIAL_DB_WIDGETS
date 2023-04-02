function getDiceResult(count) {
  if (!count) count = 1;
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push(Math.floor(Math.random() * 6) + 1);
  }
  return results;
}

if (!props.mainColor) {
  props.mainColor = "white";
}

if (!props.dotsColor) {
  props.dotsColor = "black";
}

if (!props.borderColor) {
  props.borderColor = "black";
}

if (!props.diceCount) {
  props.diceCount = 2;
}

let diceResult = getDiceResult(props.diceCount);

if (props.diceResult) {
  diceResult = props.diceResult;
}

const iframeCode = `<style>
        body {
            background-color: rgba(255, 255, 255, 0.7);
        }

        .dice-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: 20px;
            width: 100%;
            gap: 200px;
            flex-wrap: wrap;
        }

        .dice {
            position: relative;
        }
    </style>
    <div class="dice-container">
    </div>
    <script>
        const edges = {
            1: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="64" cy="64" r="12" fill="${props.dotsColor}"/>
</svg>\`,
            2: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="36" cy="36" r="12" fill="${props.dotsColor}"/>
<circle cx="92" cy="92" r="12" fill="${props.dotsColor}"/>
</svg>\`,
            3: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="64" cy="64" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="36" r="12" fill="${props.dotsColor}"/>
<circle cx="92" cy="92" r="12" fill="${props.dotsColor}"/>
</svg>\`,
            4: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="36" cy="36" r="12" fill="${props.dotsColor}"/>
<circle cx="92" cy="92" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="92" r="12" transform="rotate(-90 36 92)" fill="${props.dotsColor}"/>
<circle cx="92" cy="36" r="12" transform="rotate(-90 92 36)" fill="${props.dotsColor}"/>
</svg>\`,
            5: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="64" cy="64" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="36" r="12" fill="${props.dotsColor}"/>
<circle cx="92" cy="92" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="92" r="12" transform="rotate(-90 36 92)" fill="${props.dotsColor}"/>
<circle cx="92" cy="36" r="12" transform="rotate(-90 92 36)" fill="${props.dotsColor}"/>
</svg>\`,
            6: \`<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2.5" y="2.5" width="123" height="123" rx="17.5" fill="${props.mainColor}" stroke="${props.borderColor}" stroke-width="5"/>
<circle cx="92" cy="64" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="64" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="36" r="12" fill="${props.dotsColor}"/>
<circle cx="92" cy="92" r="12" fill="${props.dotsColor}"/>
<circle cx="36" cy="92" r="12" transform="rotate(-90 36 92)" fill="${props.dotsColor}"/>
<circle cx="92" cy="36" r="12" transform="rotate(-90 92 36)" fill="${props.dotsColor}"/>
</svg>\`
        };

        const diceContainer = document.querySelector('.dice-container');

        // dice must appear from bottom to top, and then disappear from top to bottom

        const animateDiceToTop = (id, initialTop, initialOpacity) => {
            const dice = document.getElementById(id);
            dice.style.top = initialTop + 'px';
            dice.style.opacity = initialOpacity;
            return new Promise(
                resolve => {
                    const interval = setInterval(() => {
                        if (initialTop > 200) {
                            initialTop -= 4;
                            dice.style.top = initialTop + 'px';
                        }
                        if (initialOpacity <= 1) {
                            initialOpacity += 0.05;
                            dice.style.opacity = initialOpacity;
                        }
                        if (initialTop <= 200 && initialOpacity >= 1) {
                            dice.style.top = "200px";
                            dice.style.opacity = "1";
                            clearInterval(interval);
                            resolve();
                        }
                    }, 10);
                }
            )
        }

        const rollDice = (...values) => {
            const promises = [];
            for (let i in values) {
                // create div element inside diceContainer
                const dice = document.createElement('div');
                dice.classList.add('dice');
                dice.id = \`dice\${i}\`;
                diceContainer.appendChild(dice);
                dice.innerHTML = edges[values[i]];
                promises.push(animateDiceToTop(\`dice\${i}\`, 500, 0));
            }
            return Promise.all(promises);
        }

        window.addEventListener("message", async (event) => {
            // event.data in format "1,2"
            const values = event.data.split(',').map(value => parseInt(value));
            await rollDice(...values);
            // wait for second
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.top.postMessage('animationFinished', '*')
        })
    </script>`;

const IframeParent = styled.div`
  position: static;
  height: 1000px;
  width: 100%;
  margin-top: 0px;
`;

return (
  <>
    <IframeParent>
      <iframe
        srcDoc={iframeCode}
        class="w-100 h-100"
        style={{ width: "100%", height: "100%", top: 0, position: "absolute" }}
        message={diceResult.join(",")}
        onMessage={(message) => props.callback(diceResult)}
      />
    </IframeParent>
  </>
);

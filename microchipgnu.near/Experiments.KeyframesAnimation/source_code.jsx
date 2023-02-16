const srcData = `

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.newspaper {
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  background-color: white;
  cursor: pointer;
}
</style>

<script>

const init = () => {
    const newspaperSpinning = [
        { transform: 'rotate(0) scale(1)' },
        { transform: 'rotate(360deg) scale(0)' }
    ];

    const newspaperTiming = {
        duration: 2000,
        iterations: 1,
    }

    const newspaper = document.querySelector(".newspaper");

    newspaper.addEventListener('click', () => {
        newspaper.animate(newspaperSpinning, newspaperTiming);
    });
}

window.addEventListener("load", (event) => {
    init()
});

</script>

<div class="newspaper">NEAR PROTOCOL<br />IS THE BOS </div>
`;

return (
  <>
    <iframe
      srcDoc={srcData}
      style={{
        height: 300,
        width: "100%",
      }}
    />
  </>
);

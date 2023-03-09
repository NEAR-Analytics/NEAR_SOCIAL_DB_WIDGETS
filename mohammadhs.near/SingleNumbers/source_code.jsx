let data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/ecdb95f8-7da3-4b52-9843-e088bb83e437/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

function numberWithCommas(x) {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

return (
  <>
    <div class="container border border-info p-3 text-center min-vw-100">
      <h1>Hello</h1>
      <p> ss </p>
    </div>
  </>
);

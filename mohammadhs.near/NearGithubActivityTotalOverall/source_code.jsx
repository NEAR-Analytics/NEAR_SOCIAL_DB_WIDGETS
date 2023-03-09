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

let Style = styled.div``;

return (
  <Style>
    <div class="row">
      <div class="col">
        <div class="container border border-info p-3 text-center">
          <h6>Total Pull Requests</h6>
          <h2> {numberWithCommas(parseInt(data.body[0].PULL_REQS))} </h2>
        </div>
      </div>
      <div class="col">
        <div class="container border border-info p-3 text-center">
          <h6>Total Developers</h6>
          <h2> {numberWithCommas(parseInt(data.body[0].DEVS))} </h2>
        </div>
      </div>
      <div class="col">
        <div class="container border border-info p-3 text-center">
          <h6>Total Issues</h6>
          <h2> {numberWithCommas(parseInt(data.body[0].ISSUES))} </h2>
        </div>
      </div>
      <div class="col">
        <div class="container border border-info p-3 text-center">
          <h6>Total Repositories</h6>
          <h2> {numberWithCommas(parseInt(data.body[0].REPOS))} </h2>
        </div>
      </div>
    </div>
  </Style>
);

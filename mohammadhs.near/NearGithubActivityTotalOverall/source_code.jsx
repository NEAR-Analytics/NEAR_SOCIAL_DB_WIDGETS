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
      <div class="col-12 mb-2">
        <div class="container border border-info p-3 text-center">
          <h1>Near Github Activity</h1>
          <a
            href="https://flipsidecrypto.xyz/edit/queries/3328e097-8469-4179-a82a-91156168b6e4"
            target="_blank"
          >
            https://github.com/near
          </a>
          <p>
            {" "}
            In this widget, you can see the status of NEAR GitHub. Initially,
            you can get an overview of different parameters including Pull
            Requests, Developers, Issues, and Repositories (
            <a
              href="https://flipsidecrypto.xyz/edit/queries/ecdb95f8-7da3-4b52-9843-e088bb83e437"
              target="_blank"
            >
              Source
            </a>
            ). Next, you can view monthly charts that display the status of
            Active Repositories, Pull Requests, and Active Developers.
          </p>
        </div>
      </div>
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

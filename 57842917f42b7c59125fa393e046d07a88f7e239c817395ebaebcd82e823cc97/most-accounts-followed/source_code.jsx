// NEAR - 17. Social Widget Welder
// Code Credit: https://near.social/#/mob.near/widget/WidgetSource?src=forgash.near/widget/most-accounts-followed

let data1 = fetch(
  "https://node-api.flipsidecrypto.com/api/v2/queries/867a9892-d15d-485f-9e5a-1d1b6b42ace1/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

let data2 = fetch(
  "https://node-api.flipsidecrypto.com/api/v2/queries/52e7ad62-bddc-4cc8-be66-405c8afca285/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

let data3 = fetch(
  "https://node-api.flipsidecrypto.com/api/v2/queries/cf2734e4-784a-4a96-bbd8-2caf3f919e6f/data/latest",
  {
    subscribe: true,
    method: "GET",
    headers: {
      Accept: "*/*",
    },
  }
);

let datan = fetch(
  "https://node-api.flipsidecrypto.com/api/v2/queries/558eb5b2-66e8-4dfe-a62a-93ff67620c5b/data/latest",
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

// inspiration for loop forked from Pikespeak's contract widget
// https://near.social/#/frichard2.near/widget/most-active-contracts

let tableRows1 = [];
for (let i = 0; i < data1.body.length; i++) {
  const frank = data1.body[i];
  tableRows1.push(
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        <a
          style={linkStyle}
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${frank.ACCOUNT}`}
          target="_blank"
        >
          {frank.ACCOUNT}
        </a>
      </td>
      <td style={tdStyle}>{numberWithCommas(parseInt(frank.Liked_Posts))}</td>
    </tr>
  );
}

let tableRows2 = [];
for (let i = 0; i < data2.body.length; i++) {
  const frank = data2.body[i];
  tableRows2.push(
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        <a
          style={linkStyle}
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${frank.Account}`}
          target="_blank"
        >
          {frank.Account}
        </a>
      </td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(frank.Widgets_Created))}
      </td>
    </tr>
  );
}

let tableRows3 = [];
for (let i = 0; i < data3.body.length; i++) {
  const frank = data3.body[i];
  tableRows3.push(
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        <a
          style={linkStyle}
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${frank.ACCOUNT}`}
          target="_blank"
        >
          {frank.ACCOUNT}
        </a>
      </td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(frank.Received_Comment_Cnt))}
      </td>
    </tr>
  );
}

let tableRowsn = [];
for (let i = 0; i < datan.body.length; i++) {
  const frank = datan.body[i];
  tableRowsn.push(
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        <a
          style={linkStyle}
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${frank.Account}`}
          target="_blank"
        >
          {frank.Account}
        </a>
      </td>
      <td style={tdStyle}>{numberWithCommas(parseInt(frank.Follower))}</td>
      <td style={tdStyle}>{numberWithCommas(parseInt(frank.Following))}</td>
      <td style={tdStyle}>{numberWithCommas(parseInt(frank.Unfollow))}</td>
    </tr>
  );
}

let pageHeader1 = (
  <div>
    <h2 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top 10 Accounts
      <small class="text-muted">by Beloved Posts</small>
    </h2>
    <p>
      Powered by
      <img
        src="https://www.gitbook.com/cdn-cgi/image/width=40,height=40,fit=contain,dpr=2,format=auto/https%3A%2F%2F1048384174-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-LdEnDLYh6Su5z7LbnEZ%252Favatar.png%3Fgeneration%3D1575431493257333%26alt%3Dmedia"
        height="15px"
        width="15px"
      ></img>
      Flipside
    </p>
    <p class="blockquote-footer">
      data set to refresh once every 24h,
      <a href="https://app.flipsidecrypto.com/velocity/queries/867a9892-d15d-485f-9e5a-1d1b6b42ace1">
        view and fork the source query
      </a>
    </p>
  </div>
);

let pageHeader2 = (
  <div>
    <h2 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top 10 Accounts
      <small class="text-muted">by Created Widget</small>
    </h2>
    <br></br>
    <p class="blockquote-footer">
      data set to refresh once every 24h,
      <a href="https://app.flipsidecrypto.com/velocity/queries/52e7ad62-bddc-4cc8-be66-405c8afca285">
        view and fork the source query
      </a>
    </p>
  </div>
);

let pageHeader3 = (
  <div>
    <h2 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top 10 Accounts
      <small class="text-muted">by Received Comments</small>
    </h2>
    <br></br>
    <p class="blockquote-footer">
      data set to refresh once every 24h,
      <a href="https://app.flipsidecrypto.com/velocity/queries/cf2734e4-784a-4a96-bbd8-2caf3f919e6f">
        view and fork the source query
      </a>
    </p>
  </div>
);

let pageHeadern = (
  <div>
    <h2 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top 100 Accounts Follower/Following/Unfollow
      <small class="text-muted">by following count</small>
    </h2>
    <br></br>
    <p class="blockquote-footer">
      data set to refresh once every 24h,
      <a href="https://app.flipsidecrypto.com/velocity/queries/558eb5b2-66e8-4dfe-a62a-93ff67620c5b">
        view and fork the source query
      </a>
    </p>
  </div>
);

let tbl1 = (
  <div class="table-responsive-sm">
    <table class="table table-borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Account</th>
          <th scope="col">Beloved Posts Count</th>
        </tr>
      </thead>
      <tbody>{tableRows1}</tbody>
    </table>
  </div>
);

let tbl2 = (
  <div class="table-responsive-sm">
    <table class="table table-borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Account</th>
          <th scope="col">Widgets Created Count</th>
        </tr>
      </thead>
      <tbody>{tableRows2}</tbody>
    </table>
  </div>
);

let tbl3 = (
  <div class="table-responsive-sm">
    <table class="table table-borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Account</th>
          <th scope="col">Received Comment Count</th>
        </tr>
      </thead>
      <tbody>{tableRows3}</tbody>
    </table>
  </div>
);

let tbln = (
  <div class="table-responsive-sm">
    <table class="table table-borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">Account</th>
          <th scope="col">Follower</th>
          <th scope="col">Following</th>
          <th scope="col">Unfollow</th>
        </tr>
      </thead>
      <tbody>{tableRowsn}</tbody>
    </table>
  </div>
);

return (
  <div>
    <div>{pageHeader1}</div>
    <div>{tbl1}</div>
    <div>{pageHeader2}</div>
    <div>{tbl2}</div>
    <div>{pageHeader3}</div>
    <div>{tbl3}</div>
    <div>{pageHeadern}</div>
    <div>{tbln}</div>
  </div>
);

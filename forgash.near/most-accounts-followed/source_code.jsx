// Most Followings Example
// very basic representation of a table from a flipside query

let data = fetch(
  "https://api.flipsidecrypto.com/api/v2/queries/e3075086-9a43-4923-96c5-aa64d8d6b7d6/data/latest",
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

let tableRows = [];
for (let i = 0; i < data.body.length; i++) {
  const frank = data.body[i];
  tableRows.push(
    <tr>
      <th scope="row">{i + 1}</th>
      <td>
        <a
          style={linkStyle}
          href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${frank.SIGNER_ID}`}
          target="_blank"
        >
          {frank.SIGNER_ID}
        </a>
      </td>
      <td style={tdStyle}>
        {numberWithCommas(parseInt(frank.GROSS_FOLLOWING))}
      </td>
    </tr>
  );
}

let pageHeader = (
  <div>
    <h1 style={{ paddingTop: "25px", paddingBottom: "0px" }}>
      Top 100 Accounts
      <small class="text-muted">by following count</small>
    </h1>
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
      <a href="https://flipsidecrypto.xyz/edit/queries/e3075086-9a43-4923-96c5-aa64d8d6b7d6">
        view and fork the source query
      </a>
    </p>
  </div>
);

let tbl = (
  <div class="table-responsive-sm">
    <table class="table table-borderless">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Rank</th>
          <th scope="col">User</th>
          <th scope="col">Total Follows</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  </div>
);

return (
  <div>
    <div>{pageHeader}</div>
    <div>{tbl}</div>
  </div>
);

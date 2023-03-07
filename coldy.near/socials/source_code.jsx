const { account } = props;
const data = Social.getr(`${account}/profile`);
console.log(data);
return (
  <>
    <h2>Near Social social links:</h2>
    <div id="near-social-social">
      <ul>
        <li>telegram: {data?.linktree?.telegram}</li>
        <li>twitter: {data?.linktree?.twitter}</li>
      </ul>
    </div>
  </>
);

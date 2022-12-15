const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

function createOptInDataElements(dataElements) {
  // verify object is formatted JSON
  // build form based on elements
  // return form
}

let bigForm = (
  <div>
    <label for="fname">{`First Name: `}</label>
    <br></br>
    <input type="text" id="fname" name="fname"></input>
    <input type="checkbox" id="agecheckb" name="agecheckb" value="true"></input>
    <br></br>
    <label for="lname">{`Last Name: `}</label>
    <br></br>
    <input type="text" id="lname" name="lname"></input>
  </div>
);

let page = (
  <div>
    <h1>{`Hello, ${accountId}!`}</h1>
    <p>
      {`Please fill out the following information and check the box if are
      willing to earn rewards by sharing this data.`}
    </p>
    <br></br>
    {bigForm}
  </div>
);

return page;

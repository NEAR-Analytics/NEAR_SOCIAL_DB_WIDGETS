const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

let page = (
  <div>
    <h1>{`Hello, ${accountId}!`}</h1>
    <br></br>
    <form>
      <label for="fname">{`First name: `}</label>
      <br></br>
      <input type="text" id="fname" name="fname"></input>
      <br></br>
      <label for="lname">{`Last name: `}</label>
      <br></br>
      <input type="text" id="lname" name="lname"></input>
    </form>
  </div>
);

return page;

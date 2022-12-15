const accountId = context.accountId;

if (context.loading) {
  return "Loading";
}

if (!accountId) {
  return "Please sign in with NEAR wallet to use this widget";
}

let title = <h1>{`Hello, ${accountId}!`}</h1>;
let form = 
  <form>
      <label for="fname">{`First name: `}</label><br>
    <input type="text" id="fname" name="fname"><br>
    <label for="lname">{`Last name: `}</label><br>
    <input type="text" id="lname" name="lname">
  </form>
;

return form;
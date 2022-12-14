const res = fetch("http://35.236.75.242:4000");
const validators = res.body;

const allWidgets = [];

for (let i = 0; i < validators.length; ++i) {
  let validator = validators[i];
  console.log(validator);

  allWidgets.push(<div className="mb-2">{validator.accountId}</div>);
}

return <div className="container row">{allWidgets}</div>;

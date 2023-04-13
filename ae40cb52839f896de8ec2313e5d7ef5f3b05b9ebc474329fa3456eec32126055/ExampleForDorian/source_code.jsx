// At some point, this widget will be composed in the following way
// <Widget src=<this-widget> props={{name: "Dorian"}}
const name = props.name;

let greeting = "";

if (name !== undefined) {
  return <div>Hello {name}</div>;
} else {
  return <div>Please setup a name</div>;
}

const user = "lachlan.near";

return (
  <>
    <h3> Composition </h3>
    <p> Components can be composed </p>
    <hr />

    <Widget src={`${user}/widget/Greetings`} props={props} />
  </>
);

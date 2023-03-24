const myAcc = "gagdiez.near";

return (
  <>
    <h5>Composing Hello</h5>
    <Widget src={`${myAcc}/widget/Hello`} props={props} />

    <hr />

    <h5>Composing Bye</h5>
    <Widget src={`${myAcc}/widget/Bye`} props={props} />
  </>
);

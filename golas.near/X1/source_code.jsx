function calc222(a, b) {
  return a * b;
}

const calc333 = (a, b) => {
  return a / b;
};

const { calc } = require("golas.near/widget/Module-1");

const kkk = "KKK:";

return (
  <div>
    <div>
      <p>{kkk}</p>
    </div>
    <div>{calc222(100, 112)}</div>
    <div>{calc333(100, 112)}</div>
    <div>{calc(2, 3)}</div>
    <Widget src="golas.near/widget/X2" />
  </div>
);

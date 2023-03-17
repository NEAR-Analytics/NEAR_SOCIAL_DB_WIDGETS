const { calc } = require("golas.near/widget/Module-1");
const { calc2 } = require("golas.near/widget/Module-2");

return (
  <div>
    {calc(100, 11)}-{calc2(100, 11)}
  </div>
);

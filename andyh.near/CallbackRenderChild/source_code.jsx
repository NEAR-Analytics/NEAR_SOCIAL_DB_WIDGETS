console.log("[NSCOMP:CallbackRenderChild]");
const component = await props.renderComponent("i am the child");
console.log({ component });
return (
  <div>
    something really cool is loading:
    {Object.keys(component | {}).join("xx")}
  </div>
);
// return <div>i am the child</div>;

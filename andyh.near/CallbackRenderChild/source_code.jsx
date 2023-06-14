console.log("[NSCOMP:CallbackRenderChild]");
console.log("----- awaiting");
const component = await props.renderComponent("i am the child", () =>
  console.log("all done")
);
console.log("----- awaited");
return (
  <div>
    something really cool is loading:
    {component}
  </div>
);
// return <div>i am the child</div>;

console.log("[NSCOMP:CallbackRenderChild]");
console.log('----- awaiting')
const component = await props.renderComponent("i am the child", () =>
console.log('----- awaited')
  console.log("all done")
);
return (
  <div>
    something really cool is loading:
    {component}
  </div>
);
// return <div>i am the child</div>;

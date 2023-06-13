console.log("[NSCOMP:CallbackRenderChild]");
const component = await props.renderComponent("i am the child");
return (
  <div>
    something really cool is loading:
    {component}
  </div>
);
// return <div>i am the child</div>;

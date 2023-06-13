const renderComponent = (msg) => (
  // <Widget src="andyh.near/widget/CallbackRenderWidget" props={{ msg }} />
  <h2>{msg}</h2>
);

console.log("[NSCOMP:CallbackRender]");
return (
  <div>
    {renderComponent("i am da parent")}
    <Widget
      src="andyh.near/widget/CallbackRenderChild"
      props={{
        renderComponent,
      }}
    />
  </div>
);

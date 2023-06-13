const renderComponent = (msg) => {
  console.log({ arguments });
  return (
    <Widget
      src="andyh.near/widget/CallbackRenderWidget"
      props={{ ...arguments, msg }}
    />
    // <h2>{msg}</h2>
  );
};

console.log("[NSCOMP:CallbackRender]");
return (
  <div>
    {/*renderComponent("i am da parent")*/}
    <h2>ima da parent</h2>
    <Widget
      src="andyh.near/widget/CallbackRenderChild"
      props={{
        renderComponent,
      }}
    />
  </div>
);

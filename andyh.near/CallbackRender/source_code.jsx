const renderComponent = (msg, cb) => {
  console.log({ msg, cb });
  return (
    <div>
      <Widget
        src="andyh.near/widget/CallbackRenderWidget"
        props={{ cb, msg }}
      />
    </div>
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

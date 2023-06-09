const renderComponent = (msg) => (
  <Widget src="andyh.near/widget/RenderCallbackWidget" props={{ msg }} />
  //   <h2>{msg}</h2>
);

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

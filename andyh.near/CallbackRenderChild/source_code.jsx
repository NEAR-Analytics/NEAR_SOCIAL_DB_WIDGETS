console.log("[NSCOMP:CallbackRenderChild]");
return <div>{await props.renderComponent("i am the child")}</div>;
// return <div>i am the child</div>;

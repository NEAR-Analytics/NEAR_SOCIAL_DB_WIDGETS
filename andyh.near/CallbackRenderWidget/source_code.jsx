console.log("[NSCOMP:CallbackRenderWidget]");
if (typeof props.cb === "function") {
  await props.cb();
}
return <div>{props.msg}</div>;

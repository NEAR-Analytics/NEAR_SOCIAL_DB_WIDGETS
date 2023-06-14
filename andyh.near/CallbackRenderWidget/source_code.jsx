console.log("[NSCOMP:CallbackRenderWidget]");
console.log({ cb: props.cb });
if (typeof props.cb === "function") {
  await props.cb();
}
return <div>{props.msg}</div>;

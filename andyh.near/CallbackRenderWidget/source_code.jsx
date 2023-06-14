console.log("[NSCOMP:CallbackRenderWidget]");
console.log({ props });
if (typeof props.cb === "function") {
  await props.cb();
}
return <div>{props.msg}</div>;

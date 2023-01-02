if (!props.accountId || !props.onClose) {
  return "Send accountId and onClose() in props";
}

return (
  <div>
    <h1 class="mb-3 text-center">Messages</h1>
    <button onClick={props.onClose()}>{"<"}</button>
  </div>
);

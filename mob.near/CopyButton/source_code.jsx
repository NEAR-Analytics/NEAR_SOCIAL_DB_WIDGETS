return (
  <OverlayTrigger
    placement="auto"
    overlay={
      <Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>
    }
  >
    <button
      className={props.className ?? "btn btn-outline-primary border-0"}
      onClick={() => {
        clipboard.writeText(props.text).then(() => {
          State.update({ copied: true });
          if (props.onCopy) {
            props.onCopy(props.text);
          }
        });
      }}
    >
      {state.copied ? (
        <>
          {props.copiedIcon ?? <i className="bi bi-check-lg" />}{" "}
          {props.copiedLabel ?? props.label}
        </>
      ) : (
        <>
          {props.clipboardIcon ?? <i className="bi bi-clipboard" />}{" "}
          {props.label}
        </>
      )}
    </button>
  </OverlayTrigger>
);

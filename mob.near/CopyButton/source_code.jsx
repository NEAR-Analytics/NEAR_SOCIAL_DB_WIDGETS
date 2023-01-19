return (
  <OverlayTrigger
    placement="auto"
    overlay={
      <Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>
    }
  >
    <button
      className="btn btn-outline-primary border-0"
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
        <i className="bi bi-check-lg" />
      ) : (
        <i className="bi bi-clipboard" />
      )}
      {props.label}
    </button>
  </OverlayTrigger>
);

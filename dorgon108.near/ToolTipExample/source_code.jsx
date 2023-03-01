return (
  <>
    {["top", "right", "bottom", "left"].map((placement) => (
      <div style={{ padding: "10px" }}>
        <OverlayTrigger
          key={placement}
          placement={placement}
          overlay={
            <Tooltip id={`tooltip-${placement}`}>
              Tooltip on <strong>{placement}</strong>.
            </Tooltip>
          }
        >
          <button variant="secondary">Tooltip on {placement}</button>
        </OverlayTrigger>
      </div>
    ))}
  </>
);

return (
  <>
    {"APPS TBD".split("").map((c) => (
      <OverlayTrigger placement="bottom" overlay={<Tooltip>{c}</Tooltip>}>
        <div>{c}</div>
      </OverlayTrigger>
    ))}
  </>
);

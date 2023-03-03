const description = props.description || "";

State.init({
  showAll: false,
});

const Elipsiss = styled.b`
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
`;

const ShowToggle = styled.a`
  cursor: pointer;
  font-weight: bold;
  color: RGBA(13, 110, 253, 1);
  underline: none;
  margin-left: 0.5em;
  padding: 0;
  white-space: nowrap;
`;

return (
  <div className="d-flex flex-row justify-content-start align-items-start">
    <div
      className={`position-relative text-truncate flex-grow-1 ${state.showAll ? "text-wrap" : ""
        }`}
    >
      <Markdown text={description} />
      <Elipsiss hidden={state.showAll}>...</Elipsiss>
    </div>
    {state.showAll && description.length > lengthCutoff ? (
      <a
        className="btn fw-bold text-primary ms-2 p-0 text-nowrap"
        onClick={() => State.update({ showAll: false })}
      >
        Show less
      </a>
    ) : description.length < lengthCutoff ? (
      <></>
    ) : (
      <a
        className="btn fw-bold text-primary ms-2 p-0 text-nowrap"
        onClick={() => State.update({ showAll: true })}
      >
        Read more
      </a>
    )}
  </div>
);

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
  --blue: RGBA(13, 110, 253, 1);
  cursor: pointer;
  font-weight: bold;
  color: var(--blue);
  text-decoration: none;
  margin-left: 0.5em;
  padding: 0;
  white-space: nowrap;

  &:hover {
    color: var(--blue);
    text-decoration: none;
  }

  &:visited {
    color: var(--blue);
    text-decoration: none;
  }
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
    <ShowToggle onClick={() => State.update({ showAll: !state.showAll })}>
      {state.showAll ? "Show less" : "Read more"}
    </ShowToggle>
  </div>
);

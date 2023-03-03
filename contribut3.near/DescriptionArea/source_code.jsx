const description = props.description || "";
const lengthCutoff = 80;

State.init({
  showAll: description.length <= lengthCutoff,
});

const elipsiss = styled.b`
  display: ${({ hidden }) => (hidden ? "none" : "inline-block")};
  background-color: white;
  position: absolute;
  right: 0;
  top: 0;
`;

return (
  <div className="d-flex flex-row justify-content-start align-items-start">
    <div
      className={`position-relative text-truncate flex-grow-1 ${state.showAll ? "text-wrap" : ""
        }`}
    >
      <Markdown
        text={
          // state.showAll
          /* ? */ description
          // : description.substring(0, lengthCutoff) + "..."
        }
      />
      <elipsiss hidden={state.showAll}>...</elipsiss>
      // {state.showAll ? (
      //   <></>
      // ) : (
      //   <b
      //     className="d-inline-block position-absolute end-0 top-0 px-1"
      //     style={{ backgroundColor: "white" }}
      //   >
      //     ...
      //   </b>
      // )}
    </div>
    {
  state.showAll && description.length > lengthCutoff ? (
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
)
}
  </div >
);

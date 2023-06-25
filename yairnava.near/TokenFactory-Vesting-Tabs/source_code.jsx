const pills = [
  { id: "tokenfactory", title: "Token Factory" },
  { id: "mytokenlist", title: "All Tokens" },
  { id: "vesting", title: "Token Vesting" },
];

const x = () => {
  console.log("X");
};

return (
  <>
    <div style={{ display: "flex", "justify-content": "center" }}>
      <label style={{ "font-weight": "900", "font-size": "35px" }}>
        Token Factory + Vesting
      </label>
    </div>
    <br />
    <ul className="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
      {pills.map(({ id, title }, i) => (
        <li className="nav-item" role="presentation" key={i}>
          <button
            className={`nav-link ${i === 0 ? "active" : ""}`}
            id={`pills-${id}-tab`}
            data-bs-toggle="pill"
            data-bs-target={`#pills-${id}`}
            type="button"
            role="tab"
            aria-controls={`pills-${id}`}
            aria-selected={i === 0}
            onClick={() => {
              x();
              const key = `load${id}`;
              !state[key] && State.update({ [key]: true });
            }}
          >
            {title}
          </button>
        </li>
      ))}
    </ul>
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane fade show active"
        id="pills-tokenfactory"
        role="tabpanel"
        aria-labelledby="pills-tokenfactory-tab"
      >
        <Widget src="yairnava.near/widget/Token-Factory" />
      </div>
      <div
        className="tab-pane fade vesmytokenlistting"
        id="pills-mytokenlist"
        role="tabpanel"
        aria-labelledby="pills-mytokenlist-tab"
      >
        <Widget src="yairnava.near/widget/TokenFactoryList" />
      </div>
      <div
        className="tab-pane fade vesting"
        id="pills-vesting"
        role="tabpanel"
        aria-labelledby="pills-vesting-tab"
      >
        <Widget src="yairnava.near/widget/TokenVesting" />
      </div>
    </div>
  </>
);

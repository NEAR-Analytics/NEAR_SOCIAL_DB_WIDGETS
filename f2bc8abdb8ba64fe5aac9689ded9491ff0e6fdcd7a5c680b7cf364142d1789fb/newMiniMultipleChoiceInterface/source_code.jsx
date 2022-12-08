let endDate = props.endDate ?? Date.now() - 90000;

let options = props.options ?? [
  {
    text: "Option1",
    percentageOfVotes: "20%",
  },
  {
    text: "Option2",
    percentageOfVotes: "50%",
  },
];

let amountOfVotes = "30";

const renderOption = (option) => {
  return (
    <div>
      <h4>{option.text}</h4>
      <div className="d-flex">
        <div
          style={{ color: "#000", backgroundColor: "#f1f1f1", width: "90%" }}
        >
          {/* Set the width of the next div to make the bar grow. At the same, use the same value to fill the span tag */}
          <div
            style={{
              content: "",
              display: "table",
              clear: "both",
              padding: "0.01em 16px",
              display: "inline-block",
              width: option.percentageOfVotes,
              textAlign: "center",
              backgroundColor: "lightgray",
            }}
          >
            <span>{option.percentageOfVotes}</span>
          </div>
        </div>
        <span style={{ minWidth: "max-content" }}>
          Of {amountOfVotes} votes
        </span>
      </div>
    </div>
  );
};

return (
  <div className="d-flex flex-column">
    <div className="d-flex no-wrap">
      {/* The next widget need the info of the user making the question */}
      {/* you can use this "Social.getr(`${accountId}/profile`);" to get the users profile */}
      <Widget src="mob.near/widget/Profile" props={{ accountId, profile }} />

      <div className="d-flex">
        <span className="mx-2">End date: {endDate} </span>

        <span
          style={{ backgroundColor: endDate > Date.now() ? "blue" : "red" }}
        >
          {endDate > Date.now() ? "Active" : "Closed"}
        </span>
      </div>
    </div>

    <div>
      <h3>Title</h3>
      <p>Description</p>
    </div>

    <div className="m-2">
      {options.map((option) => {
        return renderOption(option);
      })}
    </div>
  </div>
);

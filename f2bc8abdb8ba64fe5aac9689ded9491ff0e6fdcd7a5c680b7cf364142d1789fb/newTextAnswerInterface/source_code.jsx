let endDate = props.endDate ?? 6516351861321;
let userMakingQuestion = props.userMakingQuestion ?? DaniNoMeMates;

let profile = Social.getr(`${accountId}/profile`);

return (
  <div className="d-flex flex-column">
    <div className="d-flex no-wrap">
      {/* The next widget need the info of the user making the question */}
      <Widget
        src="mob.near/widget/Profile"
        props={{ userMakingQuestion, profile }}
      />

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

    <p>
      Answer Answer Answer Answer Answer Answer Answer Answer Answer Answer
      Answer Answer Answer Answer Answer Answer Answer Answer Answer
    </p>
  </div>
);

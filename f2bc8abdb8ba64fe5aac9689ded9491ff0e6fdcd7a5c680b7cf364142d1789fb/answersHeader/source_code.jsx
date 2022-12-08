let startDate = props.startDate ?? Date.now() - Date.now() / 1000;
let endDate = props.endDate ?? Date.now() + Date.now() / 1000;
let userMakingQuestion = props.userMakingQuestion ?? DaniNoMeMates;

let profile = Social.getr(`${accountId}/profile`);

function dateToTimestamp(date) {
  //TODO
  return date;
}

return (
  <div className="d-flex no-wrap">
    <Widget
      src="mob.near/widget/Profile"
      props={{ userMakingQuestion, profile }}
    />

    <div className="d-flex">
      <span className="mx-2">End date: {endDate} </span>

      <span
        style={{
          backgroundColor:
            dateToTimestamp(startDate) < Date.now() &&
            dateToTimestamp(endDate) > Date.now()
              ? "blue"
              : "red",
        }}
      >
        {dateToTimestamp(startDate) < Date.now() &&
        dateToTimestamp(endDate) > Date.now()
          ? "Active"
          : "Closed"}
      </span>
    </div>
  </div>
);

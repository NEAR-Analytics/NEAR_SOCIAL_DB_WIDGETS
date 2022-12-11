let questionParams = props.value ?? {
  accountId: "mock.near",
  blockHeight: 80293871,
  value: {
    isDraft: false,
    title: "Mock title",
    description: "Mock Description",
    startTimestamp: 1670628600000,
    endTimestamp: 1671580800000,
    questionType: "0",
    question: "Mock question?",
    choicesOptions: [],
    timestamp: 1670628584974,
  },
};

let profile = Social.getr(`${accountId}/profile`);

return (
  <div className="my-2">
    <div className="d-flex no-wrap justify-content-between">
      <Widget
        src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile"
        props={{ userMakingQuestion: questionParams.accountId, profile }}
      />

      <div className="d-flex">
        <span className="mx-2" style={{ fontWeight: "500" }}>
          End date: {questionParams.endDate}
        </span>

        <span
          style={{
            backgroundColor:
              questionParams.startDate < Date.now() &&
              questionParams.endDate > Date.now()
                ? "rgb(153, 255, 153)"
                : "rgb(255, 128, 128)",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
          }}
        >
          {questionParams.startDate < Date.now() &&
          questionParams.endDate > Date.now()
            ? "Active"
            : "Closed"}
        </span>
      </div>
    </div>
    <h5 className="mt-3">{questionParams.title}</h5>
    <p>{questionParams.description}</p>
    <p>{questionParams.question}</p>
  </div>
);

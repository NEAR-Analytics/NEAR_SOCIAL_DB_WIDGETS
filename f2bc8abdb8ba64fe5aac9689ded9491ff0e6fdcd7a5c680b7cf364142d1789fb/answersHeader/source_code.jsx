let question = props.question ?? {
  title: "Multiple choice test",
  tgLink: "",
  accountId: "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  choicesOptions: ["a", "b", "c"],
  question: "Testing multiple choice",
  description: "This is a simple test",
  questionBlockHeight: 79932918,
  startDate: Date.now(),
  endDate: Date.now() + 10000000,
  storingTimestamp: Date.now(),
  questionType: "1",
  answers: [
    {
      accountId:
        "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      answer: "0",
      timeStamp: Date.now(),
    },
  ],
};

let profile = Social.getr(`${accountId}/profile`);

return (
  <div className="my-2 mx-3">
    <div className="d-flex no-wrap justify-content-between">
      <Widget
        src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/Profile"
        props={{ userMakingQuestion: question.accountId, profile }}
      />

      <div className="d-flex">
        <span className="mx-2" style={{ fontWeight: "500" }}>
          End date: {question.endDate}
        </span>

        <span
          style={{
            backgroundColor:
              question.startDate < Date.now() && question.endDate > Date.now()
                ? "rgb(153, 255, 153)"
                : "rgb(255, 128, 128)",

            height: "max-content",
            width: "6rem",
            border: "1px solid rgb(0, 82, 204)",
            textAlign: "center",
            borderRadius: "80px",
          }}
        >
          {question.startDate < Date.now() && question.endDate > Date.now()
            ? "Active"
            : "Closed"}
        </span>
      </div>
    </div>
    <h5 className="mt-3">{question.title}</h5>
    <p>{question.description}</p>
  </div>
);

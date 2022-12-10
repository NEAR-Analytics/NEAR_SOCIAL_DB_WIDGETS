const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

//You have to use social.index to get all the questions and then process it to get something like the next array of objects.
const mockQuestions = [
  {
    title: "Multiple choice test",
    tgLink: "",
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    choicesOptions: ["a", "b", "c"],
    question: "Testing multiple choice",
    description: "",
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
  },
  {
    title: "Text test",
    tgLink: "",
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    choicesOptions: [],
    question: "Testing text",
    description: "",
    questionBlockHeight: 79932900,
    startDate: Date.now(),
    endDate: Date.now() + 1000000000,
    storingTimestamp: Date.now(),
    questionType: "0",
    answers: [
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        answer: "This is a test answer",
        timeStamp: Date.now(),
      },
    ],
  },
];

const renderQuestions = () => {
  return mockQuestions.map((question) => {
    return (
      <div
        className="my-5 py-3 px-4"
        style={{ backgroundColor: "#f2f2f2", borderRadius: "1rem" }}
      >
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
          props={{ question: question }}
        />
        <Widget
          src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/${
            displayAnswerWidgetNames[question.questionType]
          }`}
          props={{ question: question }}
        />
      </div>
    );
  });
};

return (
  <div
    style={{
      borderRadius: "3px",
      padding: "8% 5% 1% 5%",
    }}
  >
    {renderQuestions()}
  </div>
);

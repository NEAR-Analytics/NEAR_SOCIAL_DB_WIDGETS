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

const renderAnswers = () => {
  mockQuestions.map((question) => {
    return (
      <>
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
          props={{ question }}
        />
        <Widget
          src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/${
            displayAnswerWidgetNames[question.typeOfAnswer]
          }`}
          props={question}
        />
      </>
    );
  });
};

return <>{renderAnswers()}</>;

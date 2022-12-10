const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

const questions = Social.index("poll_question", "question-v3.0.1");

//You have to use social.index to get all the questions and then process it to get something like the next array of objects.
const mockQuestions = [
  {
    accountId: "silkking.near",
    blockHeight: 80293871,
    value: {
      isDraft: false,
      title: "Test",
      description: "Description test",
      startTimestamp: 1670628600000,
      endTimestamp: 1671580800000,
      questionType: "0",
      question: "Why do you think this widget is cool?",
      choicesOptions: [],
      timestamp: 1670628584974,
    },
  },
];

// [
//   {
//     title: "Multiple choice test",
//     tgLink: "",
//     accountId:
//       "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//     choicesOptions: ["a", "b", "c"],
//     question: "Testing multiple choice",
//     description: "",
//     questionBlockHeight: 79932918,
//     startDate: Date.now(),
//     endDate: Date.now() + 10000000,
//     storingTimestamp: Date.now(),
//     questionType: "1",
//     answers: [
//       {
//         accountId:
//           "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//         answer: "0",
//         timeStamp: Date.now(),
//       },
//     ],
//   },
//   {
//     title: "Text test",
//     tgLink: "",
//     accountId:
//       "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//     choicesOptions: [],
//     question: "Testing text",
//     description: "",
//     questionBlockHeight: 79932900,
//     startDate: Date.now(),
//     endDate: Date.now() + 1000000000,
//     storingTimestamp: Date.now(),
//     questionType: "0",
//     answers: [
//       {
//         accountId:
//           "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//         answer: "This is a test answer",
//         timeStamp: Date.now(),
//       },
//     ],
//   },
// ];

const renderQuestions = () => {
  return questions.map((question) => {
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
          src={`${props.accountId}/widget/${
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

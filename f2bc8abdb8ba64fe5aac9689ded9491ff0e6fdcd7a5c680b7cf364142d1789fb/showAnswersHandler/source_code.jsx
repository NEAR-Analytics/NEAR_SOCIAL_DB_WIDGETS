const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newYesNoAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

//You have to use social.index to get all the questions and then process it to get something like the next array of objects.
const questions = [
  {
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    choicesOptions: ["a", "b", "c"],
    question: "Testing multiple choice",
    description: "",
    questionBlockHeight: 79932918,
    startDate: "2022/12/08",
    endDate: "2022/12/31",
    questionType: "2",
  },
  {
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    choicesOptions: undefined,
    question: "Testing text",
    description: "",
    questionBlockHeight: 79932900,
    startDate: "2022/12/08",
    endDate: "2022/12/31",
    questionType: "1",
  },
  {
    accountId:
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
    choicesOptions: undefined,
    question: "Testing vote yes/no",
    description: "",
    questionBlockHeight: 79932883,
    startDate: "2022/12/08",
    endDate: "2022/12/31",
    questionType: "0",
  },
];

const renderAnswers = () => {
  questions.map((question) => {
    let widget;
    let props;

    if (typeOfAnswer == "0") {
      widget = displayAnswerWidgetNames[0];
      props = {
        questionBlockHeight: question.questionBlockHeight,
        userMakingQuestion: question.accountId,
      };
    } else if (typeOfAnswer == "1") {
      widget = displayAnswerWidgetNames[1];
      props = {
        questionTimestamp: question.startDate,
        questionBlockHeight: question.questionBlockHeight,
      };
    } else if (typeOfAnswer == "2") {
      widget = displayAnswerWidgetNames[2];
      props = {
        questionBlockHeight: question.questionBlockHeight,
        choicesOptions: question.choicesOptions,
      };
    }

    return (
      <>
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
          props={{
            title: question.question,
            description: question.description,
            startDate: question.startDate,
            endDate: question.endDate,
            userMakingQuestion: question.accountId,
          }}
        />
        <Widget
          src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/${widget}`}
          props={props}
        />
      </>
    );
  });
};

return (
  <div className="d-flex flex-column">
    <div className="d-flex">
      {/* Filters */}
      <button type="button" class="btn btn-outline-primary">
        ALL STATUS
      </button>
      <button type="button" class="btn btn-outline-primary">
        ALL CATEGORY
      </button>
      <button type="button" class="btn btn-outline-primary">
        CREATED BY ME
      </button>
    </div>

    {renderAnswers()}
  </div>
);

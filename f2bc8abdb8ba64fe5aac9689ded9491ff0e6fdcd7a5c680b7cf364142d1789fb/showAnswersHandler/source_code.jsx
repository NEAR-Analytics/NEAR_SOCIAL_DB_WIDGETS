const displayAnswerWidgetNames = [
  "newTextAnswerInterface",
  "newYesNoAnswerInterface",
  "newMiniMultipleChoiceInterface",
];

const answers = [
  {
    questionBlockHeight: 81591891,
    typeOfAnswer: "0",
    answer: "",
  },
];

const renderAnswers = () => {
  answers.map((answer) => {
    <>
      <Widget
        src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
        props={
          {
            /* setProperties */
          }
        }
      />
      <Widget
        src={`f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/${
          typeOfAnswer == "0"
            ? displayAnswerWidgetNames[0]
            : typeOfAnswer == "1"
            ? displayAnswerWidgetNames[1]
            : typeOfAnswer == "2" && displayAnswerWidgetNames[2]
        }`}
        props={
          {
            /* setProperties */
          }
        }
      />
    </>;
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

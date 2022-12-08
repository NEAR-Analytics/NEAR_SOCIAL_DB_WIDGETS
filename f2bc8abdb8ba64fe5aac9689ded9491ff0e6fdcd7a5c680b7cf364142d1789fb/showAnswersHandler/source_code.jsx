const renderAnswers = () => {
  answers.map((answer) => {
    if (answer.typeOfanswer == "0") {
      <>
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/answersHeader"
          props={
            {
              /* setProperties */
            }
          }
        />
        ;
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/newTextAnswerInterface"
          props={
            {
              /* setProperties */
            }
          }
        />
        ;
      </>;
    } else if (answer.typeOfanswer == "1") {
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
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/newYesNoAnswerInterface"
          props={
            {
              /* setProperties */
            }
          }
        />
      </>;
    } else if (answer.typeOfanswer == "2") {
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
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/newMiniMultipleChoiceInterface"
          props={
            {
              /* setProperties */
            }
          }
        />
        ;
      </>;
    }
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

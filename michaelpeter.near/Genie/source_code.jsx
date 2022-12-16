State.init({ selectedQuestion: "", searchString: "" });

const setSearchString = (updatedSearchString) => {
  State.update({ searchString: updatedSearchString });
};

if (!selectedQuestion)
  return (
    <div className="d-flex flex-column gap-3">
      <Widget
        src="michaelpeter.near/widget/GenieSaveQuestion"
        props={{ searchString: state.searchString, setSearchString }}
      />
      <Widget
        src="michaelpeter.near/widget/GenieQuestionList"
        props={{ searchString: state.searchString }}
      />
    </div>
  );

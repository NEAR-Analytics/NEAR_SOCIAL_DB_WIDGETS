State.init({ selectedQuestion: "", searchString: "", showAskForm: false });

const setSearchString = (updatedSearchString) => {
  State.update({ searchString: updatedSearchString.toLowerCase() });
};

const clearSelected = () => {
  State.update({ selectedQuestion: "" });
};

const setSelectedQuestion = (ref) => {
  State.update({ selectedQuestion: ref });
};

const QuestionWrapper = styled.div`
  width: 60rem
`;
const Center = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
`;

if (state.selectedQuestion) {
  return (
    <div className="d-flex flex-column gap-1">
      <div>
        <button onClick={clearSelected}>Return</button>
      </div>
      <Center>
        <QuestionWrapper>
          <Widget
            src="michaelpeter.near/widget/GenieQuestionAnswerView"
            props={{ questionRef: state.selectedQuestion }}
          />
        </QuestionWrapper>
      </Center>
    </div>
  );
} else if (state.showAskForm) {
  return (
    <>
      <div className="d-flex flex-row justify-content-end">
        <button
          className="btn btn-light"
          onClick={() => {
            State.update({ showAskForm: false });
          }}
        >
          <i class="bi bi-x-lg" />
        </button>
      </div>
      <Widget
        src="michaelpeter.near/widget/GenieSaveQuestion"
        props={{ searchString: state.searchString, setSearchString }}
      />
    </>
  );
} else {
  return (
    <div className="d-flex flex-column gap-3 pt-1">
      <div className="d-flex align-items-center gap-3">
        <i class="bi bi-search" />
        <div class="input-group input-group-lg">
          <input
            type="text"
            placeholder="Your wish is my command"
            className="form-control input-group input-group-lg"
            value={props.searchString}
            onChange={(e) => {
              setSearchString?.(e.target.value);
            }}
          />
        </div>
        <button
          className="btn btn-primary text-nowrap"
          onClick={() => {
            State.update({ showAskForm: true });
          }}
        >
          <div>
            <i class="bi bi-chat" />
            Ask a question
          </div>
        </button>
      </div>
      <Center>
        <QuestionWrapper>
          <Widget
            src="michaelpeter.near/widget/GenieQuestionList"
            props={{ searchString: state.searchString, setSelectedQuestion }}
          />
        </QuestionWrapper>
      </Center>
    </div>
  );
}

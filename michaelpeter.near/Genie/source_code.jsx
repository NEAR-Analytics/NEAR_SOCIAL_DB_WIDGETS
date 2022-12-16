State.init({ selectedQuestion: "", searchString: "" });

const setSearchString = (updatedSearchString) => {
  State.update({ searchString: updatedSearchString });
};

const clearSelected = () => {
  State.update({ selectedQuestion: "" });
};

const setSelectedQuestion = (ref) => {
  State.update({ selectedQuestion: ref });
};

const QuestionWrapper = styled.div`
  width: 43rem
`;
const Center = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
`;

if (!state.selectedQuestion) {
  return (
    <div className="d-flex flex-column gap-3">
      <Widget
        src="michaelpeter.near/widget/GenieSaveQuestion"
        props={{ searchString: state.searchString, setSearchString }}
      />
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
} else {
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
}

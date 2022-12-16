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
  width: 100%
`;
const Center = styled.div`
  display: flex;
  flex-direction:row;
  justify-content:center;
`;
const Wrapper = styled.div`
  width: 50rem
  display:flex
  flex-direction:row
  justify-content:center
  `;

let CurrentContent;

if (state.selectedQuestion) {
  CurrentContent = (
    <Wrapper className="d-flex flex-column gap-5">
      <div>
        <button className="btn btn-outline-secondary" onClick={clearSelected}>
          <i class="bi bi-chevron-left" />
          All Questions
        </button>
      </div>
      <Center>
        <QuestionWrapper>
          <Widget
            src="michaelpeter.near/widget/GenieQuestionAnswerView"
            props={{ questionRef: state.selectedQuestion }}
          />
        </QuestionWrapper>
      </Center>
    </Wrapper>
  );
} else if (state.showAskForm) {
  CurrentContent = (
    <Wrapper>
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
    </Wrapper>
  );
} else {
  CurrentContent = (
    <Wrapper className="d-flex flex-column gap-3 pt-1">
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
      <QuestionWrapper>
        <Widget
          src="michaelpeter.near/widget/GenieQuestionList"
          props={{ searchString: state.searchString, setSelectedQuestion }}
        />
      </QuestionWrapper>
    </Wrapper>
  );
}

return (
  <div className="d-flex flex-column gap-1">
    <img
      src={`https://ipfs.near.social/ipfs/bafkreicysjx5rmiu2j7wm7obt74zlmkb6algnl5i3wrqp5ear3mvi5ddfi`}
      alt="Genie"
      style={{ width: "10rem" }}
    />
    {CurrentContent}
  </div>
);

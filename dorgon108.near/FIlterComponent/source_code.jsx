const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
`;

const SubRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 15px;
`;

const SubTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  gap: 6px;
  width: 212px;
  height: 32px;
  background: #f8f9fa;
  border-radius: 50px;
`;

const SortBy = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortOption = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #687076;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CheckboxContainer = styled.div`
  width: 15px;
  height: 15px;
  position: relative;
`;

const Checkbox = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.checked ? "black" : "red"} ${console.log(props.checked)};
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const Tag = styled.div`
  margin: 4px;
  padding: 4px 8px;
  background-color: #f1f1f1;
  border-radius: 4px;
`;

const tags = ["app", "component", "tool", "social"];

// Initialize the state
State.init({
  youFollow: false,
  youDontFollow: false,
  inputValue: "",
  filteredTags: tags,
});

const updateFilteredTags = (inputValue) => {
  State.update({
    filteredTags: tags.filter((tag) => tag.includes(inputValue)),
  });
};

return (
  <Container>
    <Row>
      <Title>Filters</Title>
    </Row>
    <Row>
      <SubRow>
        <div>Tags</div>
        <StyledInput>
          <input
            type="text"
            style={{ width: "100%", background: "transparent", border: "none" }}
            value={state.inputValue}
            onChange={(e) => {
              State.update({ inputValue: e.target.value });
              updateFilteredTags(e.target.value);
            }}
          />
        </StyledInput>
      </SubRow>
    </Row>
    <Row>
      <SubRow>
        {state.filteredTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </SubRow>
    </Row>
    <Row>
      <SubRow>
        <SubTitle>People</SubTitle>
        <CheckboxLabel>
          <CheckboxContainer>
            <Checkbox
              checked={youFollow}
              onClick={() => setYouFollow(!youFollow)}
            />
          </CheckboxContainer>
          You Follow
        </CheckboxLabel>
        <CheckboxLabel>
          <Widget
            src={"dorgon108.near/widget/FIlterPanel"}
            props={{ filter: { dorian: null, egg: null } }}
          />
          <CheckboxContainer>
            <Checkbox
              checked={youDontFollow}
              onClick={() => setYouDontFollow(!youDontFollow)}
            />
          </CheckboxContainer>
          You Don't Follow
        </CheckboxLabel>
      </SubRow>
    </Row>
    <Row>
      <SortBy>
        <div>Sort By:</div>
        <SortOption>Date Created</SortOption>
        <SortOption>Popularity</SortOption>
      </SortBy>
    </Row>
  </Container>
);

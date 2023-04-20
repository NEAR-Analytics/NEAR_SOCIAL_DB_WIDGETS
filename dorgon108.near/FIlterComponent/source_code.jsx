const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 15px;
  max-width: calc(90px * 3 + 4px * 2 * 3); // 90px is the width of a tag, 4px is the margin, and 2 is the left and right margin
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
`;

const SubRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 20px;
    flex-direction: column; // Change this to column

  max-width: calc(90px * 3 + 4px * 2 * 3); // 90px is the width of a tag, 4px is the margin, and 2 is the left and right margin
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
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #687076;
  cursor: pointer;
  padding: 8px 12px 8px 8px;
gap: 8px;
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
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  gap: 3px;
  width: auto; // Change width to auto
  max-width: 90px;
  height: 24px;
  background: #FFFFFF;
  border: 1px solid #E6E8EB;
  border-radius: 6px;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 4px;
`;

let tags = props.selectedTags ?? [];

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

// Add this function to update tags based on props.selectedTags
const updateTags = () => {
  tags = props.selectedTags ?? [];
  updateFilteredTags(state.inputValue);
};

// Call updateTags function to update tags
updateTags();
return (
  <Container>
    <Row>
      <Title>Filters</Title>
    </Row>

    <Row>
      <SubRow>
        <SubTitle>Tags</SubTitle>
        <StyledInput>
          <input
            placeholder="Search Tags"
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
      <TagsContainer>
        {" "}
        {state.filteredTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>
    </Row>
    <Row>
      <SubRow>
        <SubTitle>People</SubTitle>
        <Widget
          src={"dorgon108.near/widget/CheckBox"}
          props={{ filters: { "You Follow": null, "You Don't Follow": null } }}
        />
      </SubRow>
    </Row>
    <Row>
      <SubRow>
        <SortBy>
          <SubTitle>Sort By:</SubTitle>
          <SortOption>Date Created</SortOption>
          <SortOption>Popularity</SortOption>
        </SortBy>
      </SubRow>
    </Row>
  </Container>
);

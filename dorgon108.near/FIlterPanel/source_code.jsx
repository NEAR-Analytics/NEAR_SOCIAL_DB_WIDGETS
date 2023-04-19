const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const CheckboxLabel = styled.div`
  display: flex;
  align-items: center;
`;
const CheckboxInput = styled.div`
  display: inline-block;
  margin-right: 8px;
  & input[type="checkbox"] {
    background-color: #your_desired_color;
  }
  & input[type="checkbox"]:checked {
    background-color: black;
  }
`;

const SubCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

State.init({});

const handleChange = (primary, sub) => {
  if (sub) {
    State.update((prevState) => ({
      ...prevState,
      [primary]: { ...prevState[primary], [sub]: !prevState[primary]?.[sub] },
    }));
  } else {
    State.update((prevState) => ({
      ...prevState,
      [primary]: prevState[primary]
        ? { ...prevState[primary], [primary]: !prevState[primary][primary] }
        : { [primary]: true },
    }));
  }
};

console.log(state);

// ... JSX structure goes here ...

return (
  <Container>
    <CheckboxGroup>
      <CheckboxLabel checked={state.primary1?.primary1 || false}>
        <CheckboxInput>
          <input
            type="checkbox"
            checked={state.primary1?.primary1 || false}
            onChange={() => handleChange("primary1")}
          />
        </CheckboxInput>
        Primary 1
      </CheckboxLabel>
      <SubCheckboxGroup>
        <CheckboxLabel checked={state.primary1?.sub1 || false}>
          <CheckboxInput>
            <input
              type="checkbox"
              checked={state.primary1?.sub1 || false}
              onChange={() => handleChange("primary1", "sub1")}
            />
          </CheckboxInput>
          Sub 1
        </CheckboxLabel>
        <CheckboxLabel checked={state.primary1?.sub2 || false}>
          <CheckboxInput>
            <input
              type="checkbox"
              checked={state.primary1?.sub2 || false}
              onChange={() => handleChange("primary1", "sub2")}
            />
          </CheckboxInput>
          Sub 2
        </CheckboxLabel>
      </SubCheckboxGroup>
    </CheckboxGroup>

    <CheckboxGroup>
      <CheckboxLabel checked={state.primary2?.primary2 || false}>
        <CheckboxInput>
          <input
            type="checkbox"
            checked={state.primary2?.primary2 || false}
            onChange={() => handleChange("primary2")}
          />
        </CheckboxInput>
        Primary 2
      </CheckboxLabel>
    </CheckboxGroup>
  </Container>
);

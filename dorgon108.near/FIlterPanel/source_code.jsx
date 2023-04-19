let filters = props.filters;

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
    {Object.entries(filters).map(([primary, subFilters]) => (
      <CheckboxGroup key={primary}>
        <CheckboxLabel checked={state[primary]?.[primary] || false}>
          <CheckboxInput>
            <input
              type="checkbox"
              checked={state[primary]?.[primary] || false}
              onChange={() => handleChange(primary)}
            />
          </CheckboxInput>
          {primary}
        </CheckboxLabel>
        {subFilters && (
          <SubCheckboxGroup>
            {Object.entries(subFilters).map(([sub, _]) => (
              <CheckboxLabel key={sub} checked={state[primary]?.[sub] || false}>
                <CheckboxInput>
                  <input
                    type="checkbox"
                    checked={state[primary]?.[sub] || false}
                    onChange={() => handleChange(primary, sub)}
                  />
                </CheckboxInput>
                {sub}
              </CheckboxLabel>
            ))}
          </SubCheckboxGroup>
        )}
      </CheckboxGroup>
    ))}
  </Container>
);

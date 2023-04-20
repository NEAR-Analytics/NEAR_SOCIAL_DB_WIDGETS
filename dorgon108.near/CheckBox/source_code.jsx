let filters = props.filters ?? {};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;

`;
const CustomCheckbox = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 1px solid black;
  margin-right: 8px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 5px;
    top: 2px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  color:#878A8E;
  gap: 16px;

  
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
    width: 40px;
height: 40px;

  }
  & input[type="checkbox"]:checked {
    background-color: black;
  }
`;

const SubCheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  gap: 16px;

`;

State.init({});

const handleChange = (primary, sub) => {
  if (sub) {
    const isChecked = !state[primary]?.[sub];
    props.onCheckboxChange(`${primary}_${sub}`, isChecked);

    State.update((prevState) => ({
      ...prevState,
      [primary]: { ...prevState[primary], [sub]: isChecked },
    }));
  } else {
    const isChecked = !state[primary]?.[primary];
    props.onCheckboxChange(primary, isChecked);

    State.update((prevState) => ({
      ...prevState,
      [primary]: prevState[primary]
        ? { ...prevState[primary], [primary]: isChecked }
        : { [primary]: true },
    }));
  }
};

console.log("the primary is", state[primary]);

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

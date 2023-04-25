const { checkboxes, title } = props;

const Input = styled.input``;
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

return (
  <Fieldset>
    <p>{title}</p>
    {checkboxes.map((c) => {
      return (
        <label>
          <Input type="checkbox" value={c.value} /> {c.label}
        </label>
      );
    })}
  </Fieldset>
);

const { checkboxes, title, updateChecked } = props;

State.init({
  checkboxes,
  title,
});

const Input = styled.input``;
const Fieldset = styled.fieldset`
    display: flex;
    flex-direction: column;
`;

const handleChange = (e) => {
  updateChecked([
    ...state.checkboxes.map((c) => {
      if (c.value === e.target.value) {
        c.selected = e.target.checked;
      }
      return c;
    }),
  ]);
};

return (
  <Fieldset>
    <p>{title}</p>
    {state.checkboxes.map((c) => {
      console.log(c.value, c.selected);
      return (
        <label>
          <input
            className=""
            type="checkbox"
            value={c.value}
            onChange={handleChange}
          />
          {c.label}
        </label>
      );
    })}
  </Fieldset>
);

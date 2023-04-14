const ownerId = "contribut3.near";
const id = props.id ?? "select";
const label = props.label ?? "Input";
const value = props.value ?? "";
const options = ["sedam", "osam"];
const onSave = props.onSave ?? (() => { });

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
`;

const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const SaveButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.5em 1em;
  background: #00ec97;
  border-radius: 50px;
  border: none;
  font-style: normal;
  font-weight: 600;
  font-size: 0.95em;
  line-height: 1em;
  text-align: center;
  color: #11181c;
`;

console.log(value)

const edit = (/* update, v */) => (
  <LabelArea>
    <Select.Root value={value} onValueChange={(s) => { console.log(s) }}>
      <Select.Trigger>
        <Select.Value />
        <Select.Icon>
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="white"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Select.Icon>
      </Select.Trigger>

      <Select.Content>
        <Select.Viewport>
          {options.map((option) =>
            <Select.Item key={option} value={option}>
              <Select.ItemText>{option}</Select.ItemText>
              <Select.ItemIndicator>
                -
              </Select.ItemIndicator>
            </Select.Item>
          )}
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
    <SaveButton onClick={() => onSave(v)}>Save</SaveButton>
  </LabelArea>
);

return edit(/* (s) => { console.log(s) }, value */);
//
// return (
//   <Widget
//     src={`${ownerId}/widget/Inputs.Viewable`}
//     props={{
//       id,
//       label,
//       value,
//       edit: (update, v) => edit(update, v),
//       view: isLink ? <a href={link}>{value}</a> : value,
//     }}
//   />
// );

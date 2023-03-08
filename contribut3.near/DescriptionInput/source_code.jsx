const description = props.description ?? "";
const update = props.update;
const text = props.text ?? "Description:";

if (!update) {
  return "Cannot render description input widget without update function!";
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="description">{text}</Label>
    <textarea
      id="description"
      value={description}
      type="text"
      rows={6}
      className="form-control"
      onChange={(event) => update(event.target.value)}
    />
  </>
);

const contributionType = props.contributionType ?? [];
const text = props.text ?? "Type of contribution:";
const multiple = props.multiple ?? false;
const update = props.update;
const allContributionTypes = props.allContributionTypes ?? [];

if (!update) {
  return "Cannot render contribution type input without update function!";
}

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9em;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="contribution-type">{text}</Label>
    <Typeahead
      id="contribution-type"
      labelKey="name"
      onChange={update}
      options={allContributionTypes}
      placeholder="Development, Investment, Legal..."
      selected={contributionType}
      positionFixed
      multiple={multiple}
      allowNew
    />
  </>
);

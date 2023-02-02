const contributionType = props.contributionType ?? [];
const text = props.text ?? "Type of contribution:";
const multiple = props.multiple ?? false;
const update = props.update;
const allContributionTypes = (
  Near.view(ownerId, "get_contribution_types", {}, "final", true) ?? []
).map((name) => ({ name }));

if (!update) {
  return "Cannot render contribution type input without update function!";
}

return (
  <>
    <label htmlFor="contribution-type">{text}</label>
    <Typeahead
      id="contribution-type"
      labelKey="name"
      onChange={(contributionTypes) => update(contributionTypes)}
      options={allContributionTypes}
      placeholder="Development, Investment, Legal..."
      selected={kind}
      positionFixed
      multiple={multiple}
      allowNew
    />
  </>
);

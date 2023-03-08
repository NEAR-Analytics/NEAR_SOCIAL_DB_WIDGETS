const ownerId = "contribut3.near";
const update = props.update;
const accountId = props.accountId;
const selected = props.selected;
const label = props.label || "Invite to:";

State.init({
  options: [],
  fetched: false,
});

if (!state.fetched) {
  Near.asyncView(ownerId, "get_admin_entities", {}, "final", false).then(
    (entities) =>
      State.update({
        fetched: true,
        options: entities.map((name) => ({ name })),
      })
  );
}

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <>
    <Label htmlFor="entity-id-input">{label}</Label>
    <Typeahead
      id="entity-id-input"
      labelKey="name"
      onChange={update}
      options={options}
      placeholder="contribut3.near, social.near..."
      selected={selected}
      positionFixed
    />
  </>
);

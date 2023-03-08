const ownerId = "contribut3.near";
const update = props.update;
const accountId = props.accountId;
const selected = props.selected;
const label = props.label || "Invite to:";

const options = (
  Near.view(
    ownerId,
    "get_admin_entities",
    { account_id: accountId },
    "final",
    false
  ) ?? []
).map((name) => ({ name }));

const Label = styled.label`
  font-weight: 600;
  color: #344054;
`;

return (
  <div className="col-lg-12 mb-2">
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
  </div>
);

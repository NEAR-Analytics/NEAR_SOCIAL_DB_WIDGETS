const ownerId = "contribut3.near";
const allAccountIds = props.allAccountIds;
const accountId = props.accountId;
const fixed = props.fixed;
const update = props.update;

const formatDate = (timestampString) => {
  const date = new Date(Number(timestampString));
  return `${date.getFullYear()}-${date.getMonth().toPrecision(2)}-${date
    .getDate()
    .toPrecision(2)}`;
};

return (
  <div className="col-lg-12 mb-2">
    Account ID of entity:
    <Typeahead
      id="account-id-input"
      labelKey="name"
      onChange={(accountId) => {
        const args = { account_id: accountId[0].name };
        Near.asyncView(ownerId, "get_entity", args, "final").then(
          (existing) => {
            const updatedState = {
              accountId,
            };
            console.log(existing);

            if (existing) {
              updatedState.existing = existing;
              updatedState.kind = [{ name: existing.kind }];
              updatedState.entityStatus = [{ name: existing.status }];
              updatedState.startDate = formatDate(existing.start_date);

              if (existing.end_date) {
                updatedState.endDate = formatDate(existing.endDate);
              }
            }

            update(updatedState);
          }
        );
      }}
      options={allAccountIds}
      placeholder="contribut3.near, social.near..."
      selected={state.accountId}
      positionFixed
      allowNew
      disabled={state.fixed}
    />
  </div>
);

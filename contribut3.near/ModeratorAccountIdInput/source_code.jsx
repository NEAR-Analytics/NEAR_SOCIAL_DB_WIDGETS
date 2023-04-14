const allAccountIds = props.allAccountIds;
const accountId = props.accountId;
const fixed = props.fixed;
const update = props.update;

const getEntity = (account_id) =>
  Near.view(ownerId, "get_entity", { account_id }, "final");

return (
  <div className="col-lg-12 mb-2">
    Account ID of entity:
    <Typeahead
      id="account-id-input"
      labelKey="name"
      onChange={(accountId) => {
        console.log(accountId[0].name);
        const existing = getEntity(accountId[0].name);
        const updatedState = {
          accountId,
        };
        console.log(existing);

        if (existing) {
          updatedState.existing = existing;
          updatedState.kind = [{ name: entity.kind }];
          updatedState.entityStatus = [{ name: entity.status }];
          updatedState.startDate = new Date(
            Number(entity.start_date)
          ).toLocaleDateString();

          if (existing.end_date) {
            updatedState.endDate = new Date(
              Number(entity.end_date)
            ).toLocaleDateString();
          }
        }

        update(updatedState);
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

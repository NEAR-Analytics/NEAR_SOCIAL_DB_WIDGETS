const ownerId = "contribut3.near";
const allAccountIds = props.allAccountIds;
const accountId = props.accountId;
const fixed = props.fixed;
const update = props.update;

return (
  <div className="col-lg-12 mb-2">
    Account ID of entity:
    <Typeahead
      id="account-id-input"
      labelKey="name"
      onChange={(accountId) => {
        const args = { account_id: accountId[0].name };
        const existing = args.account_id
          ? Near.asyncView(ownerId, "get_entity", args, "final")
          : null;
        console.log(existing);
        const updatedState = {
          accountId,
        };

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

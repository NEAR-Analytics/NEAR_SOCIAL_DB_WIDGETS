const accountId = props?.accountId || "near";

State.init({ isAvailable: false, isLoading: true });

function checkAccountAvailability() {
  asyncFetch("https://rpc.mainnet.near.org/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_account",
        finality: "final",
        account_id: accountId,
      },
    }),
  }).then((res) => {
    if (res.body.error) {
      State.update({ isAvailable: true, isLoading: false });
    } else {
      State.update({ isAvailable: false, isLoading: false });
    }
  });
}

const AccountContainer = () => {
  return (
    <div class="d-flex flex-row gap-2">
      <div>{accountId}</div>
      <div>
        {state.isLoading ? (
          <div>Loading...</div>
        ) : state.isAvailable ? (
          <div class="text-success">Available</div>
        ) : (
          <div class="text-danger">Not Available</div>
        )}
      </div>
    </div>
  );
};

checkAccountAvailability();

return <AccountContainer />;

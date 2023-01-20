const MIN_DEPOSIT = "3000000000000000000000";
let contractId = "near-indexer.near";
let indexer_name = props.indexer_name;
let indexer_code = props.indexer_code;

let UpdateIndexerCode = () => {
  const gas = 200000000000000;
  const deposit = new Big(MIN_DEPOSIT).toFixed(0);

  Near.call(
    contractId,
    "register_indexer_function",
    {
      name: indexer_name,
      code: indexer_code,
    },
    gas
  );
};

return (
  <button
    disabled={!indexer_code || !indexer_name || !context.accountId}
    onClick={UpdateIndexerCode}
  >
    Save Indexer Code
  </button>
);

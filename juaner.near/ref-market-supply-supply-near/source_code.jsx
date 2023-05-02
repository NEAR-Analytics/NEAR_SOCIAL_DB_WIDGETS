const accountId = context.accountId;
const BURROW_CONTRACT = "contract.main.burrow.near";
if (!accountId) {
  return <Widget src="juaner.near/widget/ref_account-signin" />;
}
const storageBurrow = Near.view(BURROW_CONTRACT, "storage_balance_of", {
  account_id: accountId,
});
const expandToken = (value, decimals) => {
  return new Big(value).mul(new Big(10).pow(decimals));
};
const handleDepositNear = (amount, cfButtonStatus) => {
  const amountDecimal = expandToken(amount, 24).toFixed();
  const transactions = [
    [
      {
        contractName: "wrap.near",
        methodName: "near_deposit",
        deposit: amountDecimal,
        gas: expandToken(300, 12),
      },
      {
        contractName: "wrap.near",
        methodName: "ft_transfer_call",
        deposit: new Big("1").toFixed(),
        gas: expandToken(300, 12),
        args: {
          receiver_id: BURROW_CONTRACT,
          amount: amountDecimal,
          msg: cfButtonStatus
            ? `{"Execute":{"actions":[{"IncreaseCollateral":{"token_id":"wrap.near","max_amount":"${amountDecimal}"}}]}}`
            : "",
        },
      },
    ],
  ];
  if (storageBurrow?.available === "0" || !storageBurrow?.available) {
    transactions.unshift({
      contractName: BURROW_CONTRACT,
      methodName: "storage_deposit",
      deposit: expandToken(0.25, 24).toFixed(),
      gas: expandToken(140, 12),
    });
  }
  Near.call(transactions);
};
if (typeof props.onLoad === "function") {
  props.onLoad({
    handleDepositNear,
  });
}
return <div></div>;

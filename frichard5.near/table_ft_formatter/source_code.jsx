const ftList = props.ftList || [];

const numberWithCommas = (x) => {
  return JSON.stringify(x).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const defaultFt = { icon: "", symbol: "" };
const findFt = (ftAddress) => {
  if (!ftList.length) return defaultFt;
  const ft = ftList.body.find((f) => ftAddress === f.token_account_id);
  return ft ? ft : defaultFt;
};

return <div>Hello World</div>;

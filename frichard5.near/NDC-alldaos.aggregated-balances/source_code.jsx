const {widgetProvider} = props;
const widgetUrl = `https://api.pikespeak.ai/widgets/balances/`;

const daosList = [
    "ndctrust.sputnik-dao.near",
    "marketing.sputnik-dao.near",
    "creativesdao.sputnik-dao.near",
    "neardevgov.sputnik-dao.near",
    "gwg.sputnik-dao.near",
];
const forgeUrl = (apiUrl, params) =>
    apiUrl +
    Object.keys(params).sort().reduce(
        (paramString, p) => paramString + `${p}=${params[p]}&`,
        "?"
    );
const fetchBalances = (params) => {
    const balances = fetch(forgeUrl(widgetUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    })

    balances.body && State.update({
        balances: balances.body,
    });
};
const uh = forgeUrl(widgetUrl, {accounts: daosList});
console.log(uh);
fetchBalances({accounts: daosList});
const GenericTable = (
    <Widget
        src={`${widgetProvider}/widget/generic_table`}
        props={{
            title: ``,
            columns,
            data: state.balance,
        }}
    />
);

const Card = styled.div`
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;`

return (<Card>
    <h2>Balances</h2>
    <BalanceContainer>
        <iframe
            style={{
                width: "35%",
                height: "420px",
                marginTop: "0px",
                overflow: "none",
            }}
            src={forgeUrl(widgetUrl, params)}
        ></iframe>
{/*
        <div style={{ width: "40%" }}>{GenericTable}</div>
*/}
    </BalanceContainer>
</Card>)
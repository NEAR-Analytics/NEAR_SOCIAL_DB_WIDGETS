const {widgetProvider, ftList} = props;
const account = props.account || "foundation.near";
const widgetUrl = `https://api.pikespeak.ai/widgets/balances/`;
const balanceUrl = `https://api.pikespeak.ai/account/balances/`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const daosList = [
    "ndctrust.sputnik-dao.near",
    "marketing.sputnik-dao.near",
    "creativesdao.sputnik-dao.near",
    "neardevgov.sputnik-dao.near",
    "gwg.sputnik-dao.near",
];
const ftFormatter = (ftList) => {
    return (data) => {
        return (
            <Widget
                src={`${widgetProvider}/widget/table_ft_formatter`}
                props={{
                    ftList,
                    ft: data["contract"],
                    amount: data["amount"],
                    isParsed: true,
                }}
            />
        );
    };
};

const columns = [
    {
        id: "amount",
        label: "",
        formatter: ftFormatter(ftList),
    },
];
const forgeUrl = (apiUrl, params) =>
    apiUrl +
    Object.keys(params).sort().reduce(
        (paramString, p) => paramString + `${p}=${params[p]}&`,
        "?"
    );
const fetchBalances = (params) => {
    const balances = fetch(forgeUrl(balanceUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    })

    balances.body && State.update({
        balances: balances.body,
    });
};

fetchBalances({accounts: daosList});
const GenericTable = (
    <Widget
        src={`${widgetProvider}/widget/generic_table`}
        props={{
            title:  state.balances&&`Total: $ ${Number(state.balances.totalUsd).toLocaleString('en-US', {maximumFractionDigits:2})}`,
            columns,
            data:  state.balances&&state.balances.balancesTotal,
        }}
    />
);

const Card = styled.div`
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  margin-top: 40px;`

const BalanceContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const iframeSrc = forgeUrl(widgetUrl, {accounts: daosList});

return (<Card>
    <h2>Balances</h2>
    {state.balances&&<BalanceContainer>
        <iframe
            style={{
                width: "35%",
                height: "420px",
                marginTop: "0px",
                overflow: "none",
            }}
            src={iframeSrc}
        ></iframe>
        <div style={{ width: "40%" }}>{GenericTable}</div>
    </BalanceContainer>}
</Card>)
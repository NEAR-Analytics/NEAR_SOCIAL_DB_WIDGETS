const { widgetProvider } = props;

const Balances = (
    <Widget
        src={`${widgetProvider}/widget/aggregated-balances`}
        props={{
            title: ``,
            columns,
            data: state.balance,
        }}
    />
);
return <>{Balances}</>
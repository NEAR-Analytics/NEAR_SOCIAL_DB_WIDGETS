const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return <Widget src="y3k.near/widget/IndexFeed" props={{ filter, ...props }} />;

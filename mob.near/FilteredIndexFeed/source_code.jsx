const filter = context.accountId && {
  ignore: Social.getr(`${context.accountId}/graph/hide`),
};

return <Widget src="mob.near/widget/IndexFeed" props={{ filter, ...props }} />;

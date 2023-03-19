// Widget based on mob.near/widget/FilteredIndexFeed

const filter = {
  ignore: context.accountId && Social.getr(`${context.accountId}/graph/hide`),
  matchesType: props.type,
};

return (
  <Widget
    src="evrything.near/widget/IndexMasonry"
    props={{ filter, ...props }}
  />
);

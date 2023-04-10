const hashtag = props.hashtag;

return (
  <>
    {context.accountId && (
      <div className="mb-3">
        <Widget src="mob.near/widget/MainPage.Compose" props={{ hashtag }} />
      </div>
    )}
    <Widget src="hack.near/widget/Hashtag.Feed" props={{ hashtag }} />
  </>
);

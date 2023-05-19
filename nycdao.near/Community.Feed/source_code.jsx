const daoId = props.daoId ?? context.accountId;

const tag = props.hashtag ?? Social.get(`${daoId}/settings/dao/main/tag`);

return <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag: tag }} />;

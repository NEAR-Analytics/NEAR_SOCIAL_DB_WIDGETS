const daoId = props.daoId ?? context.accountId;

const tag = Social.get(`${daoId}/settings/dao/main/tag`);

return <Widget src="mob.near/widget/Hashtag.Feed" props={{ hashtag: tag }} />;

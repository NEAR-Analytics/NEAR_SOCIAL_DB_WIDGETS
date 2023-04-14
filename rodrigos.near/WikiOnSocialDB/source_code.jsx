const addressForArticles = "wikiTest";
const writersWhiteList = ["testwiki.near", "eugenewolf507.near"];
const authorForWidget = "testwiki.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{
        currentNavPill: "articles",
        writersWhiteList,
        addressForArticles,
        authorForWidget,
      }}
    />
    <div>
      <Widget
        src={`${authorForWidget}/widget/WikiOnSocialDB_AllArticlesList`}
        props={{ writersWhiteList }}
      />
    </div>
  </>
);

const addressForArticles = "wikiTest";
const authorForWidget = "eugenewolf507.near";
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
      props={{ currentNavPill: "articles" }}
    />
    <div>
      <Widget
        src={`${authorForWidget}/widget/WikiOnSocialDB_AllArticlesList`}
        props={{
          filteredArticles,
          getDateLastEdit,
        }}
      />
    </div>
  </>
);

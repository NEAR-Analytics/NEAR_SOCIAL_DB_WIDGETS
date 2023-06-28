const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const profile = props.profile || Social.get(`${daoId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const pageUrl = `#/hack.near/widget/DAO.Page?daoId=${daoId}`;
const profileUrl = `#/hack.near/widget/DAO.Profile?daoId=${daoId}`;
const editorUrl = `#/hack.near/widget/DAO.Profile.Editor?daoId=${daoId}`;

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`;

const Avatar = styled.a`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  overflow: hidden;
  border-radius: 56px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus {
    border-color: #d0d5dd;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  padding-top: 4px;
`;

return (
  <Card>
    <CardLeft>
      <Avatar href={profileUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: profile.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      </Avatar>

      <div>
        <TextLink href={pageUrl} ellipsis bold>
          {profile.name || daoId.split(".sputnik-dao.near")[0]}
        </TextLink>
        <TextLink href={profileUrl} ellipsis>
          @{daoId}
        </TextLink>

        {tags.length > 0 && (
          <TagsWrapper>
            <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
          </TagsWrapper>
        )}
      </div>
    </CardLeft>

    {!!context.accountId && context.accountId !== daoId && (
      <Widget src="mob.near/widget/FollowButton" props={{ accountId: daoId }} />
    )}

    <Widget src="hack.near/widget/dao.connect" props={{ accountId, daoId }} />
  </Card>
);

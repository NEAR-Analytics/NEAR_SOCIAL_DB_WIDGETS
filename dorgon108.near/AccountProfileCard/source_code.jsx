// const accountId = props.accountId;
const accountId = props.accountId;

const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
// const tags = Object.keys(profile.tags || {});
const tags = Object.keys(profile.tags || { users: "dog", animals: "zoo" });

const profileUrl = `/#/calebjacob.near/widget/ProfilePage?accountId=${accountId}`;
const onPointerUp =
  props.onClick ??
  ((event) => {
    if (props.debug) {
      console.log("click", event);
    }
  });

State.init({
  show: false,
});

const Card = styled.div`

display: flex;
flex-direction: row;
justify-content: space-between;
align-items: flex-start;
padding: 0px;
gap: 10px;

width: 445.85px;
height: 24.1px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    min-width: 0;
    
  }
`;

const Avatar = styled.a`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  overflow: hidden;
  border-radius: 56px;
  transition: border-color 200ms;


  img {
    object-fit: cover;
 width: 24px;
height: 24px;
    border-radius: 50%;
  }

  &:hover,
  &:focus {
    border-color: #D0D5DD;
  }
`;

const TextLink = styled.a`

width: 107px;
height: 22px;
  display: block;
  margin: 0;
  margin-right:42.22;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#FFFFFF !important" : "#606D7A !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  font-style:normal;
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  align-items: center;
`;

const Col = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const col1 = {
  width: "66.32px",
};

const col2 = {
  width: "107px",
  marginRight: 42.22,
};

const col3 = {
  width: "172px",
};

const col4 = {
  textAlign: "right",
  padding: 0,
  justifyContent: "center",
};

const TagsWrapper = styled.div`
  padding-top: 4px;
  
`;

return (
  <Card>
    <CardLeft>
      <Row>
        <Col style={col1}>
          <Avatar href={profileUrl} onPointerUp={onPointerUp}>
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
        </Col>

        <Col style={col2}>
          <TextLink href={profileUrl} onPointerUp={onPointerUp} ellipsis bold>
            {profile.name || accountId.split(".near")[0]}
          </TextLink>
        </Col>
        <Col style={col3}>
          <TextLink href={profileUrl} onPointerUp={onPointerUp} ellipsis>
            @{accountId}
          </TextLink>
        </Col>

        <Col style={col4}>
          {!!context.accountId && context.accountId !== props.accountId && (
            <button
              style={{
                backgroundColor: "rgba(255, 193, 7, 0)",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <img
                src="https://i.imgur.com/hOp3Ivj.png"
                alt="Follow icon"
                style={{ height: "20px", marginRight: "5px" }}
              />
            </button>
          )}
        </Col>
      </Row>
    </CardLeft>
  </Card>
);

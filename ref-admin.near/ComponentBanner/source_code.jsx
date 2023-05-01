if (!props.src) return "";

const { commitLoading, noSet } = state;
State.init({
  commitLoading: false,
});
const finalSrc = props.src;
const [accountId, widget, widgetName] = finalSrc.split("/");
const data = Social.get(`${accountId}/widget/${widgetName}/metadata/**`);
const metadata = data || {};
const tags = Object.keys(metadata.tags || {});
const appUrl = `/#/${finalSrc}`;
const detailsUrl = `/#/ref-admin.near/widget/ComponentDetailsPage?src=${finalSrc}`;
const shareUrl = `https://alpha.near.org${detailsUrl}`;
const size = props.size || "large";
const Thumbnail = styled.div`
  width: ${(p) => sizes[p.size].thumbnail};
  height: ${(p) => sizes[p.size].thumbnail};
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 770px) {
    width: 58px;
    height: 58px;
  }
`;
const Title = styled.h1`
  font-size: ${(p) => sizes[p.size].title};
  color: #fff;
  margin: 0 0 8px;
  font-weight: 500;

  @media (max-width: 770px) {
    font-size: 16px;
    margin: 0;
  }
`;
const sizes = {
  medium: {
    gap: "16px",
    thumbnail: "56px",
    title: "16px",
  },
  large: {
    gap: "16px",
    thumbnail: "100px",
    title: "26px",
  },
};
const Wrapper = styled.div`
   display:none;
   justify-content:space-between;
   align-items:flex-end;
   background-repeat:no-repeat;
   background-size: cover;
   background-image:url("https://ipfs.near.social/ipfs/bafybeiduczlwb5wvqng2jjyifcyuyj4hs3mpfdgoex6xkswbqyviywkaje");
   border-radius:10px;
   padding: 20px 10px 20px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${(p) => sizes[p.size].gap};
  > * {
    min-width: 0;
  }

  @media (max-width: 770px) {
    gap: 16px;
  }
`;
const Text = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  font-weight: 500;
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};

  i {
    margin-right: 4px;
  }
`;
function getIsItSet(status) {
  State.update({
    noSet: status,
  });
}
console.log("1111111111111280-noSet", noSet);
return (
  <Wrapper style={{ display: noSet ? "flex" : "none" }}>
    <Header size={size}>
      <Thumbnail size={size}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: metadata.image,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
            alt: metadata.name,
          }}
        />
      </Thumbnail>

      <div>
        <Title size={size}>{metadata.name || widgetName}</Title>
        <Text ellipsis>{finalSrc}</Text>
      </div>
    </Header>
    <Widget
      src="ref-admin.near/widget/apply-as-home-button"
      props={{ src: props.src, updateStatus: getIsItSet }}
    ></Widget>
  </Wrapper>
);

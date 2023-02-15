const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const Wrapper = styled.div``;

const Main = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 352px  minmax(0, 1fr);
`;

const BackgroundImage = styled.div`
  height: 240px;
  width: 100%;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Sidebar = styled.div`
  display: grid;
  gap: 40px;
  position: relative;
  z-index: 5;
  margin-top: -55px;
`;

const Avatar = styled.div`
  width: 133px;
  height: 133px;
  flex-shrink: 0;
  border: 3px solid #fff;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0px 12px 16px rgba(16, 24, 40, 0.08), 0px 4px 6px rgba(16, 24, 40, 0.03);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h2`
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  color: #11181C;
  margin: 0;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 24px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  height: 32px;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #FBFCFD;
  border: 1px solid #D7DBDF;
  width: ${(p) => (p.primary ? "100%" : "auto")};

  &:hover,
  &:focus {
    background: ${(p) => (p.primary ? "#0484e5" : "#ECEDEE")};
    text-decoration: none;
    outline: none;
  }

  i {
    color: #7E868C;
  }
`;

console.log(profile);

if (profile === null) {
  return "Loading";
}

return (
  <Wrapper>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
    </BackgroundImage>

    <Main>
      <Sidebar>
        <Avatar>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.image,
              alt: profile.name,
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </Avatar>

        <div>
          <Title>{profile.name || accountId}</Title>
          <Text>@{accountId}</Text>

          <Actions>
            <Button type="button" primary>
              Follow
            </Button>
            <Button type="button">
              <i className="bi bi-hand-index-thumb"></i> Poke
            </Button>
            <Button type="button">
              <i className="bi bi-link-45deg"></i> Share
            </Button>
          </Actions>
        </div>
      </Sidebar>
    </Main>
  </Wrapper>
);

// return (
//   <div className="py-1 px-1">
//     <h1>Testing</h1>
//     <div className="mx-auto">
//       <Widget
//         src="mob.near/widget/ProfileLarge"
//         props={{
//           accountId,
//           profile,
//           link: true,
//           showEditButton: !props.profile,
//         }}
//       />

//       <div className="mt-3">
//         <Widget
//           src="mob.near/widget/ProfileTabs"
//           props={{ accountId, profile }}
//         />
//       </div>
//     </div>
//   </div>
// );

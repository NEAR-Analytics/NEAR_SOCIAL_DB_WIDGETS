const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);

const role = props.role;
const tags = Object.keys(metadata.tags || {});
const detailsUrl = `#/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `#/${accountId}/widget/${widgetName}`;
const forkUrl = `#/edit/${accountId}/widget/${widgetName}`;

const urls = [appUrl, detailsUrl, forkUrl];

const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;
const Card =
  role === "Builder"
    ? styled.div`
    position: relative;
    display:block;
    overflow: hidden;
    width: 415px;
    border-radius: 16px;
    padding: 0px 0px 16px 0px;
    background: #1C1E23;
    border-radius: 16px;
    :hover{
        text-decoration: none
    }
`
    : styled.a`
    position: relative;
    display:block;
    overflow: hidden;
    width: 415px;
    border-radius: 16px;
    padding: 0px 0px 16px 0px;
    background: #1C1E23;
    border-radius: 16px;
    :hover{
        text-decoration: none
    }

`;

const CardBody = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  overflow: hidden;
  position: relative;
  bottom:16px;
  justify-center: center
`;
const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  position: relative;
  top: 16px;
`;

const TextLink = styled.a`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
  :hover{
    color: #FFFFFF;
  }
`;

const WidgetName = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  color: #FFFFFF;
`;

const Thumbnail = styled.a`
    align-items:center;
    justify-content: center;
  padding:10px;
        width: 86px;
    height: 86px;
  flex-shrink: 0;
   z-index: 50;
   background: #1C1E23;
 border-radius: 16px;
  overflow: hidden;
  outline: none;
  display:flex;
  margin:auto;
  margin-left:16px;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 16px;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  padding: 0px 20px 0px 20px
`;

const Tag = styled.div`
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    text-center;
    display:flex;
    align-items:center;
    margin-right: 5px;
    padding: 4px 11px 4px 11px;
    white-space: nowrap;
    background: rgba(26, 46, 51, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 38px;
`;

const ProfileIcon = styled.div`
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    overflow: hidden;
    outline: none;
    display:flex;
    margin-right: 4px;
    border-radius: 100%;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const BuilderView = styled.a`
    display: flex;
    align-items:center;
    justify-content:center;
    color: #FFFFFF;
    :hover{
      color: white;
    text-decoration: none;
    cursor:pointer;
    }
    width: 50px;
    height: 50px;
    border-radius:100%;
    border: 2px solid #FFFFFF;
`;

const BuilderViewWithText = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
    font-weight: 500;
    font-size: 14px;
    gap: 8px;
    color: #FFFFFF;
`;

const BuilderViewWrapper = styled.div`
    display: flex;
    align-items:center;
    gap: 70px;
    justify-content: center;
    position: absolute;
    z-index:20;
    left:50%;
    top: 80px;
    transform: translateX(-50%)
`;

const Banner = styled.div`
    position: relative;
    height: 200px;
    width: 100%;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;

const openIcon = (
  <svg
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.9497 6.49783C18.1899 2.57215 14.3317 0 10 0C5.66826 0 1.81015 2.57215 0.0503378 6.49783C-0.0167793 6.70097 -0.0167793 6.8361 0.0503378 7.03924C1.81015 10.9649 5.66804 13.5371 10 13.5371C14.332 13.5371 18.1899 10.9642 19.9497 7.03924C20.0168 6.8361 20.0168 6.70097 19.9497 6.49783ZM10 10.5613C7.914 10.5613 6.20721 8.85454 6.20721 6.76854C6.20721 4.68254 7.914 2.97575 10 2.97575C12.086 2.97575 13.7928 4.68254 13.7928 6.76854C13.7928 8.85454 12.086 10.5613 10 10.5613Z"
      fill="white"
    />
    <path
      d="M12.7071 6.76858C12.7071 8.25768 11.4887 9.47564 10 9.47564C8.51137 9.47564 7.29297 8.25768 7.29297 6.76858C7.29297 5.27948 8.51137 4.06152 10 4.06152C11.4887 4.06152 12.7071 5.2797 12.7071 6.76858Z"
      fill="white"
    />
  </svg>
);

const forkIcon = (
  <svg
    width="19"
    height="22"
    viewBox="0 0 19 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.35484 7.0323C5.64575 6.58895 6.57351 5.36431 6.57351 3.92298C6.57351 2.10776 5.10198 0.63623 3.28675 0.63623C1.47153 0.63623 0 2.10776 0 3.92298C0 5.36423 0.927654 6.58882 2.21845 7.03222V15.6041C0.927654 16.0475 0 17.2721 0 18.7134C0 20.5286 1.47153 22.0001 3.28675 22.0001C5.10198 22.0001 6.57351 20.5286 6.57351 18.7134C6.57351 17.2941 5.674 16.085 4.41399 15.625C4.47998 15.3345 4.60498 15.0761 4.80778 14.6569C4.83899 14.5923 4.87204 14.524 4.907 14.4512C5.29814 13.6363 5.81981 13.2083 6.5734 13.2083C6.83931 13.2083 7.1526 13.2153 7.4885 13.2228L7.48859 13.2228C8.05883 13.2355 8.69421 13.2497 9.27355 13.2336C10.2435 13.2067 11.3051 13.0986 12.2894 12.7295C13.2982 12.3512 14.225 11.698 14.8821 10.6139C15.4465 9.68261 15.7703 8.50207 15.8428 7.0379C17.1423 6.59935 18.078 5.37043 18.078 3.92298C18.078 2.10776 16.6064 0.63623 14.7912 0.63623C12.976 0.63623 11.5044 2.10776 11.5044 3.92298C11.5044 5.3572 12.4231 6.57685 13.704 7.02567C13.6357 8.18549 13.3802 8.97007 13.0551 9.50659C12.685 10.1172 12.1739 10.4911 11.5393 10.7291C10.8802 10.9763 10.0931 11.0736 9.21423 11.098C8.66222 11.1134 8.16026 11.1012 7.64928 11.0889H7.64922C7.30104 11.0805 6.94867 11.0719 6.5734 11.0719C5.66599 11.0719 4.93505 11.3564 4.35484 11.7903V7.0323ZM4.93088 3.92285C4.93088 4.83046 4.19512 5.56623 3.2875 5.56623C2.37989 5.56623 1.64413 4.83046 1.64413 3.92285C1.64413 3.01524 2.37989 2.27947 3.2875 2.27947C4.19512 2.27947 4.93088 3.01524 4.93088 3.92285ZM16.4353 3.92285C16.4353 4.83046 15.6996 5.56623 14.7919 5.56623C13.8843 5.56623 13.1486 4.83046 13.1486 3.92285C13.1486 3.01524 13.8843 2.27947 14.7919 2.27947C15.6996 2.27947 16.4353 3.01524 16.4353 3.92285ZM3.2875 20.3567C4.19512 20.3567 4.93088 19.6209 4.93088 18.7133C4.93088 17.8057 4.19512 17.0699 3.2875 17.0699C2.37989 17.0699 1.64413 17.8057 1.64413 18.7133C1.64413 19.6209 2.37989 20.3567 3.2875 20.3567Z"
      fill="white"
    />
  </svg>
);

const sourceIcon = (
  <svg
    width="26"
    height="20"
    viewBox="0 0 26 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.11123 2.79933C6.98124 2.69634 6.83191 2.61978 6.67185 2.57406C6.51178 2.52834 6.34415 2.51435 6.17859 2.53292C6.01303 2.55148 5.85283 2.60222 5.7072 2.68222C5.56158 2.76222 5.4334 2.86989 5.33007 2.99904L0.277123 9.2401C0.0977389 9.46149 0 9.73664 0 10.0202C0 10.3038 0.0977389 10.579 0.277123 10.8004L5.33007 17.0414C5.54319 17.288 5.84509 17.443 6.17183 17.4736C6.49858 17.5041 6.82452 17.4077 7.08064 17.205C7.33676 17.0022 7.50295 16.7089 7.54403 16.3871C7.58511 16.0654 7.49785 15.7404 7.30072 15.4812L2.87939 10.014L7.30072 4.54683C7.5087 4.28971 7.60548 3.96182 7.56999 3.63454C7.5345 3.30726 7.36962 3.00708 7.11123 2.79933ZM24.986 9.2401L19.9331 2.99904C19.72 2.75242 19.4181 2.59744 19.0913 2.56692C18.7646 2.5364 18.4386 2.63273 18.1825 2.83551C17.9264 3.0383 17.7602 3.33162 17.7191 3.65336C17.678 3.97511 17.7653 4.30002 17.9624 4.55931L22.3838 10.014L17.9624 15.4812C17.7653 15.7404 17.678 16.0654 17.7191 16.3871C17.7602 16.7089 17.9264 17.0022 18.1825 17.205C18.4386 17.4077 18.7646 17.5041 19.0913 17.4736C19.4181 17.443 19.72 17.288 19.9331 17.0414L24.986 10.8004C25.1654 10.579 25.2632 10.3038 25.2632 10.0202C25.2632 9.73664 25.1654 9.46149 24.986 9.2401ZM14.7917 0.0282989C14.6291 -0.00650719 14.4612 -0.00923443 14.2975 0.020274C14.1338 0.0497825 13.9777 0.110945 13.838 0.20025C13.6983 0.289556 13.5779 0.405244 13.4836 0.540673C13.3893 0.676102 13.323 0.828604 13.2885 0.989422L9.49875 18.4644C9.4559 18.6285 9.44731 18.7995 9.47352 18.967C9.49973 19.1345 9.56018 19.2949 9.65119 19.4386C9.7422 19.5822 9.86186 19.7061 10.0029 19.8025C10.1439 19.899 10.3033 19.9661 10.4714 19.9997H10.7367C11.0305 20.0062 11.3173 19.9112 11.5479 19.7312C11.7785 19.5513 11.9383 19.2975 12 19.0136L15.7897 1.53864C15.8284 1.37449 15.8331 1.20429 15.8034 1.0383C15.7738 0.872311 15.7104 0.713976 15.6172 0.572842C15.5239 0.431707 15.4027 0.310697 15.2608 0.217109C15.119 0.12352 14.9594 0.0592927 14.7917 0.0282989Z"
      fill="white"
    />
  </svg>
);

const icons = [openIcon, sourceIcon, forkIcon];
State.init({
  hoverBanner: false,
});
const hoverEnter = () => {
  if (role !== "Builder") return;
  else {
    State.update({
      hoverBanner: true,
    });
  }
};
const hoverLeave = () => {
  if (role !== "Builder") return;
  else {
    State.update({
      hoverBanner: false,
    });
  }
};
return (
  <Card href={appUrl}>
    <Banner
      hover={state.hoverBanner}
      onMouseEnter={() => hoverEnter()}
      onMouseLeave={() => hoverLeave()}
    >
      <Widget
        src="ref-admin.near/widget/Image"
        props={{
          imageSrc: props.imageSrc,
          fallbackUrl:
            "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu",
          alt: metadata.name,
          style: {
            opacity: state.hoverBanner ? 0.5 : 1,
          },
        }}
      />
      {state.hoverBanner && (
        <BuilderViewWrapper>
          {["View", "Source", "Fork"].map((text, i) => {
            return (
              <BuilderViewWithText>
                <BuilderView href={urls[i]}>{icons[i]}</BuilderView>
                <span>{text}</span>
              </BuilderViewWithText>
            );
          })}
        </BuilderViewWrapper>
      )}
    </Banner>

    <CardBody>
      <Thumbnail href={detailsUrl}>
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

      <CardContent>
        <WidgetName href={detailsUrl}>{metadata.name || widgetName}</WidgetName>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <ProfileIcon>
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{
                accountId: accountId,
                style: {
                  height: "16px",
                  width: "16px",
                },
                imageStyle: {
                  verticalAlign: "unset",
                },
              }}
            />
          </ProfileIcon>

          <TextLink href={accountUrl}>{accountId}</TextLink>
        </div>
      </CardContent>
    </CardBody>

    <TagsWrapper>
      {tags.length > 0 &&
        tags.map((t) => {
          return <Tag>{t}</Tag>;
        })}
    </TagsWrapper>
  </Card>
);

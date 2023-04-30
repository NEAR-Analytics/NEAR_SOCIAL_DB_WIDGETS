const [accountId, widget, widgetName] = props.src.split("/");
const metadata = Social.get(
  `${accountId}/widget/${widgetName}/metadata/**`,
  "final"
);
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const candBg = [
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #5B8088 0%, #091518 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #877366 0%, #1A1A1A 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #F39BBB 0%, #380F1B 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #2F629E 0%, #0A1420 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #2B8888 0%, #071216 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #9B6B42 0%, #221511 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #5B887B 0%, #091815 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #373589 0%, #0F0F23 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #A3985F 0%, #2D261A 100%)",
  "radial-gradient(88.1% 88.1% at 49.7% 100%, #B3699E 0%, #BE4A6D 0.01%, #200A0E 100%)",
];

const randomBg = getRandomInt(candBg.length);

const role = props.role;

const tags = Object.keys(metadata.tags || {});

const detailsUrl = `#/near/widget/ComponentDetailsPage?src=${accountId}/widget/${widgetName}`;
const appUrl = `#/${accountId}/widget/${widgetName}`;

const forkUrl = `#/edit/${accountId}/widget/${widgetName}`;

const accountUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const Card = styled.div`
  position: relative;
  display:block;
  overflow: hidden;
width: 350px;
background: #1A2E33;
border-radius: 16px;
padding: 16px;

`;

const CardBody = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
  overflow: hidden;
  justify-center: center
  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  justify-content: start;

`;

const TextLink = styled.div`

  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  
  color: #FFFFFF;

`;

const Text = styled.div`

  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 21px;
  text-overflow: ellipsis;
  overflow:hidden;
  color: #FFFFFF;
  width: 220px;
  white-space: nowrap;

`;
const Thumbnail = styled.a`
  display: block;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 26px;
  overflow: hidden;
  outline: none;
  display:flex;
  margin:auto;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const TagsWrapper = styled.div`
  margin-top: 4px;
  display: flex;
  
`;

const Tag = styled.div`
    box-sizing: border-box;
    background: rgba(26, 46, 51, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 38px;
    color: #FFFFFF;
    font-weight: 500;
    font-size: 12px;
    text-center;
    display:flex;
    align-items:center;
    justify-center: center;
    margin-right: 5px;
    padding: 1px 11px 1px 11px;
    white-space: nowrap;

`;

const ProfileIcon = styled.div`
  width: 16px;
height: 16px;
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
    width: 100px;
    height: 36px;
    display: flex;
    align-items:center;
    justify-content:center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    gap:10px;
    color: #FFFFFF;
    font-size: 14px;
    :hover{
        color: white;
    text-decoration: none;
    cursor:pointer;
    }
`;
const openIcon = (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.09411 0.4668C3.48623 2.66122 1.87845 4.85542 0.270465 7.04958C-0.301894 7.83094 0.233009 8.95701 1.17669 8.95701H10.8236C11.7672 8.95701 12.3022 7.83094 11.7295 7.04958C10.1219 4.85542 8.51384 2.66126 6.90606 0.4668C6.44999 -0.1556 5.55032 -0.1556 5.09411 0.4668ZM0.751334 11.9861H10.3913C10.7746 11.9861 11.5722 12.1064 11.8719 11.6394C12.2055 11.12 11.8486 10.4239 11.2489 10.4239H1.60899C1.22547 10.4239 0.428086 10.3038 0.127975 10.7709C-0.205466 11.29 0.151429 11.9861 0.751334 11.9861Z"
      fill="white"
    />
  </svg>
);

const forkIcon = (
  <svg
    width="13"
    height="15"
    viewBox="0 0 13 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.0577 4.49077C3.96403 4.17947 4.61538 3.31964 4.61538 2.30769C4.61538 1.03319 3.5822 0 2.30769 0C1.03319 0 0 1.03319 0 2.30769C0 3.31965 0.651363 4.17947 1.5577 4.49078V10.5092C0.651363 10.8205 0 11.6803 0 12.6923C0 13.9668 1.03319 15 2.30769 15C3.5822 15 4.61538 13.9668 4.61538 12.6923C4.61538 11.6959 3.98384 10.8469 3.09918 10.5239C3.1455 10.3199 3.23328 10.1384 3.37571 9.84396C3.39763 9.79866 3.42083 9.75069 3.44538 9.69955C3.72001 9.12741 4.08628 8.82692 4.61539 8.82692C4.80209 8.82692 5.02205 8.83183 5.25788 8.83709H5.2579C5.65829 8.84601 6.10443 8.85596 6.51122 8.84466C7.19222 8.82575 7.93763 8.74987 8.62873 8.49071C9.33703 8.2251 9.98776 7.76652 10.4491 7.00531C10.8454 6.35144 11.0727 5.52255 11.1236 4.49452C12.0357 4.18641 12.6923 3.32373 12.6923 2.30769C12.6923 1.03319 11.6591 0 10.3846 0C9.11011 0 8.07692 1.03319 8.07692 2.30769C8.07692 3.31491 8.7222 4.17142 9.62191 4.48637C9.57388 5.30047 9.39457 5.85122 9.1663 6.22786C8.90649 6.65655 8.5476 6.91913 8.10205 7.08621C7.63931 7.25974 7.08664 7.3281 6.46957 7.34524C6.08198 7.35601 5.72955 7.34749 5.37076 7.33881H5.37075C5.12628 7.3329 4.87887 7.32692 4.61539 7.32692C3.97828 7.32692 3.46507 7.52662 3.0577 7.8313V4.49077ZM3.46154 2.30769C3.46154 2.94494 2.94494 3.46154 2.30769 3.46154C1.67044 3.46154 1.15385 2.94494 1.15385 2.30769C1.15385 1.67044 1.67044 1.15385 2.30769 1.15385C2.94494 1.15385 3.46154 1.67044 3.46154 2.30769ZM11.5385 2.30769C11.5385 2.94494 11.0219 3.46154 10.3846 3.46154C9.74735 3.46154 9.23076 2.94494 9.23076 2.30769C9.23076 1.67044 9.74735 1.15385 10.3846 1.15385C11.0219 1.15385 11.5385 1.67044 11.5385 2.30769ZM2.30769 13.8461C2.94494 13.8461 3.46154 13.3295 3.46154 12.6923C3.46154 12.055 2.94494 11.5384 2.30769 11.5384C1.67044 11.5384 1.15385 12.055 1.15385 12.6923C1.15385 13.3295 1.67044 13.8461 2.30769 13.8461Z"
      fill="white"
    />
  </svg>
);

const sourceIcon = (
  <svg
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_8_8732)">
      <path
        d="M5.33524 7.50357C5.33522 7.66313 5.39812 7.81627 5.51028 7.92977C5.62244 8.04326 5.77482 8.10797 5.93438 8.10984H9.27247C9.43232 8.10984 9.58562 8.04634 9.69865 7.93331C9.81168 7.82028 9.87518 7.66698 9.87518 7.50713C9.87518 7.34728 9.81168 7.19398 9.69865 7.08095C9.58562 6.96792 9.43232 6.90442 9.27247 6.90442H5.93438C5.77605 6.90627 5.62473 6.96999 5.51277 7.08195C5.40081 7.19392 5.33709 7.34524 5.33524 7.50357ZM2.33951 7.93866C2.39518 7.99451 2.46132 8.03883 2.53415 8.06907C2.60697 8.09931 2.68505 8.11488 2.76391 8.11488C2.84276 8.11488 2.92084 8.09931 2.99367 8.06907C3.0665 8.03883 3.13264 7.99451 3.1883 7.93866L5.53495 5.58488C5.59081 5.52922 5.63512 5.46307 5.66536 5.39025C5.6956 5.31742 5.71117 5.23934 5.71117 5.16048C5.71117 5.08163 5.6956 5.00355 5.66536 4.93072C5.63512 4.85789 5.59081 4.79175 5.53495 4.73609L3.1883 2.35378C3.13257 2.29758 3.06631 2.25291 2.99332 2.22231C2.92032 2.19172 2.84201 2.1758 2.76286 2.17547C2.68372 2.17514 2.60528 2.1904 2.53203 2.22038C2.45878 2.25036 2.39215 2.29448 2.33595 2.35021C2.27975 2.40595 2.23508 2.4722 2.20448 2.5452C2.17389 2.6182 2.15797 2.6965 2.15764 2.77565C2.15697 2.9355 2.21983 3.08907 2.33238 3.20257L4.2796 5.14979L2.33238 7.08274C2.27545 7.13852 2.23021 7.20511 2.19934 7.27859C2.16846 7.35208 2.15255 7.43099 2.15255 7.5107C2.15255 7.59041 2.16846 7.66932 2.19934 7.7428C2.23021 7.81629 2.27545 7.88287 2.33238 7.93866H2.33951ZM13.7946 13.7946H1.20542V1.20542H13.7946V13.7946ZM13.7946 0H1.20542C0.885723 0 0.57912 0.126999 0.35306 0.35306C0.126999 0.57912 0 0.885723 0 1.20542L0 13.7946C0.00560989 14.1106 0.135082 14.4117 0.360537 14.6331C0.585992 14.8546 0.889396 14.9787 1.20542 14.9786H13.7946C14.1069 14.9731 14.4049 14.8466 14.6257 14.6257C14.8466 14.4049 14.9731 14.1069 14.9786 13.7946V1.20542C14.9787 0.889396 14.8546 0.585992 14.6331 0.360537C14.4117 0.135082 14.1106 0.00560989 13.7946 0Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_8_8732">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CardFooter = styled.div`

    display: flex;
    align-items: center;
    gap:9px;
    margin-top: 6px;
    

`;

return (
  <Card
    style={{
      background: candBg[randomBg],
    }}
  >
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
        <Text title={metadata.name || widgetName} href={detailsUrl}>
          {metadata.name || widgetName}
        </Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "8px",
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

        <TagsWrapper>
          {tags.length > 0 &&
            tags.map((t) => {
              return <Tag>{t}</Tag>;
            })}
        </TagsWrapper>
      </CardContent>
    </CardBody>

    {role === "Builder" && (
      <CardFooter>
        <BuilderView href={appUrl}>
          {openIcon}
          <span>Open</span>
        </BuilderView>

        <BuilderView href={forkUrl}>
          {forkIcon}
          <span>Fork</span>
        </BuilderView>
        <BuilderView href={detailsUrl}>
          {sourceIcon}
          <span>Source</span>
        </BuilderView>
      </CardFooter>
    )}
  </Card>
);

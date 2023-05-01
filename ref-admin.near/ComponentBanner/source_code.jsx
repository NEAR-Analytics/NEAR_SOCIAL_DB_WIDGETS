if (!props.src) return "";

const { commitLoading } = state;
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
  border: 1px solid #eceef0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);

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
   display:flex;
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

const Button = styled.button`
background: rgba(26, 46, 51, 0.25);
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 38px;
  color:#fff;
`;

const ButtonLink = styled.a`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: rgba(26, 46, 51, 0.25);
    border: 0.5px solid rgba(255, 255, 255, 0.3);
    border-radius: 38px;
    color: rgb(255, 255, 255);
    text-decoration:none;
    color:#fff;
    &:hover{
        color:#fff;
        text-decoration:none;
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
function applyHomePage() {
  if (commitLoading) return;
  State.update({ commitLoading: true });
  const storageDataOld = myHomePagePathDataFromCache;
  let storageDataOldCopy;
  try {
    storageDataOldCopy = JSON.parse(JSON.stringify(storageDataOld)) || {};
  } catch (error) {
    storageDataOldCopy = {};
  }
  const storageDataNew = {
    ...storageDataOldCopy,
    [context.accountId]: finalSrc,
  };

  Storage.set("myHomePagePathData", storageDataNew);
  Social.set(
    {
      myHomePagePath: finalSrc,
    },
    {
      force: true,
      onCommit: () => {
        State.update({ commitLoading: false });
      },
      onCancel: () => {
        State.update({ commitLoading: false });
        Storage.set("myHomePagePathData", storageDataOldCopy);
      },
    }
  );
}
const Loading = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);
const homeIcon = (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.21538 0.961838C9.0131 0.797784 8.76058 0.708252 8.50014 0.708252C8.2397 0.708252 7.98717 0.797784 7.7849 0.961838L1.14533 6.3179C0.646314 6.72023 0.562022 7.45832 0.957273 7.9669C1.11461 8.17027 1.33557 8.31504 1.58486 8.37809L1.64648 8.39155L1.64613 14.3933C1.64613 15.3789 2.38456 16.1942 3.34825 16.2838L3.42688 16.2898L3.50904 16.2916H13.4909C14.4843 16.2916 15.3014 15.4979 15.352 14.4768L15.3538 14.3933L15.3541 8.39155L15.3949 8.3834C15.8879 8.26971 16.2608 7.83409 16.2899 7.30496L16.2916 7.23838C16.2916 6.87961 16.1308 6.54067 15.8546 6.31755L9.21538 0.961838ZM8.43975 1.79236C8.45678 1.77856 8.47804 1.77102 8.49996 1.77102C8.52188 1.77102 8.54314 1.77856 8.56017 1.79236L15.1926 7.15763C15.2042 7.16708 15.2135 7.17897 15.2198 7.19244C15.2262 7.20592 15.2295 7.22064 15.2295 7.23555C15.2295 7.2908 15.1859 7.33542 15.1321 7.33542H14.8197C14.5286 7.33507 14.2927 7.57625 14.2927 7.8734V14.3901L14.2916 14.4464C14.27 14.8838 13.9155 15.2291 13.4852 15.2291H3.52817L3.47292 15.2277C3.04508 15.2057 2.70756 14.8434 2.70756 14.4039V7.87375C2.70756 7.57625 2.47169 7.33542 2.18056 7.33542H1.86819C1.83844 7.33542 1.81046 7.32161 1.79169 7.29788C1.77569 7.27705 1.7684 7.25081 1.77138 7.22471C1.77435 7.19861 1.78735 7.17468 1.80763 7.15798L8.43975 1.79236ZM6.14652 11.1672C6.0555 11.2747 6.01094 11.414 6.02263 11.5544C6.03432 11.6948 6.10131 11.8248 6.20886 11.9159C6.85875 12.4659 7.5685 12.7499 8.32288 12.7499C9.07725 12.7499 9.787 12.4659 10.4373 11.9159C10.4905 11.8707 10.5344 11.8156 10.5663 11.7535C10.5982 11.6915 10.6176 11.6237 10.6234 11.5542C10.6291 11.4846 10.6211 11.4146 10.5998 11.3481C10.5785 11.2817 10.5443 11.22 10.4992 11.1668C10.4541 11.1135 10.399 11.0697 10.3369 11.0378C10.2748 11.0058 10.2071 10.9864 10.1375 10.9807C10.068 10.9749 9.99797 10.9829 9.9315 11.0042C9.86504 11.0255 9.80342 11.0597 9.75017 11.1048C9.28515 11.499 8.81446 11.6874 8.32288 11.6874C7.83165 11.6874 7.36096 11.499 6.89558 11.1048C6.84232 11.0597 6.78069 11.0255 6.71421 11.0042C6.64773 10.9829 6.5777 10.975 6.50813 10.9807C6.43857 10.9865 6.37083 11.006 6.30878 11.038C6.24673 11.0699 6.19159 11.1138 6.14652 11.1672Z"
      fill="white"
    />
  </svg>
);
return (
  <Wrapper>
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
    <ButtonLink onClick={applyHomePage}>
      {commitLoading ? Loading : homeIcon}
      Apply as homepage
    </ButtonLink>
  </Wrapper>
);

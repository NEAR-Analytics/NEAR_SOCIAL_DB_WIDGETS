const docsUrl = props.docsUrl; // TODO: 404 URL?
const subpageTitle = props.subpageTitle ?? "";
const pageTitle = props.pageTitle ?? "Invalid Doc";
const content = props.content ?? {
  text: "No description available",
  type: "md",
};
const imageUrl = props.imageUrl;
const fallbackUrl =
  props.fallbackImageUrl ??
  "https://ipfs.near.social/ipfs/bafkreifc4burlk35hxom3klq4mysmslfirj7slueenbj7ddwg7pc6ixomu";

const onClick =
  props.onClick ??
  (() => {
    if (props.debug) {
      console.log("clicked", {
        pageTitle,
        subpageTitle,
        imageUrl,
        docsUrl,
      });
    }
  });

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
`;

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardContent = styled.div`
  width: 100%;
`;

const CardHeader = styled.div`
  border-bottom: 1px solid #eceef0;
  padding: 16px;
  display: flex;
  gap: 16px;
  align-items: center;

  > * {
    min-width: 0;
  }
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-top: 1px solid #eceef0;
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

const Thumbnail = styled.a`
  display: block;
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #eceef0;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  transition: border-color 200ms;

  &:focus,
  &:hover {
    border-color: #d0d5dd;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const ButtonLink = styled.a`
  padding: 8px;
  height: 32px;
  border: 1px solid #d7dbdf;
  border-radius: 100px;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  cursor: pointer;
  color: ${(p) => (p.primary ? "#006ADC" : "#11181C")} !important;
  background: #fbfcfd;
  white-space: nowrap;

  &:hover,
  &:focus {
    background: #ecedee;
    text-decoration: none;
    outline: none;
  }
`;

return (
  <Card>
    <CardHeader>
      <Thumbnail href={docsUrl}>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: imageUrl,
            fallbackUrl,
          }}
        />
      </Thumbnail>

      <CardContent>
        <TextLink as="a" href={docsUrl} onPointerUp={onClick} bold ellipsis>
          {pageTitle}
        </TextLink>

        <TextLink small as="a" href={docsUrl} onPointerUp={onClick} ellipsis>
          {subpageTitle}
        </TextLink>
      </CardContent>
    </CardHeader>

    <CardBody>
      <Widget src="near/widget/SocialMarkdown" props={{ text: content.text }} />
    </CardBody>

    <CardFooter>
      <ButtonLink href={docsUrl}>Preview</ButtonLink>
      <ButtonLink href={docsUrl} onPointerUp={onClick} primary>
        Open
      </ButtonLink>
    </CardFooter>
  </Card>
);

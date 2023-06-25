const accountId = props.accountId ?? context.accountId;
const presidentId = props.presidentId ?? "gordonjun.near";
const vicePresidentId = props.vicePresidentId ?? "Pipi"; // temporary
const role = props.role ?? "community";
const daoId = props.daoId ?? "bbclan.near";

const tab = props.tab === "following" ? props.tab : "members";

const defaultWidgets = [
  {
    src: "gordonjun.near/widget/adventures.menu",
  },
  {
    src: "gordonjun.near/widget/explore.posts.dao.members.only",
    props: { daoId: daoId },
  },
];

const widgets = (main && JSON.parse(main)) ?? defaultWidgets;

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1155px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 998px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #96d2b7;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? "#000"};
  margin: 0;
  max-width: 670px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Flex = styled.div`
  gap: 8px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

  @media (max-width: 998px) {
    flex-direction: column;
    gap: var(--section-gap);
  }
`;

const Container = styled.div`
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;

  @media (max-width: 768px) {
    padding: var(--section-gap) 12px;
  }
`;

return (
  <Wrapper>
    <Container>
      <Flex>
        <img
          src="https://media.tenor.com/yQyTPmH3iK8AAAAd/sumikko-gurashi-cute.gif"
          alt="Header GIF"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <br />
        <br />
        <H1>bbclan</H1>
        <div className="mt-3">
          <Text style={{ maxWidth: "600px" }}>
            A clan that was formed by two individuals named Bibi and Pipi. These
            two individuals and the other clan members vibe like Sumikko Gurashi
            characters. The primary members of the clan include Bibi and Pipi,
            accompanied by their beloved soft toys and bolsters.
          </Text>
        </div>
        {context.accountId && (
          <div className="m-3">
            <Widget
              src="gordonjun.near/widget/PresidentProfileCard"
              props={{
                presidentId: presidentId,
                vicePresidentId: vicePresidentId,
              }}
            />
          </div>
        )}
      </Flex>
    </Container>
    <div className="m-2">
      <Widget src="gordonjun.near/widget/bbclan.members" />
    </div>
    <br />

    <div>
      {widgets.map(
        ({ src, requiresLogin }, i) =>
          (!requiresLogin || context.accountId) && (
            <div key={i} className="p-3 mb-3">
              <Widget src={src} props={props} />
            </div>
          )
      )}
    </div>

    <Container>
      <Flex>
        <img
          src="https://media.tenor.com/QQ6iIPq9emoAAAAC/warm-snow.gif"
          alt="Footer GIF"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Flex>
    </Container>
  </Wrapper>
);
